import React, { useState } from 'react';
import axios from 'axios'; // For HTTP requests
import CustomButton from '../utils/CustomButton';
import { X, Upload } from 'lucide-react';

interface UploadFormProps {
    style?:string
    title:string
}

const UploadForm = ({style, title}: UploadFormProps) => {
    const [projectName, setProjectName] = useState<string>(''); // Track project name input
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');  
  const [messageName, setMessageName] = useState<string>('');  

  const [openUpload, setOpenUpload] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [IsUploading, setIsUploading] = useState(false)
  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value); // Update project name
  };

  // Toggle Upload Modal Visibility
  const handleUploadButton = () => setOpenUpload(true);
  const closeUploadButton = () => setOpenUpload(false);

  // Handle File Selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent page refresh
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
        setFileName(selectedFile.name)
        const formData = new FormData();
        formData.append('file', selectedFile);

        setIsUploading(true); // Start loading

        try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        setMessage(response.data.message);
        } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('File upload failed. Please try again.');
        } finally {
        setIsUploading(false); // Stop loading
        }
    };
  };

  // Remove Selected File
  const removeFile = () => {
    setFile(null);
    setFileName('');
  };

  // Handle Form Submission and File Upload
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent page refresh

  // Validate project name
  if (!projectName.trim()) {
    setMessageName('Please enter a project name before uploading.');
    return;
  } else {
    setMessageName('');
  }

  // Validate file selection
  if (!file) {
    setMessage('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectName', projectName); // Optional: Include project name

  setIsUploading(true); // Start loading

  try {
    const response = await axios.post('http://localhost:3001/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Slither Scan Results:', response.data.results); // Print results to console
    setMessage('Scan completed successfully!'); // Display success message on frontend
  } catch (error) {
    console.error('Error during scan:', error);
    setMessage('File upload or scan failed. Please try again.'); // Display error message
  } finally {
    setIsUploading(false); // Stop loading
  }
};


  return (
    <div>
      <CustomButton
        handleClick={handleUploadButton}
        style={`${style}`}
        title={`${title}`}
      />

      {openUpload && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-7xl w-full">
            <div className="flex justify-between items-center p-6">
              <h2 className="text-2xl font-semibold">Upload Contract</h2>
              <button onClick={closeUploadButton}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex">
              <div className="p-6 rounded-xl flex-[3]">
                <p className="text-gray-600 mb-4 text-left text-[18px]">
                  Upload your Solidity files (.sol extension) as a project and scan to detect vulnerabilities.
                </p>
                <p className="text-gray-600 mb-4 text-left text-[18px]">
                  For instructions, visit our{" "}
                  <a
                    href="https://docs.solidityscan.com"
                    className="text-blue-600 hover:underline"
                  >
                    documentation
                  </a>.
                </p>

                <div className="space-y-4 rounded-full">
                    <div className='flex flex-col items-start'>
                    <p className='pt-12 pb-2 text-2xl flex items-end'>Project name 
                        <span className='text-[18px] ml-4 text-purple-600 '>{messageName && <p>{messageName}</p>}</span></p>
                    <input type='text' 
                    className='w-full text-black p-2 border-2 border-gray-300 rounded-xl' 
                    placeholder="Enter Project Name" 
                    onChange={handleProjectNameChange}/>
                    </div>
                    
                  

                  {!file ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2 text-[18px]">
                        Drag and drop or{" "}
                        <label className="text-blue-600 cursor-pointer">
                          Browse
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=""
                          />
                        </label>{" "}
                        to upload.
                      </p>
                      <p className="text-sm text-gray-500 text-[16px]">
                        You can upload only one .sol file. Max size: 10 MB.
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className='flex items-center text-[18px]'>{fileName} <span className='ml-4 text-purple-600'>{message && <p>{message}</p>}</span></p>
                      
                      <button onClick={removeFile}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <button
                    type="submit"
                    className="py-4 w-full bg-gradient-to-r 
                      from-primary-red via-pink-500 to-purple-600 
                      hover:from-red-700 hover:via-pink-700 hover:to-purple-800
                      rounded-xl text-2xl text-white"                  >
                    Start Scan
                  </button>
                </form>
               
                  
                </div>
              </div>

              <div className="p-6 bg-white rounded-b-xl flex space-x-4 flex-[2]">
                <div className="bg-gray-50 p-4 rounded-xl  w-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center">
                    <svg width="392" height="318" viewBox="0 0 392 318" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="391" height="317" rx="17.5" fill="#FBFBFB" stroke="#E2E2E2"/>
                    <path d="M150 218.328V140.642L167.799 124H220.432C223.012 124 225.103 126.092 225.103 128.672V218.328C225.103 220.908 223.012 223 220.432 223H154.672C152.092 223 150 220.908 150 218.328Z" fill="white" stroke="#4E5D78" stroke-width="4.67151"/>
                    <path d="M169.016 141.66H152.037L169.016 126.039V141.66Z" fill="#4E5D78"/>
                    <rect x="176.598" y="159.461" width="65.0149" height="32.5075" rx="4.67151" fill="#e73606"/>
                    <path d="M189.167 185.378C188.607 185.378 188.127 185.188 187.727 184.806C187.328 184.424 187.131 183.958 187.137 183.409C187.131 182.872 187.328 182.413 187.727 182.031C188.127 181.649 188.607 181.458 189.167 181.458C189.708 181.458 190.179 181.649 190.578 182.031C190.984 182.413 191.191 182.872 191.197 183.409C191.191 183.773 191.092 184.105 190.901 184.403C190.717 184.701 190.471 184.94 190.163 185.119C189.862 185.292 189.53 185.378 189.167 185.378Z" fill="#4E5D78"/>
                    <path d="M205.847 175.068L202.802 175.39C202.716 175.092 202.565 174.811 202.35 174.549C202.141 174.286 201.858 174.074 201.501 173.913C201.144 173.752 200.707 173.672 200.191 173.672C199.495 173.672 198.911 173.818 198.437 174.11C197.97 174.403 197.739 174.781 197.745 175.247C197.739 175.647 197.89 175.972 198.198 176.222C198.511 176.473 199.028 176.679 199.748 176.84L202.165 177.341C203.506 177.622 204.503 178.066 205.155 178.675C205.813 179.283 206.145 180.08 206.151 181.064C206.145 181.93 205.884 182.693 205.367 183.356C204.856 184.012 204.146 184.525 203.235 184.895C202.325 185.265 201.279 185.45 200.098 185.45C198.364 185.45 196.967 185.098 195.909 184.394C194.851 183.684 194.221 182.696 194.018 181.431L197.275 181.127C197.423 181.748 197.736 182.216 198.216 182.532C198.696 182.849 199.32 183.007 200.089 183.007C200.883 183.007 201.519 182.849 201.999 182.532C202.485 182.216 202.728 181.825 202.728 181.36C202.728 180.966 202.571 180.641 202.257 180.384C201.95 180.128 201.47 179.931 200.818 179.794L198.401 179.301C197.041 179.027 196.035 178.564 195.383 177.914C194.731 177.258 194.408 176.428 194.415 175.426C194.408 174.579 194.645 173.845 195.125 173.224C195.611 172.598 196.285 172.114 197.146 171.774C198.013 171.428 199.013 171.255 200.144 171.255C201.805 171.255 203.112 171.598 204.066 172.284C205.025 172.971 205.619 173.898 205.847 175.068Z" fill="#4E5D78"/>
                    <path d="M215.087 185.45C213.703 185.45 212.504 185.155 211.489 184.564C210.474 183.973 209.687 183.147 209.127 182.085C208.573 181.023 208.296 179.782 208.296 178.362C208.296 176.941 208.573 175.697 209.127 174.629C209.687 173.561 210.474 172.732 211.489 172.141C212.504 171.55 213.703 171.255 215.087 171.255C216.471 171.255 217.671 171.55 218.686 172.141C219.701 172.732 220.485 173.561 221.039 174.629C221.598 175.697 221.878 176.941 221.878 178.362C221.878 179.782 221.598 181.023 221.039 182.085C220.485 183.147 219.701 183.973 218.686 184.564C217.671 185.155 216.471 185.45 215.087 185.45ZM215.106 182.855C215.856 182.855 216.484 182.655 216.988 182.255C217.493 181.849 217.868 181.306 218.114 180.626C218.366 179.946 218.492 179.188 218.492 178.353C218.492 177.511 218.366 176.75 218.114 176.07C217.868 175.384 217.493 174.838 216.988 174.432C216.484 174.027 215.856 173.824 215.106 173.824C214.337 173.824 213.697 174.027 213.187 174.432C212.682 174.838 212.304 175.384 212.052 176.07C211.806 176.75 211.683 177.511 211.683 178.353C211.683 179.188 211.806 179.946 212.052 180.626C212.304 181.306 212.682 181.849 213.187 182.255C213.697 182.655 214.337 182.855 215.106 182.855Z" fill="#4E5D78"/>
                    <path d="M228.053 166.852V185.182H224.713V166.852H228.053Z" fill="#4E5D78"/>
                    </svg>                      
                    </div>
                  </div>
                  <h3 className="text-[20px] font-semibold mb-2 text-left">NOTE: Avoid scan failures by following these rules:</h3>
                  <ul className="text-[18px] text-gray-600 space-y-2 list-disc list-inside text-left">
                    <li>Only one .sol file can be uploaded.</li>
                    <li>Max file size is 10 MB.</li>
                    <li>Do not compress files into zip archives.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
