
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FlavorSlice, createFlavorSlice } from './slices/flavorSlice';
import { RibbonSlice, createRibbonSlice } from './slices/ribbonSlice';
import { PackageSlice, createPackageSlice } from './slices/packageSlice';
import { CombinationSlice, createCombinationSlice } from './slices/combinationSlice';
import { ConfigSlice, createConfigSlice } from './slices/configSlice';

export type RootState = FlavorSlice & RibbonSlice & PackageSlice & CombinationSlice & ConfigSlice;

export const useProductsStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createFlavorSlice(...a),
      ...createRibbonSlice(...a),
      ...createPackageSlice(...a),
      ...createCombinationSlice(...a),
      ...createConfigSlice(...a),
    }),
    {
      name: 'products-store',
    }
  )
);
