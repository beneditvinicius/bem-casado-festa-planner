
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuantityField } from "@/components/ui/quantity-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Flavor } from '@/data/types';
import { FlavorSelection } from '@/hooks/useCalculator';

interface FlavorSelectorProps {
  flavors: Flavor[];
  selection: FlavorSelection;
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: number | null) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  hideButtons?: boolean;
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavors,
  selection,
  onFlavorChange,
  onQuantityChange,
  onIncrement,
  onDecrement,
  onRemove,
  canRemove,
  hideButtons = false
}) => {
  const handleQuantityChange = (value: number | null) => {
    onQuantityChange(selection.id, value);
  };
  
  return (
    <Card className="w-full mb-4 rounded-3xl relative">
      <CardContent className="p-4">
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
                {flavors.map((flavor) => (
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
