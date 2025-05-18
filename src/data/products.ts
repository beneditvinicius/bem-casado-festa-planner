
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createFlavorSlice, FlavorSlice } from './slices/flavorSlice';
import { createRibbonSlice, RibbonSlice } from './slices/ribbonSlice';
import { createPackageSlice, PackageSlice } from './slices/packageSlice';
import { createConfigSlice, ConfigSlice } from './slices/configSlice';
import type { Flavor, RibbonColor, PackageColor } from './types';

// Re-export types
export type { Flavor, RibbonColor, PackageColor };

// Define o estado da loja
export interface ProductsState extends FlavorSlice, RibbonSlice, PackageSlice, ConfigSlice {}

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

// Use the same store for config to ensure consistency
export const useConfigStore = useProductsStore;
