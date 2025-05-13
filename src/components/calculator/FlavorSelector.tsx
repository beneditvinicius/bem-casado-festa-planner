
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle, Trash2 } from "lucide-react";
import { formatCurrency } from '@/utils/formatter.tsx';
import { FlavorSelectorProps } from './types';
import { QuantityField } from '@/components/ui/quantity-field';

const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  selection,
  flavors,
  onFlavorChange,
  onQuantityChange,
  onIncrement,
  onDecrement,
  onRemove,
  showRemoveButton
}) => {
  const selectedFlavor = flavors.find(f => f.id === selection.flavorId);

  const handleQuantityChange = (value: number | null) => {
    onQuantityChange(selection.id, value !== null ? value.toString() : '');
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Sabor</h3>
        {showRemoveButton && (
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
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`flavor-${selection.id}`} className="text-sm sm:text-base">Escolha o Sabor</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Ajuda</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Selecione o sabor de bem-casado desejado. Cada sabor possui um valor específico por unidade.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select 
            value={selection.flavorId} 
            onValueChange={value => onFlavorChange(selection.id, value)}
          >
            <SelectTrigger id={`flavor-${selection.id}`} className="text-sm sm:text-base h-12">
              <SelectValue placeholder="Selecione um sabor" />
            </SelectTrigger>
            <SelectContent>
              {flavors.map(flavor => (
                <SelectItem key={flavor.id} value={flavor.id} className="text-sm sm:text-base">
                  {flavor.name} - {formatCurrency(flavor.price)}/unidade
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`quantity-${selection.id}`} className="text-sm sm:text-base">Quantidade Desejada</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Ajuda</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Digite a quantidade de bem-casados desejada. O pedido mínimo é de 20 unidades.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <QuantityField
            id={`quantity-${selection.id}`}
            value={selection.quantity || null}
            onChange={handleQuantityChange}
            onIncrement={() => onIncrement(selection.id)}
            onDecrement={() => onDecrement(selection.id)}
          />
          <p className="text-xs text-muted-foreground">Pedido mínimo de 20 unidades.</p>
        </div>
        
        {selectedFlavor && selection.quantity > 0 && (
          <div className="text-xs text-muted-foreground">
            {selection.quantity} unidades x {formatCurrency(selectedFlavor.price)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlavorSelector;
