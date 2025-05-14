
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Info } from "lucide-react";
import { imageExists } from '@/lib/utils';

interface VisualizationAreaProps {
  ribbonCode?: string;
  ribbonName?: string;
  ribbonColor?: string;
  packageCode?: string;
  packageName?: string;
  packageColor?: string;
  fallbackCombinationImage?: string;
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({
  ribbonCode,
  ribbonName,
  ribbonColor,
  packageCode,
  packageName,
  packageColor,
  fallbackCombinationImage
}) => {
  // Get image paths based on color codes
  const getRibbonImagePath = (code: string) => `/lovable-uploads/fita_${code.toLowerCase()}.png`;
  const getPackageImagePath = (code: string) => `/lovable-uploads/embalagem_${code.toLowerCase()}.png`;
  
  // Check if the images exist
  const [ribbonImageExists, setRibbonImageExists] = useState<boolean>(false);
  const [packageImageExists, setPackageImageExists] = useState<boolean>(false);
  
  // Paths for the images
  const ribbonImagePath = ribbonCode ? getRibbonImagePath(ribbonCode) : '';
  const packageImagePath = packageCode ? getPackageImagePath(packageCode) : '';
  
  useEffect(() => {
    // Check if ribbon image exists
    if (ribbonCode) {
      const ribbonPath = getRibbonImagePath(ribbonCode);
      const img = new Image();
      img.onload = () => setRibbonImageExists(true);
      img.onerror = () => {
        setRibbonImageExists(false);
        console.log(`Ribbon image not found: ${ribbonPath}`);
      };
      img.src = ribbonPath;
    } else {
      setRibbonImageExists(false);
    }
    
    // Check if package image exists
    if (packageCode) {
      const packagePath = getPackageImagePath(packageCode);
      const img = new Image();
      img.onload = () => setPackageImageExists(true);
      img.onerror = () => {
        setPackageImageExists(false);
        console.log(`Package image not found: ${packagePath}`);
      };
      img.src = packagePath;
    } else {
      setPackageImageExists(false);
    }
  }, [ribbonCode, packageCode]);
  
  const hasValidImages = ribbonImageExists && packageImageExists;
  const hasFallbackImage = Boolean(fallbackCombinationImage);
  
  return (
    <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
      {hasValidImages && (
        <div className="relative w-full h-full">
          <img 
            src={packageImagePath} 
            alt={`Embalagem ${packageName}`} 
            className="w-full h-full object-contain absolute top-0 left-0 z-0"
          />
          <img 
            src={ribbonImagePath} 
            alt={`Fita ${ribbonName}`} 
            className="w-full h-full object-contain absolute top-0 left-0 z-10"
          />
        </div>
      )}
      
      {!hasValidImages && hasFallbackImage && (
        <img 
          src={fallbackCombinationImage} 
          alt="Visualização da combinação" 
          className="w-full h-full object-contain" 
        />
      )}
      
      {!hasValidImages && !hasFallbackImage && (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="w-48 sm:w-56 h-28 sm:h-32 mx-auto relative bg-white rounded shadow-md border">
            {/* Representação visual simples quando não há imagem */}
            <div 
              className="absolute inset-0 m-4 border" 
              style={{
                backgroundColor: packageColor || '#FFFFFF'
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1.5" 
              style={{
                backgroundColor: ribbonColor || '#000000'
              }}
            ></div>
          </div>
          <div className="flex items-start mt-4 justify-center">
            <Info className="h-5 w-5 text-amber-800 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-left text-sm text-amber-800">
              Esta combinação de cores não possui uma imagem disponível no momento.<br />
              Acesse o painel administrativo para adicionar mais imagens de combinações.
            </p>
          </div>
        </div>
      )}
    </AspectRatio>
  );
};

export default VisualizationArea;
