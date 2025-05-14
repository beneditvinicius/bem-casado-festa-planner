
import React from 'react';
import SimpleRepresentation from './SimpleRepresentation';
import CombinedImagesView from './CombinedImagesView';
import { useImageExistenceContext } from './ImageExistenceProvider';

interface VisualizationRendererProps {
  packageUrl: string;
  ribbonUrl: string;
  packageName?: string;
  ribbonName?: string;
  packageColor?: string;
  ribbonColor?: string;
  fallbackCombinationImage?: string;
}

const VisualizationRenderer: React.FC<VisualizationRendererProps> = ({
  packageUrl,
  ribbonUrl,
  packageName,
  ribbonName,
  packageColor,
  ribbonColor,
  fallbackCombinationImage
}) => {
  const { ribbonExists, packageExists } = useImageExistenceContext();

  // Check if we have a direct fallback image first
  if (fallbackCombinationImage) {
    return (
      <div className="relative w-full h-full">
        <img 
          src={fallbackCombinationImage} 
          alt="Combinação" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
  
  // If both images exist, show combined view
  if (ribbonExists && packageExists) {
    return (
      <CombinedImagesView 
        packageImageUrl={packageUrl}
        ribbonImageUrl={ribbonUrl}
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

export default VisualizationRenderer;
