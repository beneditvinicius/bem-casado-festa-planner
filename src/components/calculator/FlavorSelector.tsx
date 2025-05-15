
import React from 'react';
import { Flavor } from '@/data/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FlavorSelection } from '@/components/calculator/types';
import { Trash2, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FlavorSelectorProps {
  flavors: Flavor[];
  selection: FlavorSelection;
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  showRemoveButton: boolean;
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavors,
  selection,
  onFlavorChange,
  onQuantityChange,
  onIncrement,
  onDecrement,
  onRemove,
  showRemoveButton
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      // Update quantity directly since the input already has the value
      // This will trigger the useEffect in the parent that calculates totals
    }
  };

  return (
    <div className="p-4 border rounded-md mb-4 bg-white">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Sabor</label>
          <Select
            value={selection.flavorId}
            onValueChange={(value) => onFlavorChange(selection.id, value)}
          >
            <SelectTrigger className="w-full">
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

        <div>
          <label className="block text-sm font-medium mb-1">Quantidade</label>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onDecrement(selection.id)}
              className="rounded-r-none h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <Input
              type="number"
              inputMode="numeric"
              min={20}
              value={selection.quantity === null ? '' : selection.quantity}
              onChange={(e) => onQuantityChange(selection.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault();
                }
              }}
              className="rounded-none border-l-0 border-r-0 min-w-[80px] text-center h-10"
            />
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onIncrement(selection.id)}
              className="rounded-l-none h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">Mínimo: 20 un.</div>
        </div>

        {showRemoveButton && (
          <div className="flex items-end md:pb-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(selection.id)}
              className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlavorSelector;
