
import { useCallback } from 'react';
import { FlavorSelection, ProductType } from './orderForm/types';

interface UseProductResetProps {
  productType: ProductType;
  flavorSelections: FlavorSelection[];
  boloGeladoSelections: FlavorSelection[];
  ribbonColors: { id: string }[];
  packageColors: { id: string }[];
  additionalSelections: { id: string; selected: boolean }[];
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleFlavorQuantityChange: (id: string, value: string) => void;
  handleRemoveBoloGeladoFlavor: (id: string) => void;
  handleBoloGeladoFlavorChange: (id: string, flavorId: string) => void;
  handleBoloGeladoQuantityChange: (id: string, value: string) => void;
  handleAdditionalChange: (id: string, selected: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleAddFlavor: () => void;
  handleAddBoloGeladoFlavor: () => void;
}

export function useProductReset({
  productType,
  flavorSelections,
  boloGeladoSelections,
  ribbonColors,
  packageColors,
  additionalSelections,
  handleRemoveFlavor,
  handleFlavorChange,
  handleFlavorQuantityChange,
  handleRemoveBoloGeladoFlavor,
  handleBoloGeladoFlavorChange,
  handleBoloGeladoQuantityChange,
  handleAdditionalChange,
  handleSelectChange,
  handleAddFlavor,
  handleAddBoloGeladoFlavor,
}: UseProductResetProps) {
  
  // Reset only product details fields
  const resetProducts = useCallback(() => {
    // Reset flavor selections but not personal info
    if (productType === 'bem-casado') {
      if (flavorSelections.length > 1) {
        // Keep the first one and remove the rest
        for (let i = flavorSelections.length - 1; i > 0; i--) {
          handleRemoveFlavor(flavorSelections[i].id);
        }
        // Reset the first one
        handleFlavorChange(flavorSelections[0].id, '');
        handleFlavorQuantityChange(flavorSelections[0].id, '');
      } else if (flavorSelections.length === 1) {
        // Reset the only one
        handleFlavorChange(flavorSelections[0].id, '');
        handleFlavorQuantityChange(flavorSelections[0].id, '');
      } else {
        // Add one if there's none
        handleAddFlavor();
      }
      
      // Force reset ribbon color to the first option
      if (ribbonColors.length > 0) {
        setTimeout(() => {
          handleSelectChange('ribbonId', ribbonColors[0].id);
        }, 0);
      }
      
      // Force reset package color to the first option
      if (packageColors.length > 0) {
        setTimeout(() => {
          handleSelectChange('packageId', packageColors[0].id);
        }, 0);
      }
      
      // Reset additionals
      additionalSelections.forEach(additional => {
        if (additional.selected) {
          handleAdditionalChange(additional.id, false);
        }
      });
    } else {
      // For bolo gelado
      if (boloGeladoSelections.length > 1) {
        // Keep the first one and remove the rest
        for (let i = boloGeladoSelections.length - 1; i > 0; i--) {
          handleRemoveBoloGeladoFlavor(boloGeladoSelections[i].id);
        }
        // Reset the first one
        handleBoloGeladoFlavorChange(boloGeladoSelections[0].id, '');
        handleBoloGeladoQuantityChange(boloGeladoSelections[0].id, '');
      } else if (boloGeladoSelections.length === 1) {
        // Reset the only one
        handleBoloGeladoFlavorChange(boloGeladoSelections[0].id, '');
        handleBoloGeladoQuantityChange(boloGeladoSelections[0].id, '');
      } else {
        // Add one if there's none
        handleAddBoloGeladoFlavor();
      }
    }
  }, [
    productType,
    flavorSelections,
    boloGeladoSelections,
    ribbonColors,
    packageColors,
    additionalSelections,
    handleRemoveFlavor,
    handleFlavorChange,
    handleFlavorQuantityChange,
    handleRemoveBoloGeladoFlavor,
    handleBoloGeladoFlavorChange,
    handleBoloGeladoQuantityChange,
    handleAdditionalChange,
    handleSelectChange,
    handleAddFlavor,
    handleAddBoloGeladoFlavor,
  ]);

  return { resetProducts };
}
