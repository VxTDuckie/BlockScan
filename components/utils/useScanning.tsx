// hooks/useScanning.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const startScanning = (id: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // After the scanning is done, navigate to the contract page
      router.push(`/projects/${id}`);
    }, 800); 
  };

  return { isScanning, startScanning, setIsScanning };
};
