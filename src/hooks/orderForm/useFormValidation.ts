
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
    
    // Personal info validation
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    
    // Address validation
    if (!formData.cep) newErrors.cep = 'CEP é obrigatório';
    if (!formData.street) newErrors.street = 'Rua é obrigatório';
    if (!formData.number) newErrors.number = 'Número é obrigatório';
    if (!formData.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state) newErrors.state = 'Estado é obrigatório';
    
    // Event validation
    if (!formData.eventDate) newErrors.eventDate = 'Data do evento é obrigatória';
    if (!formData.eventType) newErrors.eventType = 'Tipo de evento é obrigatório';
    
    // Product type specific validations
    const currentSelections = formData.productType === 'bem-casado' 
      ? flavorSelections 
      : boloGeladoSelections;

    // Order validation
    let totalQuantity = 0;
    let hasValidFlavor = false;
    
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
    return Object.keys(newErrors).length === 0;
  };
  
  return {
    errors,
    validateForm
  };
};
