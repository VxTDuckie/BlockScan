import React from 'react';


//Component to display contract report in pdf format and allow users to download
const PdfViewer: React.FC = () => {
  const pdfUrl = '/pdf-reference.pdf'; // The path to your PDF in the public folder

  return (
    <div style={styles.container}>
      <div className='flex justify-center items-center mb-4 gap-12'> {/* Adjusted mb-8 to mb-4 */}
        <h1 className='text-3xl text-white font-bold'>View and Download PDF</h1>
        <a 
          href={pdfUrl} 
          download="pdf-reference.pdf"
          className='bg-primary-red text-white rounded-full px-4 py-2 lg:py-3 shadow-glow-red'
        >
          Download PDF
        </a>
      </div>

      {/* Embed the PDF for viewing */}
      <iframe
        src={pdfUrl}
        style={styles.pdfViewer}
        title="PDF Viewer"
      />
    </div>
  );
};

// Basic styles for the page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from center to flex-start to move content up
    height: '90vh', // Reduced height from 100vh to 90vh
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'black',
    padding: '20px', // Added padding to the container for some space
  } as React.CSSProperties, // Type for container style
  pdfViewer: {
    width: '80%',
    height: '75vh',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  } as React.CSSProperties, // Type for pdfViewer style
};

export default PdfViewer;
