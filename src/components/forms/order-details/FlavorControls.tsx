
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FlavorSelection as FlavorSelectionType, ProductType } from '@/hooks/orderForm/types';
import { FlavorSelection } from './FlavorSelection';
import { Flavor, BoloGeladoFlavor } from '@/data/types';

interface FlavorControlsProps {
  productType: ProductType;
  flavors: Flavor[];
  boloGeladoFlavors: BoloGeladoFlavor[];
  selections: FlavorSelectionType[];
  errors: { [key: string]: string };
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleQuantityChange: (id: string, value: number | null) => void;
  handleItemProductTypeChange: (id: string, type: ProductType) => void;
}

export const FlavorControls: React.FC<FlavorControlsProps> = ({
  productType,
  flavors,
  boloGeladoFlavors,
  selections,
  errors,
  handleAddFlavor,
  handleRemoveFlavor,
  handleFlavorChange,
  handleQuantityChange,
  handleItemProductTypeChange
}) => {
  return (
    <>
      {selections.map((selection, index) => (
        <FlavorSelection 
          key={selection.id}
          selection={selection}
          index={index}
          flavors={flavors}
          boloGeladoFlavors={boloGeladoFlavors}
          errors={errors}
          isRemovable={selections.length > 1}
          onRemove={handleRemoveFlavor}
          onFlavorChange={handleFlavorChange}
          onQuantityChange={handleQuantityChange}
          onProductTypeChange={handleItemProductTypeChange}
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
