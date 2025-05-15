
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Flavor } from '@/data/products';
import { FlavorSelection as FlavorSelectionType } from '@/hooks/useOrderForm';
import { QuantityField } from '@/components/ui/quantity-field';

interface FlavorSelectionProps {
  selection: FlavorSelectionType;
  index: number;
  flavors: Flavor[];
  errors: { [key: string]: string };
  isRemovable: boolean;
  onRemove: (id: string) => void;
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: number | null) => void;
}

export const FlavorSelection: React.FC<FlavorSelectionProps> = ({
  selection,
  index,
  flavors,
  errors,
  isRemovable,
  onRemove,
  onFlavorChange,
  onQuantityChange,
}) => {
  const handleQuantityChange = (value: number | null) => {
    onQuantityChange(selection.id, value);
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Sabor {index + 1}</h4>
        {isRemovable && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(selection.id)}
            className="h-8 w-8 text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
        <div>
          <Label htmlFor={`flavor-${selection.id}`} className="text-base">Sabor</Label>
          <Select 
            value={selection.flavorId} 
            onValueChange={(value) => onFlavorChange(selection.id, value)}
          >
            <SelectTrigger id={`flavor-${selection.id}`} className={cn("h-12", errors[`flavor-${selection.id}`] && "border-red-500")}>
              <SelectValue placeholder="Selecione um sabor" />
            </SelectTrigger>
            <SelectContent>
              {flavors.map((flavor) => (
                <SelectItem key={flavor.id} value={flavor.id}>
                  {flavor.name} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(flavor.price)}/un
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors[`flavor-${selection.id}`] && <p className="text-red-500 text-sm mt-1">{errors[`flavor-${selection.id}`]}</p>}
        </div>
        
        <div>
          <Label htmlFor={`quantity-${selection.id}`} className="text-base">Quantidade</Label>
          <QuantityField
            id={`quantity-${selection.id}`}
            value={selection.quantity || null}
            onChange={handleQuantityChange}
            hasButtons={true}
            className="h-12"
            error={errors[`quantity-${selection.id}`]}
            showMinimumMessage={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
              }
            }}
          />
          {errors[`quantity-${selection.id}`] && <p className="text-red-500 text-sm mt-1">{errors[`quantity-${selection.id}`]}</p>}
        </div>
      </div>
    </div>
  );
};
