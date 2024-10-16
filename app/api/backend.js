const express = require("express");
const app = new express();
const mongoose = require("mongoose")
app.use(express.json());
const cors = require("cors");
app.use(cors());
const path = require('path');
const mongoUrl = "mongodb+srv://leviron:123456Bom@blockscan.gooou.mongodb.net/?retryWrites=true&w=majority&appName=BlockScan";
mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
    }).then (() => 
        console.log("Connected to database"),
    ).catch ((e) => console.log(e))

require("./contractDetail");
const ContractNameDB = mongoose.model("ProjectName")

app.listen(5000, () =>{
    console.log("Server Started");
})

///////////////////////////////////////////////////////////
const multer  = require('multer');
const { error } = require("console");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage})


app.post('/contract-upload', upload.single('contractFile'), (req, res) => {
    try {
      const contractFile = req.file; // Get the uploaded file 
      const fileExtension = path.extname(contractFile.originalname).toLowerCase(); // Get the file extension
  
      if (fileExtension !== '.sol') {
        return res.status(400).json({
          status: 'error',
        });
      }
  
      // If valid, return success response
      return res.status(200).json({
        status: 'ok',
      });
  
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      return res.status(500).json({
        status: 'error',
      });
    }
  });

  app.post("/contract-analyze", upload.single('projectName'), async (req, res) => {
    try {
      const projectName = req.body.projectName; // Get project name from form data
  
      console.log(`Project Name: ${projectName}`);
  
      // Save the project name to the database
      await ContractNameDB.create({ "Project Name": projectName });
  
      // Respond with success
      res.status(200).json({ status: 'ok', message: 'Project name successfully.' });
      
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to save project.' });
    }

  });
