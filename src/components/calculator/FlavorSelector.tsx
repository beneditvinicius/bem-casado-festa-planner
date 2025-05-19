
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuantityField } from "@/components/ui/quantity-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { Flavor, BoloGeladoFlavor } from '@/data/types';
import { FlavorSelection, ProductType } from '@/hooks/useCalculator';

interface FlavorSelectorProps {
  flavors: Flavor[];
  boloGeladoFlavors: BoloGeladoFlavor[];
  selection: FlavorSelection;
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: number | null) => void;
  onProductTypeChange: (id: string, productType: ProductType) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  hideButtons?: boolean;
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavors,
  boloGeladoFlavors,
  selection,
  onFlavorChange,
  onQuantityChange,
  onProductTypeChange,
  onRemove,
  canRemove,
  hideButtons = false
}) => {
  const handleQuantityChange = (value: number | null) => {
    onQuantityChange(selection.id, value);
  };
  
  // Determine which flavor list to use based on product type
  const currentFlavors = selection.productType === 'bem-casado' ? flavors : boloGeladoFlavors;
  
  return (
    <Card className="w-full mb-4 rounded-3xl relative">
      <CardContent className="p-4">
        <div className="mb-4">
          <Label className="text-center block mb-2">Tipo de Produto</Label>
          <RadioGroup 
            value={selection.productType}
            onValueChange={(value) => onProductTypeChange(selection.id, value as ProductType)}
            className="flex justify-center gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bem-casado" id={`bem-casado-${selection.id}`} />
              <Label htmlFor={`bem-casado-${selection.id}`} className="font-medium">Bem-Casado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bolo-gelado" id={`bolo-gelado-${selection.id}`} />
              <Label htmlFor={`bolo-gelado-${selection.id}`} className="font-medium">Bolo Gelado</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-2/3">
            <Label htmlFor={`flavor-${selection.id}`} className="text-center block">Sabor</Label>
            <Select 
              value={selection.flavorId} 
              onValueChange={(value) => onFlavorChange(selection.id, value)}
            >
              <SelectTrigger id={`flavor-${selection.id}`} className="rounded-full text-center">
                <SelectValue placeholder="Selecione um sabor" />
              </SelectTrigger>
              <SelectContent>
                {currentFlavors.map((flavor) => (
                  <SelectItem key={flavor.id} value={flavor.id}>
                    {flavor.name} - R$ {flavor.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-1/3">
            <Label htmlFor={`quantity-${selection.id}`} className="text-center block">Quantidade</Label>
            <QuantityField
              id={`quantity-${selection.id}`}
              value={selection.quantity}
              onChange={handleQuantityChange}
              min={1}
              hasButtons={true}
              showMinimumMessage={true}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const qty = selection.quantity ?? 0;
                  if (qty > 0 && qty < 20) {
                    // Clear input and trigger buzz animation
                    handleQuantityChange(null);
                    if (navigator.vibrate) navigator.vibrate(200);
                  }
                }
              }}
            />
          </div>
        </div>
        
        {canRemove && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-0 right-0 rounded-full p-2 h-auto" 
            onClick={() => onRemove(selection.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remover</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FlavorSelector;
