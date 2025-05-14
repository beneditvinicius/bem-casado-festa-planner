
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useProductsStore } from '@/data/products';
import { ImageExistenceProvider } from './ImageExistenceProvider';
import VisualizationRenderer from './VisualizationRenderer';
import CombinationToastNotifier from './CombinationToastNotifier';

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

  return (
    <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
      <ImageExistenceProvider ribbonUrl={ribbonUrl} packageUrl={packageUrl}>
        <VisualizationRenderer
          packageUrl={packageUrl}
          ribbonUrl={ribbonUrl}
          packageName={packageName}
          ribbonName={ribbonName}
          packageColor={packageColor}
          ribbonColor={ribbonColor}
          fallbackCombinationImage={fallbackCombinationImage}
        />
        <CombinationToastNotifier
          ribbonCode={ribbonCode}
          packageCode={packageCode}
          ribbonName={ribbonName}
          packageName={packageName}
        />
      </ImageExistenceProvider>
    </AspectRatio>
  );
};

export default VisualizationArea;
