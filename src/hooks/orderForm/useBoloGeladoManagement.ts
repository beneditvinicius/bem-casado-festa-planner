
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FlavorSelection, ProductType } from './types';
import { BoloGeladoFlavor } from '@/data/types';

interface UseBoloGeladoManagementReturn {
  boloGeladoSelections: FlavorSelection[];
  handleAddBoloGeladoFlavor: () => void;
  handleRemoveBoloGeladoFlavor: (id: string) => void;
  handleBoloGeladoFlavorChange: (id: string, flavorId: string) => void;
  handleBoloGeladoQuantityChange: (id: string, value: string) => void;
  handleBoloGeladoProductTypeChange: (id: string, type: ProductType) => void;
}

export const useBoloGeladoManagement = (initialBoloGeladoFlavors: BoloGeladoFlavor[]): UseBoloGeladoManagementReturn => {
  const { toast } = useToast();
  const [boloGeladoSelections, setBoloGeladoSelections] = useState<FlavorSelection[]>([
    { id: 'bg1', flavorId: initialBoloGeladoFlavors[0]?.id || '', quantity: null, productType: 'bolo-gelado' }
  ]);

  const handleAddBoloGeladoFlavor = () => {
    const newId = `bg${Date.now()}`;
    setBoloGeladoSelections(prev => [...prev, { 
      id: newId, 
      flavorId: initialBoloGeladoFlavors[0]?.id || '', 
      quantity: null,
      productType: 'bolo-gelado'
    }]);
  };

  const handleRemoveBoloGeladoFlavor = (id: string) => {
    if (boloGeladoSelections.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa ter pelo menos um sabor selecionado.",
      });
      return;
    }
    
    setBoloGeladoSelections(prev => prev.filter(item => item.id !== id));
  };

  const handleBoloGeladoFlavorChange = (id: string, flavorId: string) => {
    setBoloGeladoSelections(prev => prev.map(item => 
      item.id === id ? { ...item, flavorId } : item
    ));
  };

  const handleBoloGeladoQuantityChange = (id: string, value: string) => {
    const quantity = value === '' ? null : parseInt(value);
    
    setBoloGeladoSelections(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleBoloGeladoProductTypeChange = (id: string, productType: ProductType) => {
    setBoloGeladoSelections(prev => prev.map(item => 
      item.id === id ? { ...item, productType } : item
    ));
  };

  return {
    boloGeladoSelections,
    handleAddBoloGeladoFlavor,
    handleRemoveBoloGeladoFlavor,
    handleBoloGeladoFlavorChange,
    handleBoloGeladoQuantityChange,
    handleBoloGeladoProductTypeChange
  };
};
