import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Flavor {
  id: string;
  name: string;
  price: number;
  isNew: boolean;
}

export interface RibbonColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew: boolean;
}

export interface PackageColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew: boolean;
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
  whatsappNumber: string | null;
  
  addFlavor: (flavor: Flavor) => void;
  updateFlavor: (flavor: Flavor) => void;
  removeFlavor: (id: string) => void;
  
  addRibbonColor: (ribbon: RibbonColor) => void;
  updateRibbonColor: (ribbon: RibbonColor) => void;
  removeRibbonColor: (id: string) => void;
  
  addPackageColor: (pkg: PackageColor) => void;
  updatePackageColor: (pkg: PackageColor) => void;
  removePackageColor: (id: string) => void;
  
  addCombination: (combination: Combination) => void;
  removeCombination: (ribbonId: string, packageId: string) => void;
  
  setWhatsappNumber: (number: string) => void;
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set) => ({
      flavors: [
        { id: '1', name: 'Tradicional', price: 3.50, isNew: false },
        { id: '2', name: 'Chocolate', price: 4.00, isNew: true },
        { id: '3', name: 'Nozes', price: 4.50, isNew: true },
        { id: '4', name: 'Limão', price: 4.00, isNew: false },
        { id: '5', name: 'Coco', price: 4.00, isNew: false },
        { id: '6', name: 'Café', price: 4.00, isNew: false },
        { id: '7', name: 'Maracujá', price: 4.50, isNew: true }
      ],
      
      ribbonColors: [
        { id: '1', name: 'Dourado', code: 'dourado', color: '#D4AF37', isNew: false },
        { id: '2', name: 'Prata', code: 'prata', color: '#C0C0C0', isNew: false },
        { id: '3', name: 'Branco', code: 'branco', color: '#FFFFFF', isNew: false },
        { id: '4', name: 'Off-White', code: 'offwhite', color: '#F5F5DC', isNew: false },
        { id: '5', name: 'Rosê', code: 'rose', color: '#E8C0A9', isNew: true },
        { id: '6', name: 'Azul Serenity', code: 'azul-serenity', color: '#91A8D0', isNew: true }
      ],
      
      packageColors: [
        { id: '1', name: 'Branco', code: 'branco', color: '#FFFFFF', isNew: false },
        { id: '2', name: 'Off-White', code: 'offwhite', color: '#F5F5DC', isNew: false },
        { id: '3', name: 'Rosê', code: 'rose', color: '#E8C0A9', isNew: true },
        { id: '4', name: 'Azul Claro', code: 'azul-claro', color: '#ADD8E6', isNew: false },
        { id: '5', name: 'Verde Menta', code: 'verde-menta', color: '#98FB98', isNew: true }
      ],
      
      combinations: [
        {
          ribbonId: '1', // Dourado
          packageId: '2', // Off-White
          imageUrl: 'https://placehold.co/400x400/F5F5DC/D4AF37?text=Fita+Dourada+%2B+Off-White'
        },
        {
          ribbonId: '5', // Rosê
          packageId: '1', // Branco
          imageUrl: 'https://placehold.co/400x400/FFFFFF/E8C0A9?text=Fita+Rosê+%2B+Branco'
        },
        {
          ribbonId: '6', // Azul Serenity
          packageId: '2', // Off-White
          imageUrl: 'https://placehold.co/400x400/F5F5DC/91A8D0?text=Fita+Azul+%2B+Off-White'
        }
      ],
      
      whatsappNumber: '5566999580591',
      
      addFlavor: (flavor) => set((state) => ({ 
        flavors: [...state.flavors, flavor] 
      })),

      updateFlavor: (flavor) => set((state) => ({
        flavors: state.flavors.map(f => f.id === flavor.id ? flavor : f)
      })),
      
      removeFlavor: (id) => set((state) => ({
        flavors: state.flavors.filter(flavor => flavor.id !== id)
      })),
      
      addRibbonColor: (ribbon) => set((state) => ({ 
        ribbonColors: [...state.ribbonColors, ribbon] 
      })),

      updateRibbonColor: (ribbon) => set((state) => ({
        ribbonColors: state.ribbonColors.map(r => r.id === ribbon.id ? ribbon : r)
      })),
      
      removeRibbonColor: (id) => set((state) => ({
        ribbonColors: state.ribbonColors.filter(ribbon => ribbon.id !== id)
      })),
      
      addPackageColor: (pkg) => set((state) => ({ 
        packageColors: [...state.packageColors, pkg] 
      })),

      updatePackageColor: (pkg) => set((state) => ({
        packageColors: state.packageColors.map(p => p.id === pkg.id ? pkg : p)
      })),
      
      removePackageColor: (id) => set((state) => ({
        packageColors: state.packageColors.filter(pkg => pkg.id !== id)
      })),
      
      addCombination: (combination) => set((state) => ({ 
        combinations: [...state.combinations, combination] 
      })),
      
      removeCombination: (ribbonId, packageId) => set((state) => ({
        combinations: state.combinations.filter(
          combo => !(combo.ribbonId === ribbonId && combo.packageId === packageId)
        )
      })),
      
      setWhatsappNumber: (number) => set({ whatsappNumber: number })
    }),
    {
      name: 'bem-casados-store'
    }
  )
);
