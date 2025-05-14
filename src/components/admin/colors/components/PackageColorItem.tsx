
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Image } from "lucide-react";
import { PackageColor } from '@/data/types';

interface PackageColorItemProps {
  color: PackageColor;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

const PackageColorItem: React.FC<PackageColorItemProps> = ({
  color,
  onEdit,
  onRemove
}) => {
  return (
    <div className="border rounded-lg p-4 relative">
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        onClick={() => onRemove(color.id)}
      >
        <Trash2 size={16} />
      </button>
      <div className="flex items-center gap-3">
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${color.imageUrl ? 'bg-gray-100' : ''}`}
          style={{ 
            backgroundColor: !color.imageUrl ? color.color : undefined,
            border: (color.color === '#FFFFFF' || color.imageUrl) ? '1px solid #E2E8F0' : 'none' 
          }} 
        >
          {color.imageUrl && (
            <div className="w-full h-full overflow-hidden rounded-full">
              <img 
                src={color.imageUrl} 
                alt={color.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div>
          <p className="font-medium">{color.name}</p>
          <p className="text-sm text-gray-500">Código: {color.code}</p>
          {color.imageUrl && (
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <Image size={12} />
              Imagem definida
            </p>
          )}
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2 w-full"
        onClick={() => onEdit(color.id)}
      >
        Editar
      </Button>
    </div>
  );
};

export default PackageColorItem;
