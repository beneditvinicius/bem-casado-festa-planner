
import { StateCreator } from 'zustand';
import { BoloGeladoFlavor } from '../types';
import { RootState } from '../store';

export interface BoloGeladoSlice {
  boloGeladoFlavors: BoloGeladoFlavor[];
  addBoloGeladoFlavor: (flavor: BoloGeladoFlavor) => void;
  removeBoloGeladoFlavor: (id: string) => void;
  updateBoloGeladoFlavor: (id: string, updatedFlavor: Partial<BoloGeladoFlavor>) => void;
}

export const createBoloGeladoSlice: StateCreator<
  RootState,
  [],
  [],
  BoloGeladoSlice
> = (set) => ({
  boloGeladoFlavors: [
    { id: 'bg1', name: 'Frutas Vermelhas', price: 7.00, categoryId: 'bolo-gelado' },
    { id: 'bg2', name: 'Ninho e Nutella', price: 7.00, categoryId: 'bolo-gelado' },
    { id: 'bg3', name: 'Côco', price: 7.00, categoryId: 'bolo-gelado' },
    { id: 'bg4', name: 'Abacaxi com Côco', price: 7.00, categoryId: 'bolo-gelado' },
    { id: 'bg5', name: 'Maracujá', price: 7.00, categoryId: 'bolo-gelado' },
    { id: 'bg6', name: 'Chocolate', price: 8.00, categoryId: 'bolo-gelado' },
    { id: 'bg7', name: 'Doce de Leite com Côco', price: 8.00, categoryId: 'bolo-gelado' },
    { id: 'bg8', name: 'Pistache', price: 8.00, categoryId: 'bolo-gelado' },
  ],
  
  addBoloGeladoFlavor: (flavor) => set((state) => ({ 
    boloGeladoFlavors: [...state.boloGeladoFlavors, flavor] 
  })),
  
  removeBoloGeladoFlavor: (id) => set((state) => ({ 
    boloGeladoFlavors: state.boloGeladoFlavors.filter(flavor => flavor.id !== id) 
  })),
  
  updateBoloGeladoFlavor: (id, updatedFlavor) => set((state) => ({ 
    boloGeladoFlavors: state.boloGeladoFlavors.map(flavor => 
      flavor.id === id ? { ...flavor, ...updatedFlavor } : flavor
    ) 
  })),
});
