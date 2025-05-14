
import { StateCreator } from 'zustand';
import { PackageColor } from '../types';
import { RootState } from '../store';

export interface PackageSlice {
  packageColors: PackageColor[];
  addPackageColor: (color: PackageColor) => void;
  removePackageColor: (id: string) => void;
  updatePackageColor: (id: string, updatedColor: Partial<PackageColor>) => void;
}

export const createPackageSlice: StateCreator<
  RootState,
  [],
  [],
  PackageSlice
> = (set) => ({
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
  
  addPackageColor: (color) => set((state) => ({ 
    packageColors: [...state.packageColors, color] 
  })),
  
  removePackageColor: (id) => set((state) => ({ 
    packageColors: state.packageColors.filter(color => color.id !== id) 
  })),
  
  updatePackageColor: (id, updatedColor) => set((state) => ({ 
    packageColors: state.packageColors.map(color => 
      color.id === id ? { ...color, ...updatedColor } : color
    )
  })),
});
