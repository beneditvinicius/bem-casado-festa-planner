
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useSupabaseImages } from '@/hooks/useSupabaseImages';
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
  const { ribbonUrl, packageUrl, loading } = useSupabaseImages(ribbonCode, packageCode);

  return (
    <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#eb6824] mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Carregando imagens...</p>
          </div>
        </div>
      ) : (
        <>
          <VisualizationRenderer
            packageUrl={packageUrl || ''}
            ribbonUrl={ribbonUrl || ''}
            packageName={packageName}
            ribbonName={ribbonName}
            packageColor={packageColor}
            ribbonColor={ribbonColor}
            fallbackCombinationImage={fallbackCombinationImage}
            ribbonExists={!!ribbonUrl}
            packageExists={!!packageUrl}
          />
          <CombinationToastNotifier
            ribbonCode={ribbonCode}
            packageCode={packageCode}
            ribbonName={ribbonName}
            packageName={packageName}
          />
        </>
      )}
    </AspectRatio>
  );
};

export default VisualizationArea;
