import React, { useState } from 'react';
import axios from 'axios';

const ContractUploader: React.FC = () => {
    const [contractCode, setContractCode] = useState<string>(''); // Type for contractCode
    const [analysisResult, setAnalysisResult] = useState<any>(''); // Type for analysisResult (can be more specific if known)
    const [error, setError] = useState<string | null>(null); // Type for error

    // Handle file upload and read the .sol file content
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Optional chaining to prevent null errors
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setContractCode(event.target?.result as string); // Store the Solidity code
            };
            reader.readAsText(file);
        }
    };

    // Function to send the contract code to the backend for analysis
    const analyzeContract = async () => {
        if (!contractCode) {
            setError('Please upload a valid Solidity file.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/analyze', {
                code: contractCode,
            });
            setAnalysisResult(response.data); // Display result from backend
        } catch (err) {
            setError('Error analyzing the contract: ' + (axios.isAxiosError(err) ? err.message : 'Unknown error'));
        }
    };

    return (
        <div className="contract-uploader">
            <h2>Upload Solidity Contract for Analysis</h2>
            <input type="file" accept=".sol" onChange={handleFileUpload} />
            <button onClick={analyzeContract}>Analyze Contract</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {analysisResult && (
                <div>
                    <h3>Analysis Result:</h3>
                    <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ContractUploader;
