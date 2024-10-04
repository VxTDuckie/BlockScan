// hooks/useScanning.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const startScanning = (inputValue: string, defaultContract = '0x576e2bed8f7b46d34016198911cdf9886f78bea7') => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // After the scanning is done, navigate to the contract page
      router.push(`/contract/${inputValue || defaultContract}`);
    }, 1000); // Simulate a 3-second scan
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, inputValue: string) => {
    if (e.key === 'Enter') {
      startScanning(inputValue); // Trigger scanning on Enter key press
    }
  };

  return { isScanning, startScanning, handleKeyPress };
};
