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
        const [summaryResult, detailedResult] = await Promise.all([
            execAsync(`slither ${filePath} --print human-summary`),
            execAsync(`slither ${filePath}`)
        ]);

        const overview = summaryResult.stdout?.trim() || '';
        const vulns = detailedResult.stdout?.trim() || '';

        if (!overview && !vulns) {
            throw new Error('No output received from Slither analysis');
        }

        return {
            overview: overview.replace(/\u001b\[\d+m/g, '').replace(/\r\n/g, '\n').trim(),
            vulns: vulns.replace(/\u001b\[\d+m/g, '').replace(/\r\n/g, '\n').trim()
        };
    } catch (error) {
        console.error('Slither execution error:', error);
        throw new Error(`Slither analysis failed: ${error.message}`);
    }
}

// Parse Slither output
function parseSlitherOutput(slitherOverview, scanDuration) {
    try {
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

        const lines = slitherOverview.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

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
}

// Parse Slither vulnerabilities
function parseSlitherVulns(slitherVulns) {
    const vulnsArray = [];
    const lines = slitherVulns.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

        const vulnerabilityTypes = {
          'abiencoderv2-array': 'abiencoderv2 array',
          'arbitrary-send-erc20': 'arbitrary send erc20',
          'array-by-reference': 'array by reference',
          'encode-packed-collision': 'encode packed collision',
          'incorrect-shift': 'incorrect shift',
          'multiple-constructors': 'multiple constructors',
          'name-reused': 'name reused',
          'protected-vars': 'protected vars',
          'public-mappings-nested': 'public mappings nested',
          'rtlo': 'rtlo',
          'shadowing-state': 'shadowing state',
          'suicidal': 'suicidal',
          'uninitialized-state': 'uninitialized state',
          'uninitialized-storage': 'uninitialized storage',
          'unprotected-upgrade': 'unprotected upgrade',
          'codex': 'codex',
          'arbitrary-send-erc20-permit': 'arbitrary send erc20 permit',
          'arbitrary-send-eth': 'arbitrary send eth',
          'controlled-array-length': 'controlled array length',
          'controlled-delegatecall': 'controlled delegatecall',
          'delegatecall-loop': 'delegatecall loop',
          'incorrect-exp': 'incorrect exp',
          'incorrect-return': 'incorrect return',
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
          'unused-return': 'unused return',
          'incorrect-modifier': 'incorrect modifier',
          'shadowing-builtin': 'shadowing builtin',
          'shadowing-local': 'shadowing local',
          'uninitialized-fptr-cst': 'uninitialized fptr cst',
          'variable-scope': 'variable scope',
          'void-cst': 'void cst',
          'calls-loop': 'calls loop',
          'events-access': 'events access',
          'events-maths': 'events maths',
          'incorrect-unary': 'incorrect unary',
          'missing-zero-check': 'missing zero check',
          'reentrancy-benign': 'reentrancy benign',
          'reentrancy-events': 'reentrancy events',
          'return-bomb': 'return bomb',
          'timestamp': 'timestamp',
          'assembly': 'assembly',
          'assert-state-change': 'assert state change',
          'boolean-equal': 'boolean equal',
          'cyclomatic-complexity': 'cyclomatic complexity',
          'deprecated-standards': 'deprecated standards',
          'erc20-indexed': 'erc20 indexed',
          'function-init-state': 'function init state',
          'incorrect-using-for': 'incorrect using for',
          'low-level-calls': 'low level calls',
          'missing-inheritance': 'missing inheritance',
          'naming-convention': 'naming convention',
          'pragma': 'pragma',
          'redundant-statements': 'redundant statements',
          'solc-version': 'solc version',
          'unimplemented-functions': 'unimplemented functions',
          'unused-import': 'unused import',
          'unused-state': 'unused state',
          'costly-loop': 'costly loop',
          'dead-code': 'dead code',
          'reentrancy-unlimited-gas': 'reentrancy unlimited gas',
          'too-many-digits': 'too many digits',
          'cache-array-length': 'cache array length',
          'constable-states': 'constable states',
          'external-function': 'external function',
          'immutable-states': 'immutable states',
          'var-read-using-this': 'var read using this'
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

            try {
                const { projectName, filename } = req.body;

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

                // Execute Slither analysis
                const { overview, vulns } = await executeSlitherAnalysis(filePath);

                // Parse results
                const scanDuration = timer.stop();
                const metrics = parseSlitherOutput(overview, scanDuration);
                const vulnerabilities = parseSlitherVulns(vulns);

                // Save metrics to database
                const { data: metricsData, error: metricsError } = await supabase
                    .from('slither_metrics')
                    .insert([{
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
                    }])
                    .select();

                if (metricsError) throw metricsError;

                // Save vulnerabilities
                const savedVulns = await saveVulnerabilities(supabase, metricsData[0].id, vulnerabilities);

                // Clean up file
                try {
                    await fs.unlink(filePath);
                } catch (cleanupError) {
                    console.error('Error cleaning up file:', cleanupError);
                }

                // Send response
                res.status(200).json({
                    status: 'success',
                    message: 'Analysis completed successfully',
                    data: {
                        projectName,
                        metrics: {
                            ...metrics,
                            issues: {
                                optimization: metrics.optimization_issues,
                                informational: metrics.informational_issues,
                                low: metrics.low_issues,
                                medium: metrics.medium_issues,
                                high: metrics.high_issues,
                            }
                        },
                        vulnerabilities: savedVulns,
                        timestamp: new Date().toISOString(),
                        id: metricsData[0].id
                    }
                });

            } catch (error) {
                console.error('Analysis error:', error);
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