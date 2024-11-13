import React from 'react';

interface PdfTemplateProps {
  children: React.ReactNode;
}

const PdfTemplate: React.FC<PdfTemplateProps> = ({ children }) => {
    return (
      <div className="pdf-container">
        <div className="a4-page">
          {children}
        </div>
  
        <style jsx global>{`
          .pdf-container {
            /* Remove the background and padding that's causing the gray space */
            padding: 0;
            background: none;
            display: flex;
            justify-content: center;
            /* Remove margin between pages */
            margin: 0;
          }
  
          .a4-page {
            background: white;
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            /* Remove the margin that's causing spacing between pages */
            margin: 0;
            /* Remove shadow in preview */
            box-shadow: none;
            
            @media print {
              margin: 0;
              box-shadow: none;
              break-after: page;
            }
          }
          
          
        `}</style>
      </div>
    );
  };

export default PdfTemplate;