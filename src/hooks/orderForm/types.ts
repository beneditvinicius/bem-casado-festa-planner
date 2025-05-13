
import { Flavor, RibbonColor, PackageColor } from '@/data/products';

export interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number;
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
  ribbonId: string;
  packageId: string;
  observations: string;
}

export interface UseOrderFormReturn {
  formData: FormData;
  errors: { [key: string]: string };
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  flavorSelections: FlavorSelection[];
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
  calculateTotal: () => string;
  searchCep: () => void;
}
