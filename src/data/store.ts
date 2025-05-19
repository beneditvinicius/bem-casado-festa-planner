
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FlavorSlice, createFlavorSlice } from './slices/flavorSlice';
import { RibbonSlice, createRibbonSlice } from './slices/ribbonSlice';
import { PackageSlice, createPackageSlice } from './slices/packageSlice';
import { ConfigSlice, createConfigSlice } from './slices/configSlice';
import { BoloGeladoSlice, createBoloGeladoSlice } from './slices/boloGeladoSlice';
import { AdditionalSlice, createAdditionalSlice } from './slices/additionalSlice';

export type RootState = FlavorSlice & RibbonSlice & PackageSlice & ConfigSlice & 
  BoloGeladoSlice & AdditionalSlice;

export const useProductsStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createFlavorSlice(...a),
      ...createRibbonSlice(...a),
      ...createPackageSlice(...a),
      ...createConfigSlice(...a),
      ...createBoloGeladoSlice(...a),
      ...createAdditionalSlice(...a),
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

  // Add bolo gelado update method
  if (!store.updateBoloGeladoFlavor) {
    useProductsStore.setState({
      updateBoloGeladoFlavor: (id, data) => useProductsStore.setState((state) => ({
        boloGeladoFlavors: state.boloGeladoFlavors.map(bg => bg.id === id ? { ...bg, ...data } : bg)
      }))
    });
  }

  // Add additional update method
  if (!store.updateAdditional) {
    useProductsStore.setState({
      updateAdditional: (id, data) => useProductsStore.setState((state) => ({
        additionals: state.additionals.map(a => a.id === id ? { ...a, ...data } : a)
      }))
    });
  }
};

// Initialize the store with update methods
createStoreWithUpdates();
