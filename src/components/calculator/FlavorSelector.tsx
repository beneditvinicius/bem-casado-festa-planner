
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle, Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from '@/utils/formatter.tsx';
import { FlavorSelectorProps } from './types';

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
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onDecrement(selection.id)} 
              className="rounded-r-none h-12 w-12" 
              disabled={selection.quantity <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input 
              id={`quantity-${selection.id}`} 
              type="number" 
              min="20" 
              value={selection.quantity || ""} 
              placeholder="Mínimo 20" 
              onChange={e => onQuantityChange(selection.id, e.target.value)} 
              className="text-sm sm:text-base h-12 text-center rounded-none border-x-0" 
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onIncrement(selection.id)} 
              className="rounded-l-none h-12 w-12"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
