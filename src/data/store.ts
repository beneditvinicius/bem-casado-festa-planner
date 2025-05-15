
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FlavorSlice, createFlavorSlice } from './slices/flavorSlice';
import { RibbonSlice, createRibbonSlice } from './slices/ribbonSlice';
import { PackageSlice, createPackageSlice } from './slices/packageSlice';
import { ConfigSlice, createConfigSlice } from './slices/configSlice';

export type RootState = FlavorSlice & RibbonSlice & PackageSlice & ConfigSlice;

export const useProductsStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createFlavorSlice(...a),
      ...createRibbonSlice(...a),
      ...createPackageSlice(...a),
      ...createConfigSlice(...a),
    }),
    {
      name: 'products-store',
    }
  )
);

// Add update methods to the store slices
const createStoreWithUpdates = () => {
  const store = useProductsStore.getState();

  // Add flavor update method
  if (!store.updateFlavor) {
    useProductsStore.setState({
      updateFlavor: (id, data) => useProductsStore.setState((state) => ({
        flavors: state.flavors.map(f => f.id === id ? { ...f, ...data } : f)
      }))
    });
  }

  // Add ribbon update method
  if (!store.updateRibbonColor) {
    useProductsStore.setState({
      updateRibbonColor: (id, data) => useProductsStore.setState((state) => ({
        ribbonColors: state.ribbonColors.map(r => r.id === id ? { ...r, ...data } : r)
      }))
    });
  }

  // Add package update method
  if (!store.updatePackageColor) {
    useProductsStore.setState({
      updatePackageColor: (id, data) => useProductsStore.setState((state) => ({
        packageColors: state.packageColors.map(p => p.id === id ? { ...p, ...data } : p)
      }))
    });
  }
};

// Initialize the store with update methods
createStoreWithUpdates();
