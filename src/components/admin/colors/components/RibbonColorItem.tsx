
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { RibbonColor } from '@/data/products';

interface RibbonColorItemProps {
  color: RibbonColor;
  onEdit: () => void;
  onDelete: () => void;
}

const RibbonColorItem: React.FC<RibbonColorItemProps> = ({ color, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl border mb-2">
      <div className="flex items-center space-x-3">
        <div 
          className="w-6 h-6 rounded-full" 
          style={{ backgroundColor: color.hexColor }}
        />
        <span className="font-medium">{color.name}</span>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onEdit}
          className="rounded-full"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full" 
          onClick={onDelete}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </div>
    </div>
  );
};

export default RibbonColorItem;
