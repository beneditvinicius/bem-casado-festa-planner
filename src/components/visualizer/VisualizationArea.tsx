
import React, { useState, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SimpleRepresentation from './SimpleRepresentation';
import CombinedImagesView from './CombinedImagesView';
import { useImageExistence } from '@/hooks/useImageExistence';
import { toast } from "@/components/ui/use-toast";
import { useProductsStore } from '@/data/products';

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
  // Buscando do store a URL direta de cada imagem
  const ribbonColors = useProductsStore(state => state.ribbonColors);
  const packageColors = useProductsStore(state => state.packageColors);
  
  const ribbon = ribbonCode && ribbonColors.find(r => r.code === ribbonCode);
  const pack = packageCode && packageColors.find(p => p.code === packageCode);
  
  // Fallback para URLs tradicionais caso não tenha imageUrl no store
  const ribbonImagePath = ribbonCode ? `/lovable-uploads/fita_${ribbonCode.toLowerCase()}.png` : '';
  const packageImagePath = packageCode ? `/lovable-uploads/embalagem_${packageCode.toLowerCase()}.png` : '';
  
  const ribbonUrl = ribbon?.imageUrl || ribbonImagePath;
  const packageUrl = pack?.imageUrl || packageImagePath;
  
  // Verifica existência dos dois arquivos
  const { imageExists: ribbonExists, checkImage: checkRibbon } = useImageExistence();
  const { imageExists: packageExists, checkImage: checkPackage } = useImageExistence();
  
  // State to track when combination changes
  const [lastCombination, setLastCombination] = useState<string>('');
  
  useEffect(() => {
    // Check if ribbon image exists
    if (ribbonUrl) {
      checkRibbon(ribbonUrl);
    }
    
    // Check if package image exists
    if (packageUrl) {
      checkPackage(packageUrl);
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
  }, [ribbonCode, packageCode, ribbonUrl, packageUrl, ribbonName, packageName, checkRibbon, checkPackage, lastCombination]);
  
  // Render appropriate visualization based on available images
  const renderVisualization = () => {
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

  return (
    <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
      {renderVisualization()}
    </AspectRatio>
  );
};

export default VisualizationArea;
