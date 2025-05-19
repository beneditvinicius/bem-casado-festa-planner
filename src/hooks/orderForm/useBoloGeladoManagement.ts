
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FlavorSelection } from './types';
import { BoloGeladoFlavor } from '@/data/types';

interface UseBoloGeladoManagementReturn {
  boloGeladoSelections: FlavorSelection[];
  handleAddBoloGeladoFlavor: () => void;
  handleRemoveBoloGeladoFlavor: (id: string) => void;
  handleBoloGeladoFlavorChange: (id: string, flavorId: string) => void;
  handleBoloGeladoQuantityChange: (id: string, value: string) => void;
}

export const useBoloGeladoManagement = (
  initialFlavors: BoloGeladoFlavor[]
): UseBoloGeladoManagementReturn => {
  const [boloGeladoSelections, setBoloGeladoSelections] = useState([{
    id: uuidv4(),
    flavorId: initialFlavors[0]?.id || '',
    quantity: 0
  }]);

  const handleAddBoloGeladoFlavor = () => {
    const newSelection = {
      id: uuidv4(),
      flavorId: initialFlavors[0]?.id || '',
      quantity: 0
    };
    setBoloGeladoSelections([...boloGeladoSelections, newSelection]);
  };

  const handleRemoveBoloGeladoFlavor = (id: string) => {
    if (boloGeladoSelections.length > 1) {
      setBoloGeladoSelections(boloGeladoSelections.filter(selection => selection.id !== id));
    }
  };

  const handleBoloGeladoFlavorChange = (id: string, flavorId: string) => {
    setBoloGeladoSelections(
      boloGeladoSelections.map(selection => 
        selection.id === id ? { ...selection, flavorId } : selection
      )
    );
  };

  const handleBoloGeladoQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    setBoloGeladoSelections(
      boloGeladoSelections.map(selection => 
        selection.id === id ? { ...selection, quantity: isNaN(quantity) ? 0 : quantity } : selection
      )
    );
  };

  return {
    boloGeladoSelections,
    handleAddBoloGeladoFlavor,
    handleRemoveBoloGeladoFlavor,
    handleBoloGeladoFlavorChange,
    handleBoloGeladoQuantityChange
  };
};
