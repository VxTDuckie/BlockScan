// Imports using ES6 modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import multer from 'multer'; // Use multer with ES6 imports
import ContractNameDB from './contractDetail.mjs'; // Import the Mongoose model correctly

const app = express(); // Initialize express app

// Middleware setup
app.use(express.json()); // Handle JSON requests
app.use(cors()); // Enable CORS

// MongoDB connection
const mongoUrl =
  'mongodb+srv://leviron:123456Bom@blockscan.gooou.mongodb.net/BlockScanDB?retryWrites=true&w=majority&appName=BlockScan';
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((e) => console.error('Database connection error:', e));

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route: Contract File Upload
app.post('/contract-upload', upload.single('contractFile'), (req, res) => {
  try {
    const contractFile = req.file; // Get the uploaded file
    const fileExtension = path.extname(contractFile.originalname).toLowerCase(); // Check extension

    if (fileExtension !== '.sol') {
      return res.status(400).json({ status: 'error', message: 'Invalid file type.' });
    }

    res.status(200).json({ status: 'ok', message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'File upload failed.' });
  }
});

// Route: Contract Analyze and Save Project Name
app.post('/contract-analyze', upload.single('projectName'), async (req, res) => {
  try {
    const { projectName } = req.body; // Get project name from form data

    console.log(`Project Name: ${projectName}`);

    // Save project name to the database
    await ContractNameDB.create({ projectName });

    res.status(200).json({ status: 'ok', message: 'Project name saved successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save project name.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});