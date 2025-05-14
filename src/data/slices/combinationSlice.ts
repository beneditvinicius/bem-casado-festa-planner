
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
  combinations: [
    {
      ribbonId: '6', // Laranja (Orange)
      packageId: '25', // Branco
      imageUrl: '/lovable-uploads/0e9b394e-8160-4bca-849e-48cbe7bd5e18.png',
    },
    {
      ribbonId: '1', // Champagne (Ivory)
      packageId: '25', // Branco
      imageUrl: '/lovable-uploads/3bf7df98-0a65-4db4-8861-56d7a1669089.png',
    },
    {
      ribbonId: '2', // Bege (Taupe)
      packageId: '25', // Branco
      imageUrl: '/lovable-uploads/11f3627e-7d17-432e-b38a-973b16385184.png',
    },
    {
      ribbonId: '6', // Laranja (Orange)
      packageId: '6', // Laranja
      imageUrl: '/lovable-uploads/ce06abcb-69f9-486a-9af9-263012cd5fa4.png',
    },
    {
      ribbonId: '1', // Champagne (Ivory)
      packageId: '1', // Champagne
      imageUrl: '/lovable-uploads/7a259beb-1026-4158-9e75-f80d94c9079f.png',
    },
    {
      ribbonId: '2', // Bege (Taupe)
      packageId: '2', // Bege
      imageUrl: '/lovable-uploads/961f8175-9953-422e-8261-65b0f6dbbe1a.png',
    },
  ],
  
  addCombination: (combination) => set((state) => ({ 
    combinations: [...state.combinations, combination] 
  })),
  
  removeCombination: (ribbonId, packageId) => set((state) => ({ 
    combinations: state.combinations.filter(combo => 
      !(combo.ribbonId === ribbonId && combo.packageId === packageId)
    ) 
  })),
});
