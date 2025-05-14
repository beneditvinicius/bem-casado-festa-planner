
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useProductsStore } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import ColorSelector from '@/components/visualizer/ColorSelector';
import VisualizationArea from '@/components/visualizer/VisualizationArea';
import DebugInfo from '@/components/visualizer/DebugInfo';
import Disclaimer from '@/components/visualizer/Disclaimer';

const Visualizer: React.FC = () => {
  const ribbonColors = useProductsStore(state => state.ribbonColors);
  const packageColors = useProductsStore(state => state.packageColors);
  const combinations = useProductsStore(state => state.combinations);
  const isMobile = useIsMobile();
  
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>(ribbonColors[0]?.id || '');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packageColors[0]?.id || '');
  
  // Get the selected ribbon and package
  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);
  
  // Get image paths based on color codes
  const getRibbonImagePath = (code: string) => `/lovable-uploads/fita_${code.toLowerCase()}.png`;
  const getPackageImagePath = (code: string) => `/lovable-uploads/embalagem_${code.toLowerCase()}.png`;
  
  // Check if the images exist
  const [ribbonImageExists, setRibbonImageExists] = useState<boolean>(false);
  const [packageImageExists, setPackageImageExists] = useState<boolean>(false);
  
  // Try to get fallback combination image if separate images don't exist
  const fallbackCombinationImage = combinations.find(
    c => c.ribbonId === selectedRibbonId && c.packageId === selectedPackageId
  )?.imageUrl || '';
  
  const ribbonImagePath = selectedRibbon?.code ? getRibbonImagePath(selectedRibbon.code) : '';
  const packageImagePath = selectedPackage?.code ? getPackageImagePath(selectedPackage.code) : '';
  
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
