
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Flavor, BoloGeladoFlavor, Additional } from '@/data/types';

export interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number | null;
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
  
  // Product Type Selection
  const [productType, setProductType] = useState<ProductType>('bem-casado');
  
  // Initial flavor selection
  const initialSelection = {
    id: uuidv4(),
    flavorId: flavors.length > 0 ? flavors[0].id : '',
    quantity: null
  };
  
  const initialBoloGeladoSelection = {
    id: uuidv4(),
    flavorId: boloGeladoFlavors.length > 0 ? boloGeladoFlavors[0].id : '',
    quantity: null
  };
  
  // Initialize additionals selections
  const initialAdditionalSelections = additionals.map(additional => ({
    id: additional.id,
    selected: false
  }));
  
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([initialSelection]);
  const [boloGeladoSelections, setBoloGeladoSelections] = useState<FlavorSelection[]>([initialBoloGeladoSelection]);
  const [additionalSelections, setAdditionalSelections] = useState<AdditionalSelection[]>(initialAdditionalSelections);
  const [total, setTotal] = useState(0);
  const [showMinimumWarning, setShowMinimumWarning] = useState(false);
  
  // Function to get the total quantity
  const getTotalQuantity = (): number => {
    if (productType === 'bem-casado') {
      return flavorSelections.reduce((acc, selection) => acc + (selection.quantity || 0), 0);
    } else {
      return boloGeladoSelections.reduce((acc, selection) => acc + (selection.quantity || 0), 0);
    }
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
  
  // Handle product type change
  const handleProductTypeChange = (value: ProductType) => {
    setProductType(value);
  };
  
  // Handle flavor change
  const handleFlavorChange = (id: string, flavorId: string) => {
    if (productType === 'bem-casado') {
      setFlavorSelections(prev => 
        prev.map(selection => 
          selection.id === id ? { ...selection, flavorId } : selection
        )
      );
    } else {
      setBoloGeladoSelections(prev => 
        prev.map(selection => 
          selection.id === id ? { ...selection, flavorId } : selection
        )
      );
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (id: string, value: number | null) => {
    if (productType === 'bem-casado') {
      setFlavorSelections(prev => 
        prev.map(selection => 
          selection.id === id ? { ...selection, quantity: value } : selection
        )
      );
    } else {
      setBoloGeladoSelections(prev => 
        prev.map(selection => 
          selection.id === id ? { ...selection, quantity: value } : selection
        )
      );
    }
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
    if (productType === 'bem-casado') {
      const newSelection: FlavorSelection = {
        id: uuidv4(),
        flavorId: flavors.length > 0 ? flavors[0].id : '',
        quantity: null
      };
      
      setFlavorSelections(prev => [...prev, newSelection]);
    } else {
      const newSelection: FlavorSelection = {
        id: uuidv4(),
        flavorId: boloGeladoFlavors.length > 0 ? boloGeladoFlavors[0].id : '',
        quantity: null
      };
      
      setBoloGeladoSelections(prev => [...prev, newSelection]);
    }
  };
  
  // Remove flavor selection
  const removeFlavorSelection = (id: string) => {
    if (productType === 'bem-casado') {
      setFlavorSelections(prev => prev.filter(selection => selection.id !== id));
    } else {
      setBoloGeladoSelections(prev => prev.filter(selection => selection.id !== id));
    }
  };
  
  // Reset calculator
  const handleReset = () => {
    setFlavorSelections([initialSelection]);
    setBoloGeladoSelections([initialBoloGeladoSelection]);
    setAdditionalSelections(initialAdditionalSelections);
    setTotal(0);
    setShowMinimumWarning(false);
  };
  
  // Calculate total whenever selections change
  useEffect(() => {
    let newTotal = 0;
    
    if (productType === 'bem-casado') {
      // Calculate flavors subtotal
      newTotal = flavorSelections.reduce((acc, selection) => {
        if (!selection.flavorId || !selection.quantity) return acc;
        
        // Only count valid quantities (>= 20)
        if (selection.quantity < 20) return acc;
        
        const flavor = flavors.find(f => f.id === selection.flavorId);
        if (!flavor) return acc;
        
        // Calculate additionals price per unit
        const additionalsPricePerUnit = additionalSelections
          .filter(a => a.selected)
          .reduce((sum, a) => {
            const additional = additionals.find(add => add.id === a.id);
            return sum + (additional ? additional.price : 0);
          }, 0);
        
        return acc + (flavor.price + additionalsPricePerUnit) * selection.quantity;
      }, 0);
    } else {
      // Calculate bolo gelado subtotal
      newTotal = boloGeladoSelections.reduce((acc, selection) => {
        if (!selection.flavorId || !selection.quantity) return acc;
        
        // Only count valid quantities (>= 20)
        if (selection.quantity < 20) return acc;
        
        const flavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
        if (!flavor) return acc;
        
        return acc + flavor.price * selection.quantity;
      }, 0);
    }
    
    setTotal(newTotal);
  }, [flavorSelections, boloGeladoSelections, additionalSelections, productType, flavors, boloGeladoFlavors, additionals]);
  
  return {
    productType,
    flavorSelections,
    boloGeladoSelections,
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
