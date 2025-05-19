
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FlavorSelection, ProductType } from './types';
import { Flavor } from '@/data/types';

interface UseFlavorManagementReturn {
  flavorSelections: FlavorSelection[];
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleFlavorQuantityChange: (id: string, value: string) => void;
  handleItemProductTypeChange: (id: string, type: ProductType) => void;
  calculateTotal: (flavors: Flavor[]) => string;
}

export const useFlavorManagement = (initialFlavors: Flavor[]): UseFlavorManagementReturn => {
  const { toast } = useToast();
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([
    { id: '1', flavorId: initialFlavors[0]?.id || '', quantity: null, productType: 'bem-casado' }
  ]);

  const handleAddFlavor = () => {
    const newId = String(Date.now());
    setFlavorSelections(prev => [...prev, { 
      id: newId, 
      flavorId: initialFlavors[0]?.id || '', 
      quantity: null,
      productType: 'bem-casado'
    }]);
  };

  const handleRemoveFlavor = (id: string) => {
    if (id === 'all-except-first') {
      // Reset to just the first item
      const firstItem = flavorSelections[0];
      setFlavorSelections([{
        ...firstItem,
        quantity: null
      }]);
      return;
    }
    
    if (flavorSelections.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa ter pelo menos um sabor selecionado.",
      });
      return;
    }
    
    setFlavorSelections(prev => prev.filter(item => item.id !== id));
  };

  const handleFlavorChange = (id: string, flavorId: string) => {
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, flavorId } : item
    ));
  };

  const handleItemProductTypeChange = (id: string, productType: ProductType) => {
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, productType } : item
    ));
  };

  const handleFlavorQuantityChange = (id: string, value: string) => {
    const quantity = value === '' ? null : parseInt(value);
    
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const calculateTotal = (flavors: Flavor[]): string => {
    let total = 0;
    
    flavorSelections.forEach(selection => {
      const flavor = flavors.find(f => f.id === selection.flavorId);
      if (flavor && selection.quantity && selection.quantity > 0) {
        total += flavor.price * selection.quantity;
      }
    });
    
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
  };

  return {
    flavorSelections,
    handleAddFlavor,
    handleRemoveFlavor,
    handleFlavorChange,
    handleFlavorQuantityChange,
    handleItemProductTypeChange,
    calculateTotal
  };
};
