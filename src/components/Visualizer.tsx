
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import ColorSelector from './visualizer/ColorSelector';
import VisualizationArea from './visualizer/VisualizationArea'; 
import Disclaimer from './visualizer/Disclaimer';
import DebugInfo from './visualizer/DebugInfo';
import { useIsMobile } from '@/hooks/use-mobile';
import { ImageExistenceProvider } from './visualizer/ImageExistenceProvider';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AnimatedWeddingDivider from './AnimatedWeddingDivider';

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
  
  const handleReturnToOrder = () => {
    const orderElement = document.getElementById('pedido');
    if (orderElement) {
      orderElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center mb-2">
        <Button 
          onClick={handleReturnToOrder} 
          className="bg-[#eb6824] hover:bg-[#d25618] text-white rounded-full flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Retorne para o Orçamento
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorSelector 
          id="ribbon-color"
          label="Cor da Fita" 
          options={ribbonColors} 
          value={selectedRibbonId}
          onChange={setSelectedRibbonId}
        />
        
        <ColorSelector 
          id="package-color"
          label="Cor da Embalagem"
          options={packageColors}
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
        </ImageExistenceProvider>
      </div>
      
      {/* Debug info - only shown in dev mode */}
      {process.env.NODE_ENV === 'development' && (
        <DebugInfo 
          ribbonId={selectedRibbonId}
          ribbonCode={selectedRibbon?.code}
          packageId={selectedPackageId}
          packageCode={selectedPackage?.code}
          ribbonImagePath={ribbonImagePath}
          ribbonImageExists={false}
          packageImagePath={packageImagePath}
          packageImageExists={false}
          fallbackCombinationImage={fallbackCombinationImage}
        />
      )}
      
      <Disclaimer />
    </div>
  );
};

export default Visualizer;
