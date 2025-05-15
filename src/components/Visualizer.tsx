
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useProductsStore } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import ColorSelector from '@/components/visualizer/ColorSelector';
import VisualizationArea from '@/components/visualizer/VisualizationArea';
import DebugInfo from '@/components/visualizer/DebugInfo';
import Disclaimer from '@/components/visualizer/Disclaimer';
import { useImageExistence } from '@/hooks/useImageExistence';

const Visualizer: React.FC = () => {
  const ribbonColors = useProductsStore(state => state.ribbonColors);
  const packageColors = useProductsStore(state => state.packageColors);
  // const combinations = useProductsStore(state => state.combinations);
  const isMobile = useIsMobile();
  
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>(ribbonColors[0]?.id || '');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packageColors[0]?.id || '');
  
  // Get the selected ribbon and package
  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);
  
  // Try to get fallback combination image if separate images don't exist
  const fallbackCombinationImage = ''; // Since combinations are removed
  
  // Define image paths
  const ribbonImagePath = selectedRibbon?.code ? `/lovable-uploads/fita_${selectedRibbon.code.toLowerCase()}.png` : '';
  const packageImagePath = selectedPackage?.code ? `/lovable-uploads/embalagem_${selectedPackage.code.toLowerCase()}.png` : '';
  
  // Use custom hooks for image existence checking
  const { imageExists: ribbonImageExists, checkImage: checkRibbonImage } = useImageExistence();
  const { imageExists: packageImageExists, checkImage: checkPackageImage } = useImageExistence();
  
  useEffect(() => {
    // Check if ribbon image exists
    if (selectedRibbon?.code) {
      checkRibbonImage(ribbonImagePath);
    }
    
    // Check if package image exists
    if (selectedPackage?.code) {
      checkPackageImage(packageImagePath);
    }
  }, [selectedRibbonId, selectedPackageId, ribbonImagePath, packageImagePath]);
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6 card-content">
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ColorSelector
              id="ribbon"
              label="Escolha a cor da fita"
              options={ribbonColors}
              value={selectedRibbonId}
              onChange={setSelectedRibbonId}
            />
            
            <ColorSelector
              id="package"
              label="Escolha a cor da embalagem"
              options={packageColors}
              value={selectedPackageId}
              onChange={setSelectedPackageId}
            />
          </div>
          
          <div className="mt-4 sm:mt-8">
            <VisualizationArea
              ribbonCode={selectedRibbon?.code}
              ribbonName={selectedRibbon?.name}
              ribbonColor={selectedRibbon?.color}
              packageCode={selectedPackage?.code}
              packageName={selectedPackage?.name}
              packageColor={selectedPackage?.color}
              fallbackCombinationImage={fallbackCombinationImage}
            />
            
            <DebugInfo
              ribbonId={selectedRibbonId}
              ribbonCode={selectedRibbon?.code}
              packageId={selectedPackageId}
              packageCode={selectedPackage?.code}
              ribbonImagePath={ribbonImagePath}
              ribbonImageExists={ribbonImageExists}
              packageImagePath={packageImagePath}
              packageImageExists={packageImageExists}
              fallbackCombinationImage={fallbackCombinationImage}
            />
          </div>
          
          <Disclaimer />
        </div>
      </CardContent>
    </Card>
  );
};

export default Visualizer;
