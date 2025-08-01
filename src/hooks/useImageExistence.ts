
import { useState, useCallback, useEffect } from 'react';

interface UseImageExistenceResult {
  imageExists: boolean;
  checkImage: (imagePath: string) => void;
}

export const useImageExistence = (): UseImageExistenceResult => {
  const [imageExists, setImageExists] = useState<boolean>(false);
  
  const checkImage = useCallback((imagePath: string) => {
    if (!imagePath) {
      setImageExists(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      setImageExists(true);
      console.log(`Imagem encontrada: ${imagePath}`);
    };
    img.onerror = () => {
      setImageExists(false);
      console.log(`Imagem não encontrada: ${imagePath}`);
    };
    img.src = imagePath;
  }, []);
  
  return { imageExists, checkImage };
};
