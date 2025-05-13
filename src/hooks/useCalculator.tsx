
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
      
      if (newQuantity < 20 && newQuantity > 0) {
        toast({
          title: "Quantidade mínima",
          description: "O pedido mínimo é de 20 unidades."
        });
        return {
          ...item,
          quantity: null
        };
      }
      
      return {
        ...item,
        quantity: newQuantity <= 0 ? null : newQuantity
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
    toast({
      title: "Calculadora reiniciada",
      description: "Os valores foram redefinidos."
    });
  };
  
  const getTotalQuantity = () => {
    return flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
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
