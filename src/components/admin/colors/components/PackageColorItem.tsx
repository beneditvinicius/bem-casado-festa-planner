
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { PackageColor } from '@/data/types';
import { Badge } from "@/components/ui/badge";

interface PackageColorItemProps {
  color: PackageColor;
  onEdit: () => void;
  onRemove: () => void;
}

const PackageColorItem: React.FC<PackageColorItemProps> = ({ color, onEdit, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl border mb-2">
      <div className="flex items-center space-x-3">
        <div 
          className="w-6 h-6 rounded-full" 
          style={{ 
            backgroundColor: color.color,
            border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none'
          }}
        />
        <div>
          <span className="font-medium">{color.name}</span>
          {color.isNew && <Badge className="ml-2 bg-[#eb6824]">Novidade</Badge>}
        </div>
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
          onClick={onRemove}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
      </div>
    </div>
  );
};

export default PackageColorItem;
