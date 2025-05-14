
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SimpleRepresentation from './SimpleRepresentation';
import CombinedImagesView from './CombinedImagesView';
import FallbackImageView from './FallbackImageView';
import { useImageExistence } from '@/hooks/useImageExistence';
import { toast } from "@/components/ui/use-toast";

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
  
  // Use custom hooks for image existence checking
  const { imageExists: ribbonImageExists, checkImage: checkRibbonImage } = useImageExistence();
  const { imageExists: packageImageExists, checkImage: checkPackageImage } = useImageExistence();
  
  // Paths for the images
  const ribbonImagePath = ribbonCode ? getRibbonImagePath(ribbonCode) : '';
  const packageImagePath = packageCode ? getPackageImagePath(packageCode) : '';
  
  // State to track when combination changes
  const [lastCombination, setLastCombination] = useState<string>('');
  
  useEffect(() => {
    // Check if ribbon image exists
    if (ribbonCode) {
      checkRibbonImage(ribbonImagePath);
    }
    
    // Check if package image exists
    if (packageCode) {
      checkPackageImage(packageImagePath);
    }
    
    // Generate combination key
    const combinationKey = `${ribbonCode || ''}-${packageCode || ''}`;
    
    // Show toast for new combination
    if (combinationKey !== lastCombination && lastCombination !== '' && ribbonName && packageName) {
      toast({
        title: "Combinação atualizada",
        description: `${ribbonName} + ${packageName}`,
        duration: 2000,
      });
    }
    
    // Update last combination
    setLastCombination(combinationKey);
  }, [ribbonCode, packageCode, ribbonImagePath, packageImagePath, ribbonName, packageName, checkRibbonImage, checkPackageImage, lastCombination]);
  
  const hasFallbackImage = Boolean(fallbackCombinationImage);
  
  // Render appropriate visualization based on available images
  const renderVisualization = () => {
    if (hasFallbackImage) {
      return <FallbackImageView imageUrl={fallbackCombinationImage!} />;
    }
    
    // If we have both images, use them
    if (ribbonImageExists && packageImageExists) {
      return (
        <CombinedImagesView 
          packageImagePath={packageImagePath}
          ribbonImagePath={ribbonImagePath}
          packageName={packageName}
          ribbonName={ribbonName}
        />
      );
    }
    
    // Fallback to simple representation
    return (
      <SimpleRepresentation 
        packageColor={packageColor} 
        ribbonColor={ribbonColor} 
      />
    );
  };

  return (
    <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
      {renderVisualization()}
    </AspectRatio>
  );
};

export default VisualizationArea;
