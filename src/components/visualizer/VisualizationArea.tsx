
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SimpleRepresentation from './SimpleRepresentation';
import CombinedImagesView from './CombinedImagesView';
import FallbackImageView from './FallbackImageView';

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
        <CombinedImagesView 
          packageImagePath={packageImagePath}
          ribbonImagePath={ribbonImagePath}
          packageName={packageName}
          ribbonName={ribbonName}
        />
      )}
      
      {!hasValidImages && hasFallbackImage && (
        <FallbackImageView imageUrl={fallbackCombinationImage} />
      )}
      
      {!hasValidImages && !hasFallbackImage && (
        <SimpleRepresentation 
          packageColor={packageColor} 
          ribbonColor={ribbonColor} 
        />
      )}
    </AspectRatio>
  );
};

export default VisualizationArea;
