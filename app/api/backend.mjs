// backend.mjs
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import {Timer} from './timer.mjs'
// Initialize environment variables
dotenv.config();

// Setup async exec
const execAsync = promisify(exec);

// Setup directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
try {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
} catch (error) {
  console.error('Error creating uploads directory:', error);
}

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}
//connect to supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://blockscan-swin.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Multer configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${path.parse(file.originalname).name}-${uniqueSuffix}.sol`);
  }
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.toLowerCase().endsWith('.sol')) {
      return cb(new Error('Only .sol files are allowed'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});


// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});


// File upload endpoint
app.post('/contract-upload', upload.single('contractFile'), async (req, res) => {
  try {
    console.log('Received upload request');
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'File upload failed'
    });
  }
});

// Replace the contract analysis endpoint with this fixed version
app.post('/contract-analyze', async (req, res) => {
  const timer = new Timer();
  timer.start();
  try {
    
    const { projectName, filename } = req.body;
    console.log('Analyzing:', { projectName, filename });

    if (!projectName || !filename) {
      return res.status(400).json({
        status: 'error',
        message: 'Project name and filename are required'
      });
    }

    const filePath = path.join(UPLOADS_DIR, filename);
    
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        status: 'error',
        message: 'Contract file not found'
      });
    }

    // Execute Slither with better output handling
    let slitherOutput = '';
    try {
      const { stdout, stderr } = await execAsync(`slither "${filePath}" --print human-summary`);
      
      // Combine stdout and stderr as Slither might output to either
      slitherOutput = stdout || '';
      if (stderr) {
        console.log('Slither stderr:', stderr);
        // Only add stderr if it contains useful information
        if (stderr.includes('contracts in source files') || 
            stderr.includes('Source lines of code') ||
            stderr.includes('Number of')) {
          slitherOutput += '\n' + stderr;
        }
      }
    } catch (execError) {
      console.error('Slither execution error:', execError);
      // Even if the command fails, we might have useful output
      slitherOutput = execError.stdout || '';
      if (execError.stderr) {
        console.log('Error stderr:', execError.stderr);
        if (execError.stderr.includes('contracts in source files') || 
            execError.stderr.includes('Source lines of code') ||
            execError.stderr.includes('Number of')) {
          slitherOutput += '\n' + execError.stderr;
        }
      }
    }

    if (!slitherOutput.trim()) {
      throw new Error('No output received from Slither analysis');
    }


    // Clean the output before parsing
    const cleanOutput = slitherOutput
      .replace(/\u001b\[\d+m/g, '') // Remove ANSI color codes
      .replace(/\r\n/g, '\n')       // Normalize line endings
      .trim();


    // Stop timer before database operations
    const scanDuration = timer.stop();
    // Parse the cleaned output
    const metrics = parseSlitherOutput(cleanOutput, scanDuration);

    // Convert all numeric values explicitly
    const metricsData = {
      project_name: projectName,
      total_contracts: parseInt(metrics.total_contracts) || 0,
      source_lines: parseInt(metrics.source_lines) || 0,
      assembly_lines: parseInt(metrics.assembly_lines) || 0,
      scan_duration: scanDuration,
      optimization_issues: parseInt(metrics.optimization_issues) || 0,
      informational_issues: parseInt(metrics.informational_issues) || 0,
      low_issues: parseInt(metrics.low_issues) || 0,
      medium_issues: parseInt(metrics.medium_issues) || 0,
      high_issues: parseInt(metrics.high_issues) || 0,
      ercs: metrics.ercs || 'None'
    };


    // Save to Supabase
    const { data, error } = await supabase
      .from('slither_metrics')
      .insert([metricsData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    // Clean up file
    try {
      await fs.unlink(filePath);
      console.log('Cleaned up file:', filePath);
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError);
    }
    timer.stop();
    res.status(200).json({
      status: 'success',
      message: 'Analysis completed successfully',
      data: {
        projectName,
        metrics: {
          total_contracts: metrics.total_contracts,
          source_lines: metrics.source_lines,
          assembly_lines: metrics.assembly_lines,
          scan_duration: metrics.scan_duration,
          issues: {
            optimization: metrics.optimization_issues,
            informational: metrics.informational_issues,
            low: metrics.low_issues,
            medium: metrics.medium_issues,
            high: metrics.high_issues,
          },
          ercs: metrics.ercs
        },
        timestamp: new Date().toISOString(),
        id: data?.[0]?.id
      }
    });
  } catch (error) {
    timer.stop();
    console.error('Analysis error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Analysis failed',
      details: error.stack
    });
  }
});

// And update the parseSlitherOutput function
const parseSlitherOutput = (output, scanDuration) => {
  try {
    // Initialize metrics with default values
    const metrics = {
      total_contracts: 0,
      source_lines: 0,
      assembly_lines: 0,
      scan_duration: scanDuration,      
      optimization_issues: 0,
      informational_issues: 0,
      low_issues: 0,
      medium_issues: 0,
      high_issues: 0,
      ercs: 'None'
    };

    // Split output into lines and process each line
    const lines = output.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);


    // Process each line
    lines.forEach(line => {
      let value;
      if (line.includes('Total number of contracts')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.total_contracts = parseInt(value);
      }
      else if (line.includes('Source lines of code')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.source_lines = parseInt(value);
      }
      else if (line.includes('Number of assembly lines')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.assembly_lines = parseInt(value);
      }
      else if (line.includes('Number of optimization issues')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.optimization_issues = parseInt(value);
      }
      else if (line.includes('Number of informational issues')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.informational_issues = parseInt(value);
      }
      else if (line.includes('Number of low issues')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.low_issues = parseInt(value);
      }
      else if (line.includes('Number of medium issues')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.medium_issues = parseInt(value);
      }
      else if (line.includes('Number of high issues')) {
        value = line.match(/:\s*(\d+)/)?.[1];
        if (value) metrics.high_issues = parseInt(value);
      }
      else if (line.includes('ERCs:')) {
        metrics.ercs = line.split('ERCs:')[1]?.trim() || 'None';
      }
    });
    return metrics;
  } catch (error) {
    console.error('Error parsing output:', error);
    throw new Error(`Failed to parse Slither output: ${error.message}`);
  }
};















/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads directory: ${UPLOADS_DIR}`);
  console.log('CORS enabled for:', corsOptions.origin);
});

// Handle shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Cleaning up...');
  try {
    const files = await fs.readdir(UPLOADS_DIR);
    await Promise.all(files.map(file => fs.unlink(path.join(UPLOADS_DIR, file))));
  } catch (error) {
    console.error('Cleanup error:', error);
  }
  process.exit(0);
});