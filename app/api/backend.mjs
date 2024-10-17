// Imports using ES6 modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import multer from 'multer'; // Use multer for file uploads
import ProjectNameModel from './schema.mjs'; // Import your Mongoose model

const app = express(); // Initialize Express app

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: '*' })); // Enable CORS for all origins

// MongoDB connection
const mongoUrl = "mongodb+srv://leviron:123456Bom@blockscan.gooou.mongodb.net/BlockScanDB?retryWrites=true&w=majority&appName=BlockScan";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.error('Database connection error:', e));

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname); // Save files with original names
  },
});

const upload = multer({ storage });

// Route: Contract File Upload
app.post('/contract-upload', upload.single('contractFile'), (req, res) => {
  try {
    const contractFile = req.file; // Access uploaded file
    const fileExtension = path.extname(contractFile.originalname).toLowerCase(); // Check extension

    if (fileExtension !== '.sol') {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid file type. Only .sol files allowed.' });
    }

    res.status(200).json({ status: 'ok', message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'File upload failed.' });
  }
});

// Route: Contract Analyze and Save Project Name
app.post('/contract-analyze', async (req, res) => {
  try {
    const { projectName } = req.body; // Access project name from request body

    if (!projectName) {
      return res.status(400).json({ status: 'error', message: 'Project name is required.' });
    }

    console.log(`Project Name: ${projectName}`);

    // Save project name to the database
    await ProjectNameModel.create({ projectName });

    res.status(200).json({ status: 'ok', message: 'Project name saved successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save project name.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
