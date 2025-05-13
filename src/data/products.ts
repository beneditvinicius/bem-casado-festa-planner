
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Flavor {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
}

export interface RibbonColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
}

export interface PackageColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
}

export interface Combination {
  ribbonId: string;
  packageId: string;
  imageUrl: string;
}

interface ProductsStore {
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  combinations: Combination[];
  whatsappNumber: string;
  
  addFlavor: (flavor: Flavor) => void;
  removeFlavor: (id: string) => void;
  updateFlavor: (id: string, updatedFlavor: Partial<Flavor>) => void;
  
  addRibbonColor: (color: RibbonColor) => void;
  removeRibbonColor: (id: string) => void;
  updateRibbonColor: (id: string, updatedColor: Partial<RibbonColor>) => void;
  
  addPackageColor: (color: PackageColor) => void;
  removePackageColor: (id: string) => void;
  updatePackageColor: (id: string, updatedColor: Partial<PackageColor>) => void;
  
  addCombination: (combination: Combination) => void;
  removeCombination: (ribbonId: string, packageId: string) => void;
  
  setWhatsappNumber: (number: string) => void;
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set) => ({
      flavors: [
        { id: '1', name: 'Tradicional', price: 4.5 },
        { id: '2', name: 'Doce de Leite', price: 4.8, isNew: true },
        { id: '3', name: 'Limão', price: 4.8 },
        { id: '4', name: 'Nozes', price: 5.2 },
        { id: '5', name: 'Coco', price: 4.8 },
        { id: '6', name: 'Pistache', price: 5.5, isNew: true },
      ],
      ribbonColors: [
        { id: '1', name: 'Dourado', code: 'D001', color: '#D4AF37' },
        { id: '2', name: 'Prata', code: 'P001', color: '#C0C0C0' },
        { id: '3', name: 'Rose Gold', code: 'R001', color: '#B76E79', isNew: true },
        { id: '4', name: 'Vermelho', code: 'V001', color: '#FF0000' },
        { id: '5', name: 'Azul Royal', code: 'A001', color: '#4169E1' },
        { id: '6', name: 'Verde Esmeralda', code: 'V002', color: '#50C878' },
      ],
      packageColors: [
        { id: '1', name: 'Branco', code: 'B001', color: '#FFFFFF' },
        { id: '2', name: 'Marfim', code: 'M001', color: '#FFFFF0' },
        { id: '3', name: 'Pérola', code: 'P001', color: '#F5F5F5' },
        { id: '4', name: 'Rose', code: 'R001', color: '#FFE4E1', isNew: true },
        { id: '5', name: 'Azul Claro', code: 'A001', color: '#ADD8E6' },
      ],
      combinations: [
        {
          ribbonId: '1', // Dourado
          packageId: '1', // Branco
          imageUrl: 'https://via.placeholder.com/300/D4AF37/FFFFFF?text=Dourado+Branco',
        },
        {
          ribbonId: '2', // Prata
          packageId: '1', // Branco
          imageUrl: 'https://via.placeholder.com/300/C0C0C0/FFFFFF?text=Prata+Branco',
        },
        {
          ribbonId: '3', // Rose Gold
          packageId: '4', // Rose
          imageUrl: 'https://via.placeholder.com/300/B76E79/FFE4E1?text=Rose+Gold+Rose',
        },
      ],
      whatsappNumber: '5566999580591',

      addFlavor: (flavor) => set((state) => ({ flavors: [...state.flavors, flavor] })),
      removeFlavor: (id) => set((state) => ({ flavors: state.flavors.filter(flavor => flavor.id !== id) })),
      updateFlavor: (id, updatedFlavor) => set((state) => ({ 
        flavors: state.flavors.map(flavor => 
          flavor.id === id ? { ...flavor, ...updatedFlavor } : flavor
        ) 
      })),
      
      addRibbonColor: (color) => set((state) => ({ ribbonColors: [...state.ribbonColors, color] })),
      removeRibbonColor: (id) => set((state) => ({ ribbonColors: state.ribbonColors.filter(color => color.id !== id) })),
      updateRibbonColor: (id, updatedColor) => set((state) => ({ 
        ribbonColors: state.ribbonColors.map(color => 
          color.id === id ? { ...color, ...updatedColor } : color
        )
      })),
      
      addPackageColor: (color) => set((state) => ({ packageColors: [...state.packageColors, color] })),
      removePackageColor: (id) => set((state) => ({ packageColors: state.packageColors.filter(color => color.id !== id) })),
      updatePackageColor: (id, updatedColor) => set((state) => ({ 
        packageColors: state.packageColors.map(color => 
          color.id === id ? { ...color, ...updatedColor } : color
        )
      })),
      
      addCombination: (combination) => set((state) => ({ combinations: [...state.combinations, combination] })),
      removeCombination: (ribbonId, packageId) => set((state) => ({ 
        combinations: state.combinations.filter(combo => 
          !(combo.ribbonId === ribbonId && combo.packageId === packageId)
        ) 
      })),
      
      setWhatsappNumber: (number) => set({ whatsappNumber: number }),
    }),
    {
      name: 'products-store',
    }
  )
);
