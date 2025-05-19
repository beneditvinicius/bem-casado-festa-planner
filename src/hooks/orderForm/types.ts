
export type ProductType = 'bem-casado' | 'bolo-gelado';

export interface EventType {
  value: string;
  label: string;
}

export interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number | null;
  productType: ProductType;
}

export interface AdditionalSelection {
  id: string;
  selected: boolean;
}

export interface FormData {
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  eventDate: Date | undefined;
  eventLocation: string;
  eventType: string;
  productType: ProductType;
  ribbonId: string;
  packageId: string;
  observations: string;
}

export interface UseOrderFormReturn {
  formData: FormData;
  errors: { [key: string]: string };
  flavors: Flavor[];
  boloGeladoFlavors: BoloGeladoFlavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  additionals: Additional[];
  flavorSelections: FlavorSelection[];
  boloGeladoSelections: FlavorSelection[];
  additionalSelections: AdditionalSelection[];
  whatsappNumber: string;
  isLoadingCep: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: () => void;
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleFlavorQuantityChange: (id: string, value: string) => void;
  handleItemProductTypeChange: (id: string, type: ProductType) => void;
  handleAddBoloGeladoFlavor: () => void;
  handleRemoveBoloGeladoFlavor: (id: string) => void;
  handleBoloGeladoFlavorChange: (id: string, flavorId: string) => void;
  handleBoloGeladoQuantityChange: (id: string, value: string) => void;
  handleAdditionalChange: (id: string, selected: boolean) => void;
  handleProductTypeChange: (type: ProductType) => void;
  calculateTotal: () => string;
  searchCep: () => void;
}

import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/types';
