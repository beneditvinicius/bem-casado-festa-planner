
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';
import { Flavor, BoloGeladoFlavor } from '@/data/types';
import { FlavorSelection as FlavorSelectionType, ProductType } from '@/hooks/orderForm/types';
import { QuantityField } from '@/components/ui/quantity-field';

interface FlavorSelectionProps {
  selection: FlavorSelectionType;
  index: number;
  flavors: Flavor[];
  boloGeladoFlavors: BoloGeladoFlavor[];
  errors: { [key: string]: string };
  isRemovable: boolean;
  onRemove: (id: string) => void;
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: number | null) => void;
  onProductTypeChange: (id: string, type: ProductType) => void;
}

export const FlavorSelection: React.FC<FlavorSelectionProps> = ({
  selection,
  index,
  flavors,
  boloGeladoFlavors,
  errors,
  isRemovable,
  onRemove,
  onFlavorChange,
  onQuantityChange,
  onProductTypeChange,
}) => {
  const handleQuantityChange = (value: number | null) => {
    onQuantityChange(selection.id, value);
  };

  // Determine which flavor list to use based on product type
  const currentFlavors = selection.productType === 'bem-casado' ? flavors : boloGeladoFlavors;

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
      
      <div className="mb-3">
        <Label htmlFor={`product-type-${selection.id}`}>Tipo de Produto</Label>
        <RadioGroup 
          value={selection.productType} 
          onValueChange={(value) => onProductTypeChange(selection.id, value as ProductType)}
          className="flex space-x-4 mt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bem-casado" id={`bem-casado-${selection.id}`} />
            <Label htmlFor={`bem-casado-${selection.id}`}>Bem-Casado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bolo-gelado" id={`bolo-gelado-${selection.id}`} />
            <Label htmlFor={`bolo-gelado-${selection.id}`}>Bolo Gelado</Label>
          </div>
        </RadioGroup>
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
              {currentFlavors.map((flavor) => (
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
