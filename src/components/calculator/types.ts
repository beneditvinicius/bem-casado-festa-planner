
import { Flavor } from '@/data/products';

export interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number;
}

export interface FlavorSelectorProps {
  selection: FlavorSelection;
  flavors: Flavor[];
  onFlavorChange: (id: string, flavorId: string) => void;
  onQuantityChange: (id: string, value: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  showRemoveButton: boolean;
}

export interface CalculatorTotalsProps {
  total: number;
  totalQuantity: number;
}
