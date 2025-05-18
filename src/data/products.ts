
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createFlavorSlice, FlavorSlice } from './slices/flavorSlice';
import { createRibbonSlice, RibbonSlice } from './slices/ribbonSlice';
import { createPackageSlice, PackageSlice } from './slices/packageSlice';
import { createConfigSlice } from './slices/configSlice';
import type { Flavor, RibbonColor, PackageColor, ConfigState } from './types';

// Re-export types
export type { Flavor, RibbonColor, PackageColor, ConfigState };

// Define o estado da loja
export interface ProductsState extends FlavorSlice, RibbonSlice, PackageSlice, ConfigState {}

export const useProductsStore = create<ProductsState>()(
  devtools(
    persist(
      (...a) => ({
        ...createFlavorSlice(...a),
        ...createRibbonSlice(...a),
        ...createPackageSlice(...a),
        ...createConfigSlice(...a),
      }),
      {
        name: 'products-storage',
      }
    )
  )
);

// Fix the type issue by extending ProductsState with correct ConfigState
// This ensures configStore has all the required properties of RootState
export const useConfigStore = create<ProductsState>()(
  devtools(
    persist(
      (...a) => ({
        ...createFlavorSlice(...a),
        ...createRibbonSlice(...a),
        ...createPackageSlice(...a),
        ...createConfigSlice(...a),
      }),
      {
        name: 'config-storage',
      }
    )
  )
);
