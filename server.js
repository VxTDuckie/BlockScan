const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS to allow requests from the frontend
app.use(cors());

// Configure Multer to store uploaded files in the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// Route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully!', file: req.file });
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
