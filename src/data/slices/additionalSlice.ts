
import { StateCreator } from 'zustand';
import { Additional } from '../types';
import { RootState } from '../store';

export interface AdditionalSlice {
  additionals: Additional[];
  addAdditional: (additional: Additional) => void;
  removeAdditional: (id: string) => void;
  updateAdditional: (id: string, updatedAdditional: Partial<Additional>) => void;
}

export const createAdditionalSlice: StateCreator<
  RootState,
  [],
  [],
  AdditionalSlice
> = (set) => ({
  additionals: [
    { id: 'a1', name: 'Medalha de Santo Anjo com Cartão e Oração', price: 1.55 },
    { id: 'a2', name: 'Laço Maxi em Fita de Cetim nº 5', price: 0.25 },
    { id: 'a3', name: 'Mini Terço', price: 2.55 },
    { id: 'a4', name: 'Renda e Mini Terço', price: 2.75 },
    { id: 'a5', name: 'Medalha e Nossa Senhora', price: 3.00 },
    { id: 'a6', name: 'Embalagem em Algodão Cru e Sisal', price: 0.25 },
  ],
  
  addAdditional: (additional) => set((state) => ({ 
    additionals: [...state.additionals, additional] 
  })),
  
  removeAdditional: (id) => set((state) => ({ 
    additionals: state.additionals.filter(additional => additional.id !== id) 
  })),
  
  updateAdditional: (id, updatedAdditional) => set((state) => ({ 
    additionals: state.additionals.map(additional => 
      additional.id === id ? { ...additional, ...updatedAdditional } : additional
    ) 
  })),
});
