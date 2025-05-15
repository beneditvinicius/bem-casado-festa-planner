
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { flavorSlice } from './slices/flavorSlice';
import { ribbonSlice } from './slices/ribbonSlice';
import { packageSlice } from './slices/packageSlice';
import { configSlice } from './slices/configSlice';
import { Flavor, RibbonColor, PackageColor, ConfigState } from './types';

// Define o estado da loja
interface ProductsState {
  // Sabores
  flavors: Flavor[];
  addFlavor: (flavor: Flavor) => void;
  removeFlavor: (id: string) => void;
  updateFlavor: (id: string, updates: Partial<Flavor>) => void;
  
  // Cores de fita
  ribbonColors: RibbonColor[];
  addRibbonColor: (color: RibbonColor) => void;
  removeRibbonColor: (id: string) => void;
  updateRibbonColor: (id: string, updates: Partial<RibbonColor>) => void;
  
  // Cores de embalagem
  packageColors: PackageColor[];
  addPackageColor: (color: PackageColor) => void;
  removePackageColor: (id: string) => void;
  updatePackageColor: (id: string, updates: Partial<PackageColor>) => void;
  
  // Configurações
  bannerUrl: string | null;
  bannerText: string | null;
  setBannerUrl: (url: string) => void;
  setBannerText: (text: string) => void;
}

export const useProductsStore = create<ProductsState>()(
  devtools(
    persist(
      (...a) => ({
        ...flavorSlice(...a),
        ...ribbonSlice(...a),
        ...packageSlice(...a),
        ...configSlice(...a),
      }),
      {
        name: 'products-storage',
      }
    )
  )
);

export const useConfigStore = create<ConfigState>()(
  devtools(
    persist(
      (...a) => ({
        ...configSlice(...a),
      }),
      {
        name: 'config-storage',
      }
    )
  )
);
