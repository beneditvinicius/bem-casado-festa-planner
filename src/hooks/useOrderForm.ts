
import { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { FormData, UseOrderFormReturn, ProductType } from './orderForm/types';
import { useCepSearch } from './orderForm/useCepSearch';
import { useFlavorManagement } from './orderForm/useFlavorManagement';
import { useFormValidation } from './orderForm/useFormValidation';
import { useFormHandlers } from './orderForm/useFormHandlers';
import { useFormSubmission } from './orderForm/useFormSubmission';
import { useBoloGeladoManagement } from './orderForm/useBoloGeladoManagement';
import { useProductTypeManagement } from './orderForm/useProductTypeManagement';
import { useAdditionalSelectionManagement } from './orderForm/useAdditionalSelectionManagement';
import { useTotalCalculator } from './orderForm/useTotalCalculator';

export { type FlavorSelection } from './orderForm/types';
export { type FormData } from './orderForm/types';
export { type ProductType } from './orderForm/types';
export { type AdditionalSelection } from './orderForm/types';

export function useOrderForm(): UseOrderFormReturn & { setFormData: React.Dispatch<React.SetStateAction<FormData>> } {
  const { toast } = useToast();
  const flavors = useProductsStore((state) => state.flavors);
  const boloGeladoFlavors = useProductsStore((state) => state.boloGeladoFlavors);
  const ribbonColors = useProductsStore((state) => state.ribbonColors);
  const packageColors = useProductsStore((state) => state.packageColors);
  const additionals = useProductsStore((state) => state.additionals);
  const whatsappNumber = useProductsStore((state) => state.whatsappNumber);

  // Initialize form data
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
    eventType: 'Casamento',
    productType: 'bem-casado',
    ribbonId: ribbonColors[0]?.id || '',
    packageId: packageColors[0]?.id || '',
    observations: ''
  });

  // Use our specialized hooks
  const { productType, handleProductTypeChange } = useProductTypeManagement(formData.productType);
  
  const { flavorSelections, handleAddFlavor, handleRemoveFlavor, 
          handleFlavorChange, handleFlavorQuantityChange } = 
    useFlavorManagement(flavors);

  const { boloGeladoSelections, handleAddBoloGeladoFlavor, handleRemoveBoloGeladoFlavor,
          handleBoloGeladoFlavorChange, handleBoloGeladoQuantityChange } = 
    useBoloGeladoManagement(boloGeladoFlavors);
  
  const { additionalSelections, handleAdditionalChange } =
    useAdditionalSelectionManagement(additionals);

  const { calculateTotal } = useTotalCalculator();
  
  const { errors, validateForm } = useFormValidation(formData, flavorSelections, boloGeladoSelections);
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
    boloGeladoSelections,
    additionalSelections,
    flavors,
    boloGeladoFlavors,
    ribbonColors,
    packageColors,
    additionals,
    whatsappNumber,
    validateForm
  });

  // Calculate total value for the order
  const calculateTotalValue = () => {
    return calculateTotal(
      formData.productType,
      flavorSelections,
      boloGeladoSelections,
      additionalSelections,
      flavors,
      boloGeladoFlavors,
      additionals
    );
  };

  // Update product type in form data when changed
  const handleProductTypeChangeWrapper = (type: ProductType) => {
    handleProductTypeChange(type);
    setFormData({...formData, productType: type});
  };

  return {
    formData,
    setFormData,
    errors,
    flavors,
    boloGeladoFlavors,
    ribbonColors,
    packageColors,
    additionals,
    flavorSelections,
    boloGeladoSelections,
    additionalSelections,
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
    handleAddBoloGeladoFlavor,
    handleRemoveBoloGeladoFlavor,
    handleBoloGeladoFlavorChange,
    handleBoloGeladoQuantityChange,
    handleAdditionalChange,
    handleProductTypeChange: handleProductTypeChangeWrapper,
    calculateTotal: calculateTotalValue,
    searchCep
  };
}
