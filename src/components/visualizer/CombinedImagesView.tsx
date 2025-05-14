
import React from 'react';

interface CombinedImagesViewProps {
  packageImagePath: string;
  ribbonImagePath: string;
  packageName?: string;
  ribbonName?: string;
}

const CombinedImagesView: React.FC<CombinedImagesViewProps> = ({
  packageImagePath,
  ribbonImagePath,
  packageName,
  ribbonName
}) => {
  return (
    <div className="relative w-full h-full">
      <img 
        src={packageImagePath} 
        alt={`Embalagem ${packageName}`} 
        className="w-full h-full object-contain absolute top-0 left-0 z-0"
      />
      <img 
        src={ribbonImagePath} 
        alt={`Fita ${ribbonName}`} 
        className="w-full h-full object-contain absolute top-0 left-0 z-10"
      />
    </div>
  );
};

export default CombinedImagesView;
