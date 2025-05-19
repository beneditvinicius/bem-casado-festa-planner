
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Flavor, BoloGeladoFlavor, Additional } from '@/data/types';

export interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number | null;
  productType: ProductType;
}

export interface AdditionalSelection {
  id: string;
  selected: boolean;
}

export type ProductType = 'bem-casado' | 'bolo-gelado';

export const useCalculator = (
  flavors: Flavor[], 
  boloGeladoFlavors: BoloGeladoFlavor[], 
  additionals: Additional[]
) => {
  const { toast } = useToast();
  
  // Initial flavor selection
  const initialSelection = {
    id: uuidv4(),
    flavorId: flavors.length > 0 ? flavors[0].id : '',
    quantity: null,
    productType: 'bem-casado' as ProductType
  };
  
  // Initialize additionals selections
  const initialAdditionalSelections = additionals.map(additional => ({
    id: additional.id,
    selected: false
  }));
  
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([initialSelection]);
  const [additionalSelections, setAdditionalSelections] = useState<AdditionalSelection[]>(initialAdditionalSelections);
  const [total, setTotal] = useState(0);
  const [showMinimumWarning, setShowMinimumWarning] = useState(false);
  
  // Function to get the total quantity
  const getTotalQuantity = (): number => {
    return flavorSelections.reduce((acc, selection) => acc + (selection.quantity || 0), 0);
  };
  
  // Function to validate minimum quantity
  const validateMinimumQuantity = (): boolean => {
    const totalQuantity = getTotalQuantity();
    const isValid = totalQuantity >= 20 || totalQuantity === 0;
    
    if (!isValid && totalQuantity > 0) {
      setShowMinimumWarning(true);
      toast({
        title: "Quantidade mínima não atingida",
        description: "É necessário um pedido mínimo de 20 unidades.",
        variant: "destructive"
      });
      
      // Remove warning after 3 seconds
      setTimeout(() => {
        setShowMinimumWarning(false);
      }, 3000);
    }
    
    return isValid;
  };
  
  // Handle product type change for a specific selection
  const handleProductTypeChange = (id: string, value: ProductType) => {
    setFlavorSelections(prev => 
      prev.map(selection => {
        if (selection.id === id) {
          // Reset flavor selection when switching product types
          const newFlavorId = value === 'bem-casado' 
            ? (flavors.length > 0 ? flavors[0].id : '')
            : (boloGeladoFlavors.length > 0 ? boloGeladoFlavors[0].id : '');
            
          return { 
            ...selection, 
            productType: value,
            flavorId: newFlavorId
          };
        }
        return selection;
      })
    );
  };
  
  // Handle flavor change
  const handleFlavorChange = (id: string, flavorId: string) => {
    setFlavorSelections(prev => 
      prev.map(selection => 
        selection.id === id ? { ...selection, flavorId } : selection
      )
    );
  };
  
  // Handle quantity change
  const handleQuantityChange = (id: string, value: number | null) => {
    setFlavorSelections(prev => 
      prev.map(selection => 
        selection.id === id ? { ...selection, quantity: value } : selection
      )
    );
  };
  
  // Handle additional selection change
  const handleAdditionalChange = (id: string, selected: boolean) => {
    setAdditionalSelections(prev => 
      prev.map(selection => 
        selection.id === id ? { ...selection, selected } : selection
      )
    );
  };
  
  // Add new flavor selection
  const addFlavorSelection = () => {
    const newSelection: FlavorSelection = {
      id: uuidv4(),
      flavorId: flavors.length > 0 ? flavors[0].id : '',
      quantity: null,
      productType: 'bem-casado'
    };
    
    setFlavorSelections(prev => [...prev, newSelection]);
  };
  
  // Remove flavor selection
  const removeFlavorSelection = (id: string) => {
    if (flavorSelections.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa ter pelo menos um sabor selecionado.",
      });
      return;
    }
    
    setFlavorSelections(prev => prev.filter(selection => selection.id !== id));
  };
  
  // Reset calculator
  const handleReset = () => {
    setFlavorSelections([{
      ...initialSelection,
      id: uuidv4()
    }]);
    setAdditionalSelections(initialAdditionalSelections);
    setTotal(0);
    setShowMinimumWarning(false);
  };
  
  // Calculate total whenever selections change
  useEffect(() => {
    let newTotal = 0;
    
    flavorSelections.forEach(selection => {
      if (!selection.flavorId || !selection.quantity) return;
      
      // Only count valid quantities (>= 20)
      if (selection.quantity < 20) return;
      
      if (selection.productType === 'bem-casado') {
        const flavor = flavors.find(f => f.id === selection.flavorId);
        if (!flavor) return;
        
        // Calculate additionals price per unit
        const additionalsPricePerUnit = additionalSelections
          .filter(a => a.selected)
          .reduce((sum, a) => {
            const additional = additionals.find(add => add.id === a.id);
            return sum + (additional ? additional.price : 0);
          }, 0);
        
        newTotal += (flavor.price + additionalsPricePerUnit) * selection.quantity;
      } else {
        // Handle bolo gelado pricing
        const boloFlavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
        if (!boloFlavor) return;
        
        newTotal += boloFlavor.price * selection.quantity;
      }
    });
    
    setTotal(newTotal);
  }, [flavorSelections, additionalSelections, flavors, boloGeladoFlavors, additionals]);
  
  return {
    flavorSelections,
    additionalSelections,
    total,
    showMinimumWarning,
    handleProductTypeChange,
    handleFlavorChange,
    handleQuantityChange,
    handleAdditionalChange,
    addFlavorSelection,
    removeFlavorSelection,
    handleReset,
    getTotalQuantity,
    validateMinimumQuantity
  };
};
