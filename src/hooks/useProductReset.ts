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
  setFormData: React.Dispatch<React.SetStateAction<any>>;
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
  setFormData,
}: UseProductResetProps) {
  
  // Reset only product details fields
  const resetProducts = useCallback(() => {
    console.log("Starting product reset...");
    console.log("Available ribbon colors:", ribbonColors);
    console.log("Available package colors:", packageColors);
    
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
    
    // Reset colors directly in the form data to ensure they reset
    setFormData((prev: any) => ({
      ...prev,
      ribbonId: ribbonColors.length > 0 ? ribbonColors[0].id : '',
      packageId: packageColors.length > 0 ? packageColors[0].id : '',
    }));
    
    console.log("Colors reset directly in formData");
    console.log("Product reset completed");
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
    setFormData,
  ]);

  return { resetProducts };
}
