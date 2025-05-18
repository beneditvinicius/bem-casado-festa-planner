
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Flavor } from '@/data/types';

export interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number | null;
}

export const useCalculator = (flavors: Flavor[]) => {
  const { toast } = useToast();
  
  // Initial flavor selection
  const initialSelection = {
    id: uuidv4(),
    flavorId: flavors.length > 0 ? flavors[0].id : '',
    quantity: null
  };
  
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([initialSelection]);
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
  
  // Add new flavor selection
  const addFlavorSelection = () => {
    const newSelection: FlavorSelection = {
      id: uuidv4(),
      flavorId: flavors.length > 0 ? flavors[0].id : '',
      quantity: null
    };
    
    setFlavorSelections(prev => [...prev, newSelection]);
  };
  
  // Remove flavor selection
  const removeFlavorSelection = (id: string) => {
    setFlavorSelections(prev => prev.filter(selection => selection.id !== id));
  };
  
  // Reset calculator
  const handleReset = () => {
    setFlavorSelections([initialSelection]);
    setTotal(0);
    setShowMinimumWarning(false);
  };
  
  // Calculate total whenever selections change
  useEffect(() => {
    const newTotal = flavorSelections.reduce((acc, selection) => {
      if (!selection.flavorId || !selection.quantity) return acc;
      
      // Only count valid quantities (>= 20)
      if (selection.quantity < 20) return acc;
      
      const flavor = flavors.find(f => f.id === selection.flavorId);
      if (!flavor) return acc;
      
      return acc + flavor.price * selection.quantity;
    }, 0);
    
    setTotal(newTotal);
  }, [flavorSelections, flavors]);
  
  return {
    flavorSelections,
    total,
    showMinimumWarning,
    handleFlavorChange,
    handleQuantityChange,
    addFlavorSelection,
    removeFlavorSelection,
    handleReset,
    getTotalQuantity,
    validateMinimumQuantity
  };
};
