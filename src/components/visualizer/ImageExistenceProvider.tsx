
import React, { createContext, useContext, useEffect } from 'react';
import { useImageExistence } from '@/hooks/useImageExistence';

interface ImageExistenceContextType {
  ribbonExists: boolean;
  packageExists: boolean;
  checkRibbon: (url: string) => void;
  checkPackage: (url: string) => void;
}

const ImageExistenceContext = createContext<ImageExistenceContextType | undefined>(undefined);

export const useImageExistenceContext = () => {
  const context = useContext(ImageExistenceContext);
  if (!context) {
    throw new Error('useImageExistenceContext must be used within an ImageExistenceProvider');
  }
  return context;
};

interface ImageExistenceProviderProps {
  ribbonUrl: string;
  packageUrl: string;
  children: React.ReactNode;
}

export const ImageExistenceProvider: React.FC<ImageExistenceProviderProps> = ({ 
  ribbonUrl, 
  packageUrl, 
  children 
}) => {
  const { imageExists: ribbonExists, checkImage: checkRibbon } = useImageExistence();
  const { imageExists: packageExists, checkImage: checkPackage } = useImageExistence();
  
  useEffect(() => {
    if (ribbonUrl) {
      checkRibbon(ribbonUrl);
    }
    
    if (packageUrl) {
      checkPackage(packageUrl);
    }
  }, [ribbonUrl, packageUrl, checkRibbon, checkPackage]);
  
  return (
    <ImageExistenceContext.Provider value={{ 
      ribbonExists, 
      packageExists, 
      checkRibbon, 
      checkPackage 
    }}>
      {children}
    </ImageExistenceContext.Provider>
  );
};
