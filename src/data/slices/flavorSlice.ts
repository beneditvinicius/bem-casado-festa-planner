
import { StateCreator } from 'zustand';
import { Flavor } from '../types';
import { RootState } from '../store';

export interface FlavorSlice {
  flavors: Flavor[];
  addFlavor: (flavor: Flavor) => void;
  removeFlavor: (id: string) => void;
  updateFlavor: (id: string, updatedFlavor: Partial<Flavor>) => void;
}

export const createFlavorSlice: StateCreator<
  RootState,
  [],
  [],
  FlavorSlice
> = (set) => ({
  flavors: [
    { id: '1', name: 'Tradicional', price: 3.95, categoryId: 'default' },
    { id: '2', name: 'Brigadeiro Branco', price: 3.95, categoryId: 'default' },
    { id: '3', name: 'Limão Siciliano', price: 4.50, categoryId: 'default' },
    { id: '4', name: 'Frutas Vermelhas', price: 4.78, categoryId: 'default' },
    { id: '5', name: 'Doce de Leite com Coco', price: 4.78, categoryId: 'default' },
    { id: '6', name: '4 Leites', price: 4.90, categoryId: 'default' },
    { id: '7', name: 'Abacaxi com Coco', price: 4.90, categoryId: 'default' },
    { id: '8', name: 'Ninho com Nutella', price: 5.00, categoryId: 'default' },
    { id: '9', name: 'Pistache', price: 6.00, categoryId: 'default' },
    { id: '10', name: 'Bem Casado de Brownie', price: 5.50, categoryId: 'default' },
    { id: '11', name: 'Bem Casado de Pão de mel', price: 6.00, categoryId: 'default' },
  ],
  
  addFlavor: (flavor) => set((state) => ({ 
    flavors: [...state.flavors, flavor] 
  })),
  
  removeFlavor: (id) => set((state) => ({ 
    flavors: state.flavors.filter(flavor => flavor.id !== id) 
  })),
  
  updateFlavor: (id, updatedFlavor) => set((state) => ({ 
    flavors: state.flavors.map(flavor => 
      flavor.id === id ? { ...flavor, ...updatedFlavor } : flavor
    ) 
  })),
});
