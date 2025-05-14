
import React from 'react';

interface CombinedImagesViewProps {
  packageImageUrl: string;
  ribbonImageUrl: string;
  packageName?: string;
  ribbonName?: string;
}

const CombinedImagesView: React.FC<CombinedImagesViewProps> = ({
  packageImageUrl,
  ribbonImageUrl,
  packageName,
  ribbonName
}) => {
  return (
    <div className="relative w-full h-full">
      <img 
        src={packageImageUrl} 
        alt={`Embalagem ${packageName || ''}`} 
        className="w-full h-full object-contain absolute top-0 left-0 z-0"
      />
      <img 
        src={ribbonImageUrl} 
        alt={`Fita ${ribbonName || ''}`} 
        className="w-full h-full object-contain absolute top-0 left-0 z-10"
      />
    </div>
  );
};

export default CombinedImagesView;
