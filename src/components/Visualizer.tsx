
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { ColorSelector } from './visualizer/ColorSelector';
import { VisualizationArea } from './visualizer/VisualizationArea'; 
import { Disclaimer } from './visualizer/Disclaimer';
import { DebugInfo } from './visualizer/DebugInfo';
import { useIsMobile } from '@/hooks/use-mobile';
import { CombinationToastNotifier } from './visualizer/CombinationToastNotifier';
import { ImageExistenceProvider } from './visualizer/ImageExistenceProvider';

const Visualizer: React.FC = () => {
  const ribbonColors = useProductsStore(state => state.ribbonColors);
  const packageColors = useProductsStore(state => state.packageColors);
  const isMobile = useIsMobile();
  
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>(ribbonColors[0]?.id || '');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packageColors[0]?.id || '');
  
  // Find selected items
  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);
  
  // Since combinations are removed, we don't need a fallback combination image
  const fallbackCombinationImage = '';
  
  // Define image paths
  const ribbonImagePath = selectedRibbon?.code ? `/lovable-uploads/fita_${selectedRibbon.code.toLowerCase()}.png` : '';
  const packageImagePath = selectedPackage?.code ? `/lovable-uploads/embalagem_${selectedPackage.code.toLowerCase()}.png` : '';
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorSelector 
          title="Cor da Fita" 
          colors={ribbonColors} 
          selectedColorId={selectedRibbonId}
          onChange={setSelectedRibbonId}
        />
        
        <ColorSelector 
          title="Cor da Embalagem"
          colors={packageColors}
          selectedColorId={selectedPackageId}
          onChange={setSelectedPackageId}
        />
      </div>

      {/* Visualization Area */}
      <ImageExistenceProvider>
        <div className="mt-6">
          <VisualizationArea 
            ribbonCode={selectedRibbon?.code || ''}
            packageCode={selectedPackage?.code || ''}
            ribbonColor={selectedRibbon?.color || ''}
            packageColor={selectedPackage?.color || ''}
            ribbonImagePath={ribbonImagePath}
            packageImagePath={packageImagePath}
            fallbackImagePath={fallbackCombinationImage}
          />
        </div>
      </ImageExistenceProvider>
      
      {/* Debug info - only shown in dev mode */}
      {process.env.NODE_ENV === 'development' && (
        <DebugInfo 
          selectedRibbon={selectedRibbon}
          selectedPackage={selectedPackage}
          ribbonImagePath={ribbonImagePath}
          packageImagePath={packageImagePath}
          fallbackImagePath={fallbackCombinationImage}
        />
      )}
      
      {/* Display combination toast notification */}
      <CombinationToastNotifier 
        ribbonCode={selectedRibbon?.code || ''} 
        packageCode={selectedPackage?.code || ''} 
      />
      
      <Disclaimer />
    </div>
  );
};

export default Visualizer;
