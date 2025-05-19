
import { useState } from 'react';
import { AdditionalSelection } from './types';
import { Additional } from '@/data/types';

export const useAdditionalSelectionManagement = (additionals: Additional[]) => {
  // Initialize additionals selections
  const initialAdditionalSelections = additionals.map(additional => ({
    id: additional.id,
    selected: false
  }));

  const [additionalSelections, setAdditionalSelections] = useState<AdditionalSelection[]>(
    initialAdditionalSelections
  );

  const handleAdditionalChange = (id: string, selected: boolean) => {
    setAdditionalSelections(prev => 
      prev.map(selection => 
        selection.id === id ? { ...selection, selected } : selection
      )
    );
  };

  return {
    additionalSelections,
    handleAdditionalChange
  };
};
