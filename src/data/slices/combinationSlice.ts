
import { StateCreator } from 'zustand';
import { Combination } from '../types';
import { RootState } from '../store';

export interface CombinationSlice {
  combinations: Combination[];
  addCombination: (combination: Combination) => void;
  removeCombination: (ribbonId: string, packageId: string) => void;
}

export const createCombinationSlice: StateCreator<
  RootState,
  [],
  [],
  CombinationSlice
> = (set) => ({
  combinations: [],
  
  addCombination: (combination) => set((state) => ({ 
    combinations: [...state.combinations, combination] 
  })),
  
  removeCombination: (ribbonId, packageId) => set((state) => ({ 
    combinations: state.combinations.filter(combo => 
      !(combo.ribbonId === ribbonId && combo.packageId === packageId)
    ) 
  })),
});
