
import { Flavor, BoloGeladoFlavor, Additional } from '@/data/types';
import { FlavorSelection, AdditionalSelection, ProductType } from './types';

export const useTotalCalculator = () => {
  // Calculate total price based on product type and selections
  const calculateTotal = (
    productType: ProductType,
    flavorSelections: FlavorSelection[],
    boloGeladoSelections: FlavorSelection[],
    additionalSelections: AdditionalSelection[],
    flavors: Flavor[],
    boloGeladoFlavors: BoloGeladoFlavor[],
    additionals: Additional[]
  ): string => {
    let total = 0;
    
    // Calculate bem-casado price
    flavorSelections.forEach(selection => {
      const flavor = flavors.find(f => f.id === selection.flavorId);
      if (flavor && selection.quantity >= 20) {
        // Add base price
        let unitPrice = flavor.price;
        
        // Add additionals price
        additionalSelections.forEach(addSelection => {
          if (addSelection.selected) {
            const additional = additionals.find(a => a.id === addSelection.id);
            if (additional) {
              unitPrice += additional.price;
            }
          }
        });
        
        total += unitPrice * selection.quantity;
      }
    });

    // Calculate bolo gelado price
    boloGeladoSelections.forEach(selection => {
      const flavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
      if (flavor && selection.quantity >= 20) {
        total += flavor.price * selection.quantity;
      }
    });
    
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  };

  return { calculateTotal };
};
