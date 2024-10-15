import React, { useState } from 'react';
import {HandleSafetyCheck} from '@/components/index';


//Component for displaying contract safety check results
const SafetyCheck: React.FC = () => {
  // State quản lý tab đang được chọn (Token Detector hoặc General Detector)
  const [isChosen, setIsChosen] = useState(true); 
  

  return (
    <main>
      {/* Nút chọn giữa hai tab: Token Detector và General Detector */}
      <div className='flex space-x-4 mb-4 justify-center sm:justify-start'>
        <div className=''>
          <button
            onClick={() => setIsChosen(true)}
            className={`px-6 py-3 text-hard-red text-xl font-semibold transition-all duration-300 ease-in-out transform 
              ${isChosen ? 'border-b-4 border-primary-red text-opacity-100 ' : 
              'text-opacity-70 border-b-2 border-transparent hover:border-primary-red hover:text-opacity-100 hover:scale-105'}`}
          >
            <span>Token Detector</span>
          </button>
          <button
            onClick={() => setIsChosen(false)}
            className={`px-6 py-3 text-hard-red text-xl font-semibold transition-all duration-300 ease-in-out transform 
              ${!isChosen ? 'border-b-4 border-primary-red text-opacity-100' : 
              'text-opacity-70 border-b-2 border-transparent hover:border-primary-red hover:text-opacity-100 hover:scale-105'}`}
          >
            <span>General Detector</span>
          </button>
        </div>
      </div>
      
      <div>
        <HandleSafetyCheck isTokenDetector={isChosen}/>
      </div>
    </main>
  );
};

export default SafetyCheck;