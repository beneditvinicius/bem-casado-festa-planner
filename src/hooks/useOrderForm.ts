
import { useState } from 'react';
import { formatCPF, formatPhone, formatCEP } from '@/utils/formatter.tsx';
import { useProductsStore } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { useCepSearch } from './orderForm/useCepSearch';
import { useFlavorManagement } from './orderForm/useFlavorManagement';
import { useFormValidation } from './orderForm/useFormValidation';
import { useFormHandlers } from './orderForm/useFormHandlers';
import { useFormSubmission } from './orderForm/useFormSubmission';
import { FormData, UseOrderFormReturn, AdditionalSelection, ProductType } from './orderForm/types';

export { type FlavorSelection } from './orderForm/types';
export { type FormData } from './orderForm/types';
export { type ProductType } from './orderForm/types';

export function useOrderForm(): UseOrderFormReturn {
  const { toast } = useToast();
  const flavors = useProductsStore((state) => state.flavors);
  const boloGeladoFlavors = useProductsStore((state) => state.boloGeladoFlavors);
  const ribbonColors = useProductsStore((state) => state.ribbonColors);
  const packageColors = useProductsStore((state) => state.packageColors);
  const additionals = useProductsStore((state) => state.additionals);
  const whatsappNumber = useProductsStore((state) => state.whatsappNumber);

  // Initialize additionals selections
  const initialAdditionalSelections = additionals.map(additional => ({
    id: additional.id,
    selected: false
  }));

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

  const [additionalSelections, setAdditionalSelections] = useState<AdditionalSelection[]>(initialAdditionalSelections);

  const { flavorSelections, handleAddFlavor, handleRemoveFlavor, 
          handleFlavorChange, handleFlavorQuantityChange, calculateTotal } = 
    useFlavorManagement(flavors);

  // Management for bolo gelado flavors
  const [boloGeladoSelections, setBoloGeladoSelections] = useState([{
    id: uuidv4(),
    flavorId: boloGeladoFlavors[0]?.id || '',
    quantity: 0
  }]);

  const handleAddBoloGeladoFlavor = () => {
    const newSelection = {
      id: uuidv4(),
      flavorId: boloGeladoFlavors[0]?.id || '',
      quantity: 0
    };
    setBoloGeladoSelections([...boloGeladoSelections, newSelection]);
  };

  const handleRemoveBoloGeladoFlavor = (id: string) => {
    if (boloGeladoSelections.length > 1) {
      setBoloGeladoSelections(boloGeladoSelections.filter(selection => selection.id !== id));
    }
  };

  const handleBoloGeladoFlavorChange = (id: string, flavorId: string) => {
    setBoloGeladoSelections(
      boloGeladoSelections.map(selection => 
        selection.id === id ? { ...selection, flavorId } : selection
      )
    );
  };

  const handleBoloGeladoQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    setBoloGeladoSelections(
      boloGeladoSelections.map(selection => 
        selection.id === id ? { ...selection, quantity: isNaN(quantity) ? 0 : quantity } : selection
      )
    );
  };

  const handleProductTypeChange = (type: ProductType) => {
    setFormData({...formData, productType: type});
  };

  const handleAdditionalChange = (id: string, selected: boolean) => {
    setAdditionalSelections(prev => 
      prev.map(selection => 
        selection.id === id ? { ...selection, selected } : selection
      )
    );
  };

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

  // Calculate total based on product type
  const calculateTotalValue = () => {
    let total = 0;
    
    if (formData.productType === 'bem-casado') {
      // Calculate bem-casado price
      flavorSelections.forEach(selection => {
        const flavor = flavors.find(f => f.id === selection.flavorId);
        if (flavor && selection.quantity >= 20) {
          // Add base price
          let unitPrice = flavor.price;
          
          // Add additionals price
          additionalSelections.forEach(addSelection => {
            if (addSelection.selected) {
              const additional = additionals.find(a => a.id === addSelection.id);
              if (additional) {
                unitPrice += additional.price;
              }
            }
          });
          
          total += unitPrice * selection.quantity;
        }
      });
    } else {
      // Calculate bolo gelado price
      boloGeladoSelections.forEach(selection => {
        const flavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
        if (flavor && selection.quantity >= 20) {
          total += flavor.price * selection.quantity;
        }
      });
    }
    
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  };

  return {
    formData,
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
    handleProductTypeChange,
    calculateTotal: calculateTotalValue,
    searchCep
  };
}
