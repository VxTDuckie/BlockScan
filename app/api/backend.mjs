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
import { Timer } from './timer.mjs';

// Initialize environment variables
dotenv.config();

// Setup async exec
const execAsync = promisify(exec);

// Setup directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
async function ensureUploadsDirectory() {
    try {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
    } catch (error) {
        console.error('Error creating uploads directory:', error);
        throw error;
    }
}

// Initialize Supabase
function initializeSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase credentials');
    }

    return createClient(supabaseUrl, supabaseKey);
}

// Initialize Express and middleware
function initializeExpress() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // CORS configuration
    const corsOptions = {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'https://blockscan-swin.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    };
    app.use(cors(corsOptions));

    return { app, corsOptions };
}

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

// Slither analysis functions
async function executeSlitherAnalysis(filePath) {
  try {
      const options = {
          maxBuffer: 1024 * 1024 * 50 // 50MB buffer
      };

      // Execute single Slither command for analysis
      let slitherOutput = '';
      try {
          const { stdout, stderr } = await execAsync(`slither "${filePath}" --print human-summary`, options);
          
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

      // Clean the output
      const cleanOutput = slitherOutput
          .replace(/\u001b\[\d+m/g, '') // Remove ANSI color codes
          .replace(/\r\n/g, '\n')       // Normalize line endings
          .trim();

      // For vulnerabilities, run a separate detailed analysis
      let vulnsOutput = '';
      try {
          const { stdout: vulnsStdout, stderr: vulnsStderr } = await execAsync(`slither "${filePath}"`, options);
          vulnsOutput = (vulnsStdout || '') + (vulnsStderr || '');
      } catch (vulnError) {
          console.error('Vulnerability analysis error:', vulnError);
          vulnsOutput = (vulnError.stdout || '') + (vulnError.stderr || '');
      }

      const cleanVulns = vulnsOutput
          .replace(/\u001b\[\d+m/g, '')
          .replace(/\r\n/g, '\n')
          .trim();

      return {
          overview: cleanOutput,
          vulns: cleanVulns
      };
  } catch (error) {
      console.error('Slither execution error:', error);
      throw error;
  }
}




// Parse Slither output
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

// Parse Slither vulnerabilities
function parseSlitherVulns(slitherVulns) {
    const vulnsArray = [];
    const lines = slitherVulns.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

        const vulnerabilityTypes = {
          'abiencoderv2-array': 'Storage ABIEncoderV2 Array',
          'arbitrary-send-erc20': 'Arbitrary from in transferFrom',
          'array-by-reference': 'Modifying storage array by value',
          'encode-packed-collision': 'ABI encodePacked Collision',
          'incorrect-shift': 'ABI encodePacked Collision',
          'multiple-constructors': 'Multiple constructor schemes',
          'name-reused': 'Name reused',
          'protected-vars': 'Protected Variables',
          'public-mappings-nested': 'Public mappings with nested variables',
          'rtlo': 'Right-to-Left-Override character',
          'shadowing-state': 'State variable shadowing',
          'suicidal': 'Suicidal',
          'uninitialized-state': 'Uninitialized state variables',
          'uninitialized-storage': 'Uninitialized storage variables',
          'unprotected-upgrade': 'Unprotected upgradeable contract',
          'codex': 'Codex',
          'arbitrary-send-erc20-permit': 'Arbitrary from in transferFrom used with permit',
          'arbitrary-send-eth': 'Functions that send Ether to arbitrary destinations',
          'controlled-array-length': 'Array Length Assignment',
          'controlled-delegatecall': 'Controlled Delegatecall',
          'delegatecall-loop': 'Payable functions using delegatecall inside a loop',
          'incorrect-exp': 'Incorrect exponentiation',
          'incorrect-return': 'Incorrect return in assembly',
          'msg-value-loop': 'msg value loop',
          'reentrancy-eth': 'reentrancy eth',
          'return-leave': 'return leave',
          'storage-array': 'storage array',
          'unchecked-transfer': 'unchecked transfer',
          'weak-prng': 'weak prng',
          'domain-separator-collision': 'domain separator collision',
          'enum-conversion': 'enum conversion',
          'erc20-interface': 'erc20 interface',
          'erc721-interface': 'erc721 interface',
          'incorrect-equality': 'incorrect equality',
          'locked-ether': 'locked ether',
          'mapping-deletion': 'mapping deletion',
          'shadowing-abstract': 'shadowing abstract',
          'tautological-compare': 'tautological compare',
          'tautology': 'tautology',
          'write-after-write': 'write after write',
          'boolean-cst': 'boolean cst',
          'constant-function-asm': 'constant function asm',
          'constant-function-state': 'constant function state',
          'divide-before-multiply': 'divide before multiply',
          'out-of-order-retryable': 'out of order retryable',
          'reentrancy-no-eth': 'reentrancy no eth',
          'reused-constructor': 'reused constructor',
          'tx-origin': 'tx origin',
          'unchecked-lowlevel': 'unchecked lowlevel',
          'unchecked-send': 'unchecked send',
          'uninitialized-local': 'uninitialized local',
          'incorrect-modifier': 'incorrect modifier',
          'shadowing-builtin': 'shadowing builtin',
          'shadowing-local': 'shadowing local',
          'uninitialized-fptr-cst': 'uninitialized fptr cst',
          'variable-scope': 'variable scope',
          'void-cst': 'void cst',
          'calls-loop': 'calls loop',
          'events-maths': 'events maths',
          'incorrect-unary': 'incorrect unary',
          'reentrancy-benign': 'reentrancy benign',
          'return-bomb': 'return bomb',
          'assert-state-change': 'assert state change',
          'boolean-equal': 'boolean equal',
          'cyclomatic-complexity': 'cyclomatic complexity',
          'deprecated-standards': 'deprecated standards',
          'erc20-indexed': 'erc20 indexed',
          'function-init-state': 'function init state',
          'incorrect-using-for': 'incorrect using for',
          'low-level-calls': 'Low-level calls',
          'missing-inheritance': 'missing inheritance',
          'conformance-to-solidity-naming-convention': 'Conformance to Solidity naming conventions',
          'pragma': 'pragma',
          'redundant-statements': 'redundant statements',
          'incorrect-version': 'Incorrect versions of Solidity',
          'unimplemented-functions': 'unimplemented functions',
          'unused-import': 'Unused Import',
          'unused-state': 'Unused state variable',
          'costly-loop': 'costly loop',
          'dead-code': 'dead code',
          'reentrancy-vulnerabilities-4': 'Reentrancy vulnerabilities',
          'too-many-digits': 'too many digits',
          'cache-array-length': 'cache array length',
          'constable-states': 'constable states',
          'external-function': 'external function',
          'immutable-states': 'immutable states',
          'var-read-using-this': 'var read using this',
          'unused-return': 'Unused Return Value',
            'missing-events-access-control': 'Missing Events Access Control',
            'missing-zero-address-validation': 'Missing Zero Address Validation',
            'reentrancy-vulnerabilities-3': 'Reentrancy Vulnerabilities',
            'block-timestamp': 'Block timestamp',
            'assembly-usage': 'Assembly usage',
            'dead-code': 'Dead-code',
        };
        

    lines.forEach(line => {
        Object.entries(vulnerabilityTypes).forEach(([key, value]) => {
            if (line.includes(key)) {
              vulnsArray.push(value);
            }
        });
    });

    return vulnsArray;
}

// Database operations
async function saveVulnerabilities(supabase, metricsId, vulnsArray) {
    try {
        const vulnsData = await Promise.all(
          vulnsArray
                .filter(vuln => vuln)
                .map(async (vuln) => {
                    const { data, error } = await supabase
                        .from('vulnerabilities')
                        .insert([{
                            metrics_id: metricsId,
                            vulnerability: vuln
                        }])
                        .select();

                    if (error) throw error;
                    return data[0];
                })
        );

        return vulnsData.filter(data => data !== null);
    } catch (error) {
        console.error('Error saving vulnerabilities:', error);
        throw error;
    }
}

// Main application setup
async function setupApplication() {
    try {
        // Initialize everything
        await ensureUploadsDirectory();
        const supabase = initializeSupabase();
        const { app, corsOptions } = initializeExpress();

        // Health check endpoint
        app.get('/health', (_req, res) => {
            res.json({ status: 'ok', message: 'Server is running' });
        });

        // File upload endpoint
        app.post('/contract-upload', upload.single('contractFile'), async (req, res) => {
            try {
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

        // Contract analysis endpoint
        app.post('/contract-analyze', async (req, res) => {
          const timer = new Timer();
          timer.start();
          let filePath;
      
          try {
              const { projectName, filename } = req.body;
              console.log('Analyzing:', { projectName, filename });
      
              if (!projectName || !filename) {
                  return res.status(400).json({
                      status: 'error',
                      message: 'Project name and filename are required'
                  });
              }
      
              filePath = path.join(UPLOADS_DIR, filename);
              
              try {
                  await fs.access(filePath);
              } catch {
                  return res.status(404).json({
                      status: 'error',
                      message: 'Contract file not found'
                  });
              }
      
              // Execute Slither analysis with new implementation
              const analysisResult = await executeSlitherAnalysis(filePath);
              
              // Parse results
              const scanDuration = timer.stop();
              const metrics = parseSlitherOutput(analysisResult.overview, scanDuration);
              const vulnerabilities = parseSlitherVulns(analysisResult.vulns);
      
              // Convert all numeric values explicitly for database
              const dbMetrics = {
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
      
              // Save to database
              const { data: metricsData, error: metricsError } = await supabase
                  .from('slither_metrics')
                  .insert([dbMetrics])
                  .select();
      
              if (metricsError) throw metricsError;
      
              // Save vulnerabilities
              if (vulnerabilities.length > 0) {
                  const vulnRecords = vulnerabilities.map(vuln => ({
                      metrics_id: metricsData[0].id,
                      vulnerability: vuln
                  }));
      
                  const { error: vulnsError } = await supabase
                      .from('vulnerabilities')
                      .insert(vulnRecords);
      
                  if (vulnsError) throw vulnsError;
              }
      
              // Cleanup
              try {
                  await fs.unlink(filePath);
                  console.log('Cleaned up file:', filePath);
              } catch (cleanupError) {
                  console.error('Error cleaning up file:', cleanupError);
              }
      
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
                      },
                      vulnerabilities: vulnerabilities,
                      timestamp: new Date().toISOString(),
                      id: metricsData[0].id
                  }
              });
      
          } catch (error) {
              console.error('Analysis error:', error);
              if (filePath) {
                  try {
                      await fs.unlink(filePath);
                  } catch (cleanupError) {
                      console.error('Error cleaning up file:', cleanupError);
                  }
              }
              res.status(500).json({
                  status: 'error',
                  message: error.message || 'Analysis failed'
              });
          }
      });
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

    } catch (error) {
        console.error('Application setup failed:', error);
        process.exit(1);
    }
}

// Start the application
setupApplication().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});