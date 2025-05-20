
import { useCallback } from 'react';
import { useProductsStore } from '@/data/products';

interface UseProductResetProps {
  productType: string;
  flavorSelections: { id: string; quantity: number }[];
  setFlavorSelections: (selections: { id: string; quantity: number }[]) => void;
  selectedAdditionals: Record<string, boolean>;
  setSelectedAdditionals: (additionals: Record<string, boolean>) => void;
  boloGeladoFlavor: string | null;
  setBoloGeladoFlavor: (flavor: string | null) => void;
  boloGeladoSelections?: { id: string; flavorId: string; quantity: number }[];
  handleSelectChange: (name: string, value: string) => void;
  handleAddFlavor: () => void;
  handleAddAdditional: (id: string) => void;
}

export const useProductReset = ({
  productType,
  flavorSelections,
  setFlavorSelections,
  selectedAdditionals,
  setSelectedAdditionals,
  boloGeladoFlavor,
  setBoloGeladoFlavor,
  boloGeladoSelections,
  handleSelectChange,
  handleAddFlavor,
  handleAddAdditional
}: UseProductResetProps) => {
  const flavors = useProductsStore(state => state.flavors);
  const additionals = useProductsStore(state => state.additionals);
  const ribbonColors = useProductsStore(state => state.ribbonColors);
  const packageColors = useProductsStore(state => state.packageColors);
  
  const resetProducts = useCallback(() => {
    // Reset flavor selections
    if (productType === 'bem-casado') {
      // For bem-casado, reset to zero quantities and select first flavor
      setFlavorSelections([]);
      
      if (flavors.length > 0) {
        const defaultFlavor = {
          id: flavors[0].id,
          quantity: 50
        };
        
        setFlavorSelections([defaultFlavor]);
      }
    } else if (productType === 'bolo-gelado') {
      // For bolo-gelado, simply reset to null
      setBoloGeladoFlavor(null);
    }
    
    // Reset additionals
    const resetAdditionals: Record<string, boolean> = {};
    additionals.forEach(additional => {
      resetAdditionals[additional.id] = false;
    });
    
    setSelectedAdditionals(resetAdditionals);
    
    // If bem-casado, reset the first flavor to default quantity
    if (productType === 'bem-casado' && flavors.length > 0 && flavorSelections.length === 0) {
      handleAddFlavor();
    }
    
    // Always reset ribbon color to the first option, using the first item from the ribbonColors array
    if (ribbonColors.length > 0) {
      console.log("Resetting ribbon color to:", ribbonColors[0].id);
      // Directly set the ribbon color to the first option
      handleSelectChange('ribbonId', ribbonColors[0].id);
    }
    
    // Always reset package color to the first option, using the first item from the packageColors array
    if (packageColors.length > 0) {
      console.log("Resetting package color to:", packageColors[0].id);
      // Directly set the package color to the first option
      handleSelectChange('packageId', packageColors[0].id);
    }
  }, [
    productType,
    flavors,
    additionals,
    ribbonColors,
    packageColors,
    flavorSelections.length,
    setFlavorSelections,
    setSelectedAdditionals,
    setBoloGeladoFlavor,
    handleSelectChange,
    handleAddFlavor
  ]);
  
  return { resetProducts };
};
