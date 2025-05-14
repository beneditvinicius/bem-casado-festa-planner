
import React from 'react';
import { PackageColor } from '@/data/types';
import PackageColorItem from './PackageColorItem';

interface PackageColorListProps {
  colors: PackageColor[];
  onEditColor: (id: string) => void;
  onRemoveColor: (id: string) => void;
}

const PackageColorList: React.FC<PackageColorListProps> = ({
  colors,
  onEditColor,
  onRemoveColor
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colors.map((color) => (
        <PackageColorItem 
          key={color.id} 
          color={color} 
          onEdit={onEditColor} 
          onRemove={onRemoveColor} 
        />
      ))}
    </div>
  );
};

export default PackageColorList;
