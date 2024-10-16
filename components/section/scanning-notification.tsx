import React from 'react';

// Component for displaying a scanning notification
const ScanningNotification: React.FC = () => {
  return (
    <div className='z-50'>
      {/* Background overlay for the modal */}
      <div className="z-50 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal content centered on the screen */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 sm:p-12 max-w-[90%] sm:max-w-[500px] mx-auto">
          <p className="text-2xl sm:text-4xl font-semibold mb-4">Hold up!</p>
          <p className="flex items-center gap-2 text-xl sm:text-2xl">
            {/* Spinning icon indicating loading */}
            <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-primary-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Contract is being scanned
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanningNotification;
