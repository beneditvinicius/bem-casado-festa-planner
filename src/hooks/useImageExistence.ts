
import { useState, useEffect } from 'react';

interface UseImageExistenceResult {
  imageExists: boolean;
  checkImage: (imagePath: string) => void;
}

export const useImageExistence = (): UseImageExistenceResult => {
  const [imageExists, setImageExists] = useState<boolean>(false);
  
  const checkImage = (imagePath: string) => {
    if (!imagePath) {
      setImageExists(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => setImageExists(true);
    img.onerror = () => {
      setImageExists(false);
      console.log(`Image not found: ${imagePath}`);
    };
    img.src = imagePath;
  };
  
  return { imageExists, checkImage };
};
