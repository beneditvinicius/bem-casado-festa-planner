
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FlavorSelection as FlavorSelectionType } from '@/hooks/orderForm/types';
import { FlavorSelection } from './FlavorSelection';
import { Flavor, BoloGeladoFlavor } from '@/data/types';

interface FlavorControlsProps {
  productType: 'bem-casado' | 'bolo-gelado';
  flavors: Flavor[] | BoloGeladoFlavor[];
  selections: FlavorSelectionType[];
  errors: { [key: string]: string };
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleQuantityChange: (id: string, value: number | null) => void;
}

export const FlavorControls: React.FC<FlavorControlsProps> = ({
  productType,
  flavors,
  selections,
  errors,
  handleAddFlavor,
  handleRemoveFlavor,
  handleFlavorChange,
  handleQuantityChange
}) => {
  return (
    <>
      {selections.map((selection, index) => (
        <FlavorSelection 
          key={selection.id}
          selection={selection}
          index={index}
          flavors={flavors}
          errors={errors}
          isRemovable={selections.length > 1}
          onRemove={handleRemoveFlavor}
          onFlavorChange={handleFlavorChange}
          onQuantityChange={handleQuantityChange}
        />
      ))}
      
      <Button 
        type="button"
        variant="outline" 
        onClick={handleAddFlavor}
        className="w-full flex items-center justify-center gap-2 h-10 rounded-full"
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar outro sabor
      </Button>
    </>
  );
};
