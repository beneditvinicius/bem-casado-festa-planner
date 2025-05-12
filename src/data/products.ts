
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Flavor {
  id: string;
  name: string;
  price: number;
}

export interface RibbonColor {
  id: string;
  name: string;
  color: string;
}

export interface PackageColor {
  id: string;
  name: string;
  color: string;
}

export interface Combination {
  ribbonId: string;
  packageId: string;
  imageUrl: string;
}

interface ProductsState {
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  combinations: Combination[];
  whatsappNumber: string;
  setFlavors: (flavors: Flavor[]) => void;
  addFlavor: (flavor: Flavor) => void;
  removeFlavor: (id: string) => void;
  setRibbonColors: (colors: RibbonColor[]) => void;
  addRibbonColor: (color: RibbonColor) => void;
  removeRibbonColor: (id: string) => void;
  setPackageColors: (colors: PackageColor[]) => void;
  addPackageColor: (color: PackageColor) => void;
  removePackageColor: (id: string) => void;
  setCombinations: (combinations: Combination[]) => void;
  addCombination: (combination: Combination) => void;
  removeCombination: (ribbonId: string, packageId: string) => void;
  setWhatsappNumber: (number: string) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      flavors: [
        { id: '1', name: 'Tradicional', price: 6.00 },
        { id: '2', name: 'Chocolate', price: 6.50 },
        { id: '3', name: 'Doce de Leite', price: 6.50 },
      ],
      ribbonColors: [
        { id: '1', name: 'Dourada', color: '#D4AF37' },
        { id: '2', name: 'Prata', color: '#C0C0C0' },
        { id: '3', name: 'Rosa', color: '#FFC0CB' },
      ],
      packageColors: [
        { id: '1', name: 'Branca', color: '#FFFFFF' },
        { id: '2', name: 'Kraft', color: '#D2B48C' },
        { id: '3', name: 'Transparente', color: '#E6E6E6' },
      ],
      combinations: [
        { ribbonId: '1', packageId: '1', imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07' },
        { ribbonId: '2', packageId: '2', imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22' },
        { ribbonId: '3', packageId: '3', imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151' },
      ],
      whatsappNumber: '5511999999999',
      setFlavors: (flavors) => set({ flavors }),
      addFlavor: (flavor) => set((state) => ({ flavors: [...state.flavors, flavor] })),
      removeFlavor: (id) => set((state) => ({ 
        flavors: state.flavors.filter((f) => f.id !== id) 
      })),
      setRibbonColors: (ribbonColors) => set({ ribbonColors }),
      addRibbonColor: (color) => set((state) => ({ ribbonColors: [...state.ribbonColors, color] })),
      removeRibbonColor: (id) => set((state) => ({ 
        ribbonColors: state.ribbonColors.filter((c) => c.id !== id) 
      })),
      setPackageColors: (packageColors) => set({ packageColors }),
      addPackageColor: (color) => set((state) => ({ packageColors: [...state.packageColors, color] })),
      removePackageColor: (id) => set((state) => ({ 
        packageColors: state.packageColors.filter((c) => c.id !== id) 
      })),
      setCombinations: (combinations) => set({ combinations }),
      addCombination: (combination) => set((state) => ({ combinations: [...state.combinations, combination] })),
      removeCombination: (ribbonId, packageId) => set((state) => ({ 
        combinations: state.combinations.filter(
          (c) => !(c.ribbonId === ribbonId && c.packageId === packageId)
        ) 
      })),
      setWhatsappNumber: (whatsappNumber) => set({ whatsappNumber }),
    }),
    {
      name: 'bem-casados-storage',
    }
  )
);
