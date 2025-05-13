import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Flavor {
  id: string;
  name: string;
  price: number;
  /** Marca itens recém-cadastrados como novidade */
  isNew?: boolean;
}

export interface RibbonColor {
  id: string;
  name: string;
  code: string;
  color: string;
  /** Marca itens recém-cadastrados como novidade */
  isNew?: boolean;
}

export interface PackageColor {
  id: string;
  name: string;
  code: string;
  color: string;
  /** Marca itens recém-cadastrados como novidade */
  isNew?: boolean;
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
        { id: '1', name: 'Champagne (Ivory)', code: '311', color: '#F8F4E3' },
        { id: '2', name: 'Bege (Taupe)', code: '236', color: '#D6CDB7' },
        { id: '3', name: 'Dourado (Dijon)', code: '1353', color: '#D4AF37' },
        { id: '4', name: 'Ouro (Sable)', code: '228', color: '#CFB53B' },
        { id: '5', name: 'Amarelo Canário (Lt. Lemon)', code: '242', color: '#FFFF9F' },
        { id: '6', name: 'Laranja (Orange)', code: '066', color: '#FF7F00' },
        { id: '7', name: 'Vinho (Burgundy)', code: '389', color: '#800020' },
        { id: '8', name: 'Marsala', code: '1355', color: '#964F4C' },
        { id: '9', name: 'Fúcsia (Wine)', code: '1240', color: '#C21E56' },
        { id: '10', name: 'Rosé (Rose)', code: '344', color: '#FF007F' },
        { id: '11', name: 'Coral (Lt. Coral)', code: '1393', color: '#F88379' },
        { id: '12', name: 'Pink (Fuchsia)', code: '303', color: '#FF00FF' },
        { id: '13', name: 'Rosa Bebê (Lt. Pink)', code: '310', color: '#FFC0CB' },
        { id: '14', name: 'Lilás Lavanda (Lavander Lilac)', code: '356', color: '#B57EDC' },
        { id: '15', name: 'Azul Marinho (Navy)', code: '215', color: '#000080' },
        { id: '16', name: 'Azul Royal (Royal)', code: '214', color: '#4169E1' },
        { id: '17', name: 'Jade (Turquoise)', code: '1102', color: '#40E0D0' },
        { id: '18', name: 'Azul Celeste (Copen Blue)', code: '246', color: '#6495ED' },
        { id: '19', name: 'Azul Bebê (Lt. Blue)', code: '212', color: '#ADD8E6' },
        { id: '20', name: 'Verde Militar (Forest Green)', code: '249', color: '#228B22' },
        { id: '21', name: 'Verde Menta (Mint)', code: '232', color: '#98FB98' },
        { id: '22', name: 'Prata (Silver)', code: '084', color: '#C0C0C0' },
        { id: '23', name: 'Marrom (Brown)', code: '391', color: '#A52A2A' },
        { id: '24', name: 'Terra (Rust)', code: '1383', color: '#B7410E' },
        { id: '25', name: 'Preto (Black)', code: '219', color: '#000000' },
      ],
      packageColors: [
        { id: '1', name: 'Champagne (Ivory)', code: '311', color: '#F8F4E3' },
        { id: '2', name: 'Bege (Taupe)', code: '236', color: '#D6CDB7' },
        { id: '3', name: 'Dourado (Dijon)', code: '1353', color: '#D4AF37' },
        { id: '4', name: 'Ouro (Sable)', code: '228', color: '#CFB53B' },
        { id: '5', name: 'Amarelo Canário (Lt. Lemon)', code: '242', color: '#FFFF9F' },
        { id: '6', name: 'Laranja (Orange)', code: '066', color: '#FF7F00' },
        { id: '7', name: 'Vinho (Burgundy)', code: '389', color: '#800020' },
        { id: '8', name: 'Marsala', code: '1355', color: '#964F4C' },
        { id: '9', name: 'Fúcsia (Wine)', code: '1240', color: '#C21E56' },
        { id: '10', name: 'Rosé (Rose)', code: '344', color: '#FF007F' },
        { id: '11', name: 'Coral (Lt. Coral)', code: '1393', color: '#F88379' },
        { id: '12', name: 'Pink (Fuchsia)', code: '303', color: '#FF00FF' },
        { id: '13', name: 'Rosa Bebê (Lt. Pink)', code: '310', color: '#FFC0CB' },
        { id: '14', name: 'Lilás Lavanda (Lavander Lilac)', code: '356', color: '#B57EDC' },
        { id: '15', name: 'Azul Marinho (Navy)', code: '215', color: '#000080' },
        { id: '16', name: 'Azul Royal (Royal)', code: '214', color: '#4169E1' },
        { id: '17', name: 'Jade (Turquoise)', code: '1102', color: '#40E0D0' },
        { id: '18', name: 'Azul Celeste (Copen Blue)', code: '246', color: '#6495ED' },
        { id: '19', name: 'Azul Bebê (Lt. Blue)', code: '212', color: '#ADD8E6' },
        { id: '20', name: 'Verde Militar (Forest Green)', code: '249', color: '#228B22' },
        { id: '21', name: 'Verde Menta (Mint)', code: '232', color: '#98FB98' },
        { id: '22', name: 'Prata (Silver)', code: '084', color: '#C0C0C0' },
        { id: '23', name: 'Marrom (Brown)', code: '391', color: '#A52A2A' },
        { id: '24', name: 'Terra (Rust)', code: '1383', color: '#B7410E' },
        { id: '25', name: 'Preto (Black)', code: '219', color: '#000000' },
      ],
      combinations: [
        // Exemplos iniciais de combinações
        { ribbonId: '3', packageId: '1', imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07' }, // Dourado e Branco
        { ribbonId: '7', packageId: '2', imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22' }, // Vinho e Bege
        { ribbonId: '13', packageId: '1', imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151' }, // Rosa e Branco
      ],
      whatsappNumber: '5566999580591',
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
