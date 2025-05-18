
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
    { id: '1', name: 'Champagne (311)', code: '311', color: '#F1F0FB' },
    { id: '2', name: 'Bege (236)', code: '236', color: '#F1F0FB' },
    { id: '3', name: 'Dourado (1353)', code: '1353', color: '#D4AF37' },
    { id: '4', name: 'Ouro (228)', code: '228', color: '#FEF7CD' },
    { id: '5', name: 'Amarelo Canário (242)', code: '242', color: '#FEF7CD' },
    { id: '6', name: 'Laranja (066)', code: '066', color: '#F97316' },
    { id: '7', name: 'Vinho (389)', code: '389', color: '#ea384c' },
    { id: '8', name: 'Marsala (1355)', code: '1355', color: '#ea384c' },
    { id: '9', name: 'Fúcsia (1240)', code: '1240', color: '#D946EF' },
    { id: '10', name: 'Rosé (344)', code: '344', color: '#FFDEE2' },
    { id: '11', name: 'Coral (1393)', code: '1393', color: '#FDE1D3' },
    { id: '12', name: 'Pink (303)', code: '303', color: '#D946EF' },
    { id: '13', name: 'Rosa Bebê (310)', code: '310', color: '#FFDEE2' },
    { id: '14', name: 'Lilás Lavanda (356)', code: '356', color: '#E5DEFF' },
    { id: '15', name: 'Azul Marinho (215)', code: '215', color: '#1EAEDB' },
    { id: '16', name: 'Azul Royal (214)', code: '214', color: '#1EAEDB' },
    { id: '17', name: 'Jade (1102)', code: '1102', color: '#33C3F0' },
    { id: '18', name: 'Azul Celeste (246)', code: '246', color: '#33C3F0' },
    { id: '19', name: 'Azul Bebê (212)', code: '212', color: '#D3E4FD' },
    { id: '20', name: 'Verde Militar (249)', code: '249', color: '#F2FCE2' },
    { id: '21', name: 'Verde Menta (232)', code: '232', color: '#F2FCE2' },
    { id: '22', name: 'Prata (084)', code: '084', color: '#C0C0C0' },
    { id: '23', name: 'Marrom (391)', code: '391', color: '#8A4B38' },
    { id: '24', name: 'Terra (1383)', code: '1383', color: '#F97316' },
    { id: '25', name: 'Branco (B001)', code: 'B001', color: '#FFFFFF' },
    { id: '26', name: 'Preto (219)', code: '219', color: '#000000' },
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
