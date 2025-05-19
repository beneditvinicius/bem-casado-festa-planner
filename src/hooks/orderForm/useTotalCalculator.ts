
import { Flavor, BoloGeladoFlavor, Additional } from '@/data/types';
import { FlavorSelection, AdditionalSelection, ProductType } from './types';

export const useTotalCalculator = () => {
  // Calculate total price based on selections
  const calculateTotal = (
    flavorSelections: FlavorSelection[],
    additionalSelections: AdditionalSelection[],
    flavors: Flavor[],
    boloGeladoFlavors: BoloGeladoFlavor[],
    additionals: Additional[]
  ): string => {
    let total = 0;
    
    // Calculate price for all items
    flavorSelections.forEach(selection => {
      // Skip items without quantity
      if (!selection.quantity || selection.quantity < 20) {
        return;
      }

      if (selection.productType === 'bem-casado') {
        // Calculate bem-casado price
        const flavor = flavors.find(f => f.id === selection.flavorId);
        if (flavor) {
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
      } else {
        // Calculate bolo gelado price
        const flavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
        if (flavor) {
          total += flavor.price * selection.quantity;
        }
      }
    });
    
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  };

  return { calculateTotal };
};
