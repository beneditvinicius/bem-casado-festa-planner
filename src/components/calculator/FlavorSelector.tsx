
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuantityField } from '@/components/ui/quantity-field';
import { Flavor } from '@/data/products';
import { FlavorSelection } from '@/components/calculator/types';

interface FlavorSelectorProps {
  flavors: Flavor[];
  selection: FlavorSelection;
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavors,
  selection,
  onFlavorChange,
  onQuantityChange,
  onIncrement,
  onDecrement,
  onRemove,
  canRemove
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/2 p-4 border-b sm:border-b-0 sm:border-r border-muted">
            <label className="block mb-2 text-sm font-medium">Sabor</label>
            <Select
              value={selection.flavorId}
              onValueChange={(value) => onFlavorChange(selection.id, value)}
            >
              <SelectTrigger className="w-full h-12">
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
          </div>
          
          <div className="sm:w-1/2 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Quantidade</label>
              
              {canRemove && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-500" 
                  onClick={() => onRemove(selection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <QuantityField 
              value={selection.quantity} 
              onChange={(value) => {
                if (value !== null) {
                  onQuantityChange(selection.id, value.toString());
                } else {
                  onQuantityChange(selection.id, '');
                }
              }} 
              hasButtons={true}
              onKeyDown={(e) => handleKeyDown(e, selection.id)}
              className="w-full h-12"
            />
            <div className="text-xs text-muted-foreground mt-1 text-center">Mínimo: 20 un.</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlavorSelector;
