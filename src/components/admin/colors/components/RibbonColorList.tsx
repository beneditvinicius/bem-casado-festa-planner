
import React from 'react';
import { RibbonColor } from '@/data/types';
import RibbonColorItem from './RibbonColorItem';

interface RibbonColorListProps {
  colors: RibbonColor[];
  onEditColor: (id: string) => void;
  onRemoveColor: (id: string) => void;
}

const RibbonColorList: React.FC<RibbonColorListProps> = ({
  colors,
  onEditColor,
  onRemoveColor
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colors.map((color) => (
        <RibbonColorItem 
          key={color.id} 
          color={color} 
          onEdit={() => onEditColor(color.id)} 
          onRemove={() => onRemoveColor(color.id)} 
        />
      ))}
    </div>
  );
};

export default RibbonColorList;
