
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import VisualizationArea from '@/components/visualizer/VisualizationArea';
import { RibbonColor, PackageColor } from '@/data/products';

interface CombinationItemProps {
  ribbonId: string;
  packageId: string;
  imageUrl: string;
  ribbon: RibbonColor | undefined;
  pkg: PackageColor | undefined;
  onRemove: (ribbonId: string, packageId: string) => void;
}

const CombinationItem: React.FC<CombinationItemProps> = ({
  ribbonId,
  packageId,
  imageUrl,
  ribbon,
  pkg,
  onRemove
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-40 relative">
        <VisualizationArea 
          ribbonCode={ribbon?.code}
          ribbonName={ribbon?.name}
          ribbonColor={ribbon?.color}
          packageCode={pkg?.code}
          packageName={pkg?.name}
          packageColor={pkg?.color}
          fallbackCombinationImage={imageUrl}
        />
        <button 
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
          onClick={() => onRemove(ribbonId, packageId)}
        >
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>
      <div className="p-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{
                backgroundColor: ribbon?.color || '#FFFFFF',
                border: ribbon?.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none'
              }} 
            />
            <span className="text-sm">{ribbon?.name}</span>
          </div>
          <span className="text-sm text-gray-500">+</span>
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{
                backgroundColor: pkg?.color || '#FFFFFF',
                border: pkg?.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none'
              }} 
            />
            <span className="text-sm">{pkg?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinationItem;
