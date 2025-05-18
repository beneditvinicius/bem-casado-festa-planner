
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import ColorSelector from './visualizer/ColorSelector';
import VisualizationArea from './visualizer/VisualizationArea'; 
import Disclaimer from './visualizer/Disclaimer';
import { useIsMobile } from '@/hooks/use-mobile';
import CombinationToastNotifier from './visualizer/CombinationToastNotifier';
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
  
  // Updated format labels function
  const getFormattedLabel = (name: string, code: string) => `${name} (${code})`;
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorSelector 
          id="ribbon-color"
          label="Cor da Fita" 
          options={ribbonColors.map(color => ({
            ...color,
            name: getFormattedLabel(color.name, color.code)
          }))}
          value={selectedRibbonId}
          onChange={setSelectedRibbonId}
        />
        
        <ColorSelector 
          id="package-color"
          label="Cor da Embalagem"
          options={packageColors.map(color => ({
            ...color,
            name: getFormattedLabel(color.name, color.code)
          }))}
          value={selectedPackageId}
          onChange={setSelectedPackageId}
        />
      </div>

      {/* Visualization Area */}
      <div className="mt-6">
        <ImageExistenceProvider 
          ribbonUrl={ribbonImagePath} 
          packageUrl={packageImagePath}
        >
          <VisualizationArea 
            ribbonCode={selectedRibbon?.code || ''}
            ribbonName={selectedRibbon?.name || ''}
            ribbonColor={selectedRibbon?.color || ''}
            packageCode={selectedPackage?.code || ''}
            packageName={selectedPackage?.name || ''}
            packageColor={selectedPackage?.color || ''}
            fallbackCombinationImage={fallbackCombinationImage}
          />
          <CombinationToastNotifier
            ribbonCode={selectedRibbon?.code || ''}
            packageCode={selectedPackage?.code || ''}
            ribbonName={getFormattedLabel(selectedRibbon?.name || '', selectedRibbon?.code || '')}
            packageName={getFormattedLabel(selectedPackage?.name || '', selectedPackage?.code || '')}
          />
        </ImageExistenceProvider>
      </div>
      
      <Disclaimer />
    </div>
  );
};

export default Visualizer;
