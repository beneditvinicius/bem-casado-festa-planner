
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuantityField } from "@/components/ui/quantity-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Flavor } from '@/data/products';

interface FlavorSelectorProps {
  flavors: Flavor[];
  flavorId: string;
  quantity: number | null;
  showDeleteButton: boolean;
  onFlavorChange: (flavorId: string) => void;
  onQuantityChange: (quantity: number | null) => void;
  onDelete: () => void;
  showMinimumMessage?: boolean;
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavors,
  flavorId,
  quantity,
  showDeleteButton,
  onFlavorChange,
  onQuantityChange,
  onDelete,
  showMinimumMessage = false,
}) => {
  const selectedFlavor = flavors.find(f => f.id === flavorId);
  
  return (
    <Card className="w-full mb-4 rounded-3xl relative">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-2/3">
            <Label htmlFor={`flavor-${flavorId}`} className="text-center block">Sabor</Label>
            <Select 
              value={flavorId} 
              onValueChange={onFlavorChange}
            >
              <SelectTrigger id={`flavor-${flavorId}`} className="rounded-full text-center">
                <SelectValue placeholder="Selecione um sabor" />
              </SelectTrigger>
              <SelectContent>
                {flavors.map((flavor) => (
                  <SelectItem key={flavor.id} value={flavor.id}>
                    {flavor.name} - R$ {flavor.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-1/3">
            <Label htmlFor={`quantity-${flavorId}`} className="text-center block">Quantidade</Label>
            <QuantityField
              id={`quantity-${flavorId}`}
              value={quantity}
              onChange={onQuantityChange}
              min={0}
              hasButtons={true}
              showMinimumMessage={showMinimumMessage}
            />
          </div>
        </div>
        
        {selectedFlavor && quantity && (
          <div className="mt-3 text-center">
            <span className="text-sm">
              Subtotal: R$ {(selectedFlavor.price * quantity).toFixed(2)}
            </span>
          </div>
        )}
        
        {showDeleteButton && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-0 right-0 rounded-full p-2 h-auto" 
            onClick={onDelete}
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
