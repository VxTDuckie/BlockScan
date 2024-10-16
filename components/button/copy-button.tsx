import React from 'react';
interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <button onClick={handleCopy} className="text-gray-500  hover:scale-125 transition-all duration-300">
      <img src="/images/copy-icon.png" alt="Copy" className="w-5 h-5 inline-block" />
    </button>
  );
};

export default CopyButton;