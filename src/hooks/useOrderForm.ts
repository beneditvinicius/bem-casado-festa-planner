
import { useState } from 'react';
import { formatCPF, formatPhone, formatCEP } from '@/utils/formatter.tsx';
import { useProductsStore } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { useCepSearch } from './orderForm/useCepSearch';
import { useFlavorManagement } from './orderForm/useFlavorManagement';
import { useFormValidation } from './orderForm/useFormValidation';
import { useFormHandlers } from './orderForm/useFormHandlers';
import { useFormSubmission } from './orderForm/useFormSubmission';
import { FormData, UseOrderFormReturn } from './orderForm/types';

export { type FlavorSelection } from './orderForm/types';
export { type FormData } from './orderForm/types';

export function useOrderForm(): UseOrderFormReturn {
  const { toast } = useToast();
  const flavors = useProductsStore((state) => state.flavors);
  const ribbonColors = useProductsStore((state) => state.ribbonColors);
  const packageColors = useProductsStore((state) => state.packageColors);
  const whatsappNumber = useProductsStore((state) => state.whatsappNumber);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: 'MT',
    eventDate: undefined,
    eventLocation: '',
    ribbonId: ribbonColors[0]?.id || '',
    packageId: packageColors[0]?.id || '',
    observations: ''
  });

  const { flavorSelections, handleAddFlavor, handleRemoveFlavor, 
          handleFlavorChange, handleFlavorQuantityChange, calculateTotal } = 
    useFlavorManagement(flavors);

  const { errors, validateForm } = useFormValidation(formData, flavorSelections);
  const { isLoadingCep, searchCep } = useCepSearch(formData, setFormData);
  
  const { handleInputChange, handleSelectChange, handleDateChange, handleReset } = 
    useFormHandlers({
      formData,
      setFormData,
      handleRemoveFlavor
    });
    
  const { handleSubmit } = useFormSubmission({
    formData,
    flavorSelections,
    flavors,
    ribbonColors,
    packageColors,
    whatsappNumber,
    validateForm
  });

  return {
    formData,
    errors,
    flavors,
    ribbonColors,
    packageColors,
    flavorSelections,
    whatsappNumber,
    isLoadingCep,
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    handleReset,
    handleAddFlavor,
    handleRemoveFlavor,
    handleFlavorChange,
    handleFlavorQuantityChange,
    calculateTotal: () => calculateTotal(flavors),
    searchCep
  };
}
