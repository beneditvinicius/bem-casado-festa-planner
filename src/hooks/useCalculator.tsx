
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Flavor } from '@/data/products';
import { FlavorSelection } from '@/components/calculator/types';

export const useCalculator = (flavors: Flavor[]) => {
  const { toast } = useToast();
  
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([{
    id: '1',
    flavorId: flavors[0]?.id || '',
    quantity: null
  }]);
  
  const [total, setTotal] = useState<number>(0);
  
  useEffect(() => {
    calculateTotal();
  }, [flavorSelections]);
  
  const calculateTotal = () => {
    let sum = 0;
    flavorSelections.forEach(selection => {
      const flavor = flavors.find(f => f.id === selection.flavorId);
      if (flavor && selection.quantity && selection.quantity > 0) {
        sum += flavor.price * selection.quantity;
      }
    });
    
    // Check if total quantity is less than 20
    const totalQuantity = getTotalQuantity();
    if (totalQuantity > 0 && totalQuantity < 20) {
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades."
      });
      // Don't update the total if minimum not met
      return;
    }
    
    setTotal(sum);
  };
  
  const handleFlavorChange = (id: string, flavorId: string) => {
    setFlavorSelections(prev => prev.map(item => item.id === id ? {
      ...item,
      flavorId
    } : item));
  };
  
  const handleQuantityChange = (id: string, value: string) => {
    const quantity = value === '' ? null : parseInt(value);
    
    setFlavorSelections(prev => prev.map(item => item.id === id ? {
      ...item,
      quantity
    } : item));
    
    // Check minimum after updating
    const totalAfterUpdate = getTotalQuantity(id, quantity);
    if (totalAfterUpdate > 0 && totalAfterUpdate < 20) {
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades."
      });
    }
  };
  
  const incrementQuantity = (id: string) => {
    setFlavorSelections(prev => prev.map(item => item.id === id ? {
      ...item,
      quantity: (item.quantity || 0) + 1
    } : item));
  };
  
  const decrementQuantity = (id: string) => {
    setFlavorSelections(prev => prev.map(item => {
      if (item.id !== id) return item;
      
      const newQuantity = (item.quantity || 0) - 1;
      
      if (newQuantity <= 0) {
        return {
          ...item,
          quantity: null
        };
      }
      
      return {
        ...item,
        quantity: newQuantity
      };
    }));
  };
  
  const addFlavorSelection = () => {
    const newId = String(Date.now());
    setFlavorSelections(prev => [...prev, {
      id: newId,
      flavorId: flavors[0]?.id || '',
      quantity: null
    }]);
  };
  
  const removeFlavorSelection = (id: string) => {
    if (flavorSelections.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa ter pelo menos um sabor selecionado."
      });
      return;
    }
    setFlavorSelections(prev => prev.filter(item => item.id !== id));
  };
  
  const handleReset = () => {
    setFlavorSelections([{
      id: '1',
      flavorId: flavors[0]?.id || '',
      quantity: null
    }]);
    setTotal(0);
    toast({
      title: "Calculadora reiniciada",
      description: "Os valores foram redefinidos."
    });
  };
  
  const getTotalQuantity = (updatedId?: string, updatedQuantity?: number | null) => {
    return flavorSelections.reduce((sum, item) => {
      if (updatedId && item.id === updatedId) {
        return sum + (updatedQuantity || 0);
      }
      return sum + (item.quantity || 0);
    }, 0);
  };

  return {
    flavorSelections,
    total,
    handleFlavorChange,
    handleQuantityChange,
    incrementQuantity,
    decrementQuantity,
    addFlavorSelection,
    removeFlavorSelection,
    handleReset,
    getTotalQuantity
  };
};
