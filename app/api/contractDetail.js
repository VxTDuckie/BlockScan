const mongoose = require('mongoose');

const ProjectNameSchema = new mongoose.Schema(
  {
  "Project Name": String
},
{
  collection: "ProjectName",
}

)
mongoose.model("ProjectName", ProjectNameSchema);
// Schema for individual vulnerabilities
{/*const VulnerabilitySchema = new mongoose.Schema({
  severity: { type: String, enum: ['informational', 'low', 'medium', 'high'], required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, // Function or line where the issue occurs
});

// Schema for contract metadata and vulnerabilities
const ContractSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Contract name
  functionsCount: { type: Number, required: true }, // Number of functions
  isERC: { type: Boolean, default: false }, // ERC compliance (e.g., ERC20)
  pausable: { type: Boolean, default: false }, // Pausable functionality
  mintingRestricted: { type: Boolean, default: false }, // Minting restrictions
  raceConditionMitigated: { type: Boolean, default: false }, // ERC20 race condition mitigation
  complexCode: { type: Boolean, default: false }, // Advanced logic (assembly, delegatecall)
  vulnerabilities: [VulnerabilitySchema], // List of vulnerabilities
});

// Schema for the entire scan report
const ScanResultSchema = new mongoose.Schema({
  contracts: [ContractSchema], // List of contracts/libraries scanned
  totalIssues: {
    informational: { type: Number, default: 0 },
    low: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp of the scan
});*/}


