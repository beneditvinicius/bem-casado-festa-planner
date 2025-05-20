
import { useState, useEffect } from 'react';
import { FormData, FlavorSelection } from './types';

export const useFormValidation = (
  formData: FormData, 
  flavorSelections: FlavorSelection[],
  boloGeladoSelections: FlavorSelection[]
) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Validate form fields whenever they change
  useEffect(() => {
    validateForm();
  }, [formData, flavorSelections, boloGeladoSelections]);
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // We're not showing these errors in the UI anymore, but we still validate them
    // for form submission purposes
    
    // Order validation
    let totalQuantity = 0;
    let hasValidFlavor = false;
    
    const currentSelections = formData.productType === 'bem-casado' 
      ? flavorSelections 
      : boloGeladoSelections;

    currentSelections.forEach(selection => {
      if (selection.flavorId && selection.quantity) {
        totalQuantity += selection.quantity;
        hasValidFlavor = true;
      }
    });
    
    if (!hasValidFlavor) {
      newErrors.flavor = 'Selecione pelo menos um sabor';
    }
    
    if (totalQuantity < 20) {
      newErrors.quantity = 'O pedido mínimo é de 20 unidades';
    }
    
    if (formData.productType === 'bem-casado') {
      if (!formData.ribbonId) newErrors.ribbonId = 'Selecione uma fita';
      if (!formData.packageId) newErrors.packageId = 'Selecione uma embalagem';
    }
    
    setErrors(newErrors);
    
    // For validation purposes, we still need to check all fields
    const isValidForSubmission = 
      !!formData.name &&
      !!formData.phone &&
      !!formData.cpf &&
      !!formData.cep &&
      !!formData.street &&
      !!formData.number &&
      !!formData.neighborhood &&
      !!formData.city &&
      !!formData.state &&
      !!formData.eventDate &&
      !!formData.eventType &&
      hasValidFlavor &&
      totalQuantity >= 20 &&
      (formData.productType !== 'bem-casado' || (!!formData.ribbonId && !!formData.packageId));
    
    return isValidForSubmission;
  };
  
  return {
    errors,
    validateForm
  };
};
