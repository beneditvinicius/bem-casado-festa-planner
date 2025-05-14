
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
        { id: '1', name: 'Tradicional', price: 3.95 },
        { id: '2', name: 'Brigadeiro Branco', price: 3.95 },
        { id: '3', name: 'Limão Siciliano', price: 4.50 },
        { id: '4', name: 'Frutas Vermelhas', price: 4.78 },
        { id: '5', name: 'Doce de Leite com Coco', price: 4.78 },
        { id: '6', name: '4 Leites', price: 4.90 },
        { id: '7', name: 'Abacaxi com Coco', price: 4.90 },
        { id: '8', name: 'Ninho com Nutella', price: 5.00 },
        { id: '9', name: 'Pistache', price: 6.00 },
        { id: '10', name: 'Bem Casado de Brownie', price: 5.50 },
        { id: '11', name: 'Bem Casado de Pão de mel', price: 6.00 },
      ],
      ribbonColors: [
        { id: '1', name: 'Champagne (Ivory)', code: '311', color: '#F1F0FB' },
        { id: '2', name: 'Bege (Taupe)', code: '236', color: '#F1F0FB' },
        { id: '3', name: 'Dourado (Dijon)', code: '1353', color: '#D4AF37' },
        { id: '4', name: 'Ouro (Sable)', code: '228', color: '#FEF7CD' },
        { id: '5', name: 'Amarelo Canário (Lt. Lemon)', code: '242', color: '#FEF7CD' },
        { id: '6', name: 'Laranja (Orange)', code: '066', color: '#F97316' },
        { id: '7', name: 'Vinho (Burgundy)', code: '389', color: '#ea384c' },
        { id: '8', name: 'Marsala', code: '1355', color: '#ea384c' },
        { id: '9', name: 'Fúcsia (Wine)', code: '1240', color: '#D946EF' },
        { id: '10', name: 'Rosé (Rose)', code: '344', color: '#FFDEE2' },
        { id: '11', name: 'Coral (Lt. Coral)', code: '1393', color: '#FDE1D3' },
        { id: '12', name: 'Pink (Fuchsia)', code: '303', color: '#D946EF' },
        { id: '13', name: 'Rosa Bebê (Lt. Pink)', code: '310', color: '#FFDEE2' },
        { id: '14', name: 'Lilás Lavanda (Lavander Lilac)', code: '356', color: '#E5DEFF' },
        { id: '15', name: 'Azul Marinho (Navy)', code: '215', color: '#1EAEDB' },
        { id: '16', name: 'Azul Royal (Royal)', code: '214', color: '#1EAEDB' },
        { id: '17', name: 'Jade (Turquoise)', code: '1102', color: '#33C3F0' },
        { id: '18', name: 'Azul Celeste (Copen Blue)', code: '246', color: '#33C3F0' },
        { id: '19', name: 'Azul Bebê (Lt. Blue)', code: '212', color: '#D3E4FD' },
        { id: '20', name: 'Verde Militar (Forest Green)', code: '249', color: '#F2FCE2' },
        { id: '21', name: 'Verde Menta (Mint)', code: '232', color: '#F2FCE2' },
        { id: '22', name: 'Prata (Silver)', code: '084', color: '#C0C0C0' },
        { id: '23', name: 'Marrom (Brown)', code: '391', color: '#8A4B38' },
        { id: '24', name: 'Terra (Rust)', code: '1383', color: '#F97316' },
        { id: '25', name: 'Preto (Black)', code: '219', color: '#000000' },
      ],
      packageColors: [
        { id: '1', name: 'Champagne (Ivory)', code: '311', color: '#F1F0FB' },
        { id: '2', name: 'Bege (Taupe)', code: '236', color: '#F1F0FB' },
        { id: '3', name: 'Dourado (Dijon)', code: '1353', color: '#D4AF37' },
        { id: '4', name: 'Ouro (Sable)', code: '228', color: '#FEF7CD' },
        { id: '5', name: 'Amarelo Canário (Lt. Lemon)', code: '242', color: '#FEF7CD' },
        { id: '6', name: 'Laranja (Orange)', code: '066', color: '#F97316' },
        { id: '7', name: 'Vinho (Burgundy)', code: '389', color: '#ea384c' },
        { id: '8', name: 'Marsala', code: '1355', color: '#ea384c' },
        { id: '9', name: 'Fúcsia (Wine)', code: '1240', color: '#D946EF' },
        { id: '10', name: 'Rosé (Rose)', code: '344', color: '#FFDEE2' },
        { id: '11', name: 'Coral (Lt. Coral)', code: '1393', color: '#FDE1D3' },
        { id: '12', name: 'Pink (Fuchsia)', code: '303', color: '#D946EF' },
        { id: '13', name: 'Rosa Bebê (Lt. Pink)', code: '310', color: '#FFDEE2' },
        { id: '14', name: 'Lilás Lavanda (Lavander Lilac)', code: '356', color: '#E5DEFF' },
        { id: '15', name: 'Azul Marinho (Navy)', code: '215', color: '#1EAEDB' },
        { id: '16', name: 'Azul Royal (Royal)', code: '214', color: '#1EAEDB' },
        { id: '17', name: 'Jade (Turquoise)', code: '1102', color: '#33C3F0' },
        { id: '18', name: 'Azul Celeste (Copen Blue)', code: '246', color: '#33C3F0' },
        { id: '19', name: 'Azul Bebê (Lt. Blue)', code: '212', color: '#D3E4FD' },
        { id: '20', name: 'Verde Militar (Forest Green)', code: '249', color: '#F2FCE2' },
        { id: '21', name: 'Verde Menta (Mint)', code: '232', color: '#F2FCE2' },
        { id: '22', name: 'Prata (Silver)', code: '084', color: '#C0C0C0' },
        { id: '23', name: 'Marrom (Brown)', code: '391', color: '#8A4B38' },
        { id: '24', name: 'Terra (Rust)', code: '1383', color: '#F97316' },
        { id: '25', name: 'Branco', code: 'B001', color: '#FFFFFF' },
        { id: '26', name: 'Preto (Black)', code: '219', color: '#000000' },
      ],
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
