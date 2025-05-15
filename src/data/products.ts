
import { useProductsStore } from './store';
export { useProductsStore };

// Re-export types
export type { 
  Flavor, 
  RibbonColor, 
  PackageColor, 
  Combination 
} from './types';

// Define the store interface
export interface ProductsStore {
  // Flavor operations
  flavors: Flavor[];
  addFlavor: (f: Flavor) => void;
  updateFlavor: (id: string, data: Partial<Flavor>) => void;
  removeFlavor: (id: string) => void;
  
  // Ribbon operations
  ribbonColors: RibbonColor[];
  addRibbonColor: (r: RibbonColor) => void;
  updateRibbonColor: (id: string, data: Partial<RibbonColor>) => void;
  removeRibbonColor: (id: string) => void;
  
  // Package operations
  packageColors: PackageColor[];
  addPackageColor: (p: PackageColor) => void;
  updatePackageColor: (id: string, data: Partial<PackageColor>) => void;
  removePackageColor: (id: string) => void;
  
  // Combination operations
  combinations: Combination[];
  addCombination: (c: Combination) => void;
  removeCombination: (ribbonId: string, packageId: string) => void;
  
  // Config operations
  whatsappNumber: string;
  setWhatsappNumber: (number: string) => void;
}
