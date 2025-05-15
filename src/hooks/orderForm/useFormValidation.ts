
import { useState } from 'react';
import { isBefore } from "date-fns";
import { FormData, FlavorSelection } from './types';

interface UseFormValidationReturn {
  errors: { [key: string]: string };
  validateForm: () => boolean;
}

export const useFormValidation = (
  formData: FormData,
  flavorSelections: FlavorSelection[]
): UseFormValidationReturn => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate personal info
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.cpf.trim() || formData.cpf.length < 14) newErrors.cpf = 'CPF inválido';
    if (!formData.phone.trim() || formData.phone.length < 14) newErrors.phone = 'Telefone inválido';
    if (!formData.cep.trim() || formData.cep.length < 9) newErrors.cep = 'CEP inválido';
    if (!formData.street.trim()) newErrors.street = 'Rua é obrigatória';
    if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state) newErrors.state = 'Estado é obrigatório';
    
    // Validate event info
    if (!formData.eventDate) {
      newErrors.eventDate = 'Data do evento é obrigatória';
    } else if (isBefore(formData.eventDate, new Date())) {
      newErrors.eventDate = 'A data do evento não pode ser no passado';
    }
    if (!formData.eventLocation.trim()) newErrors.eventLocation = 'Local do evento é obrigatório';
    
    // Validate flavor selections
    let totalQuantity = 0;
    flavorSelections.forEach((selection) => {
      if (!selection.flavorId) {
        newErrors[`flavor-${selection.id}`] = 'Selecione um sabor';
      }
      
      if (!selection.quantity) {
        newErrors[`quantity-${selection.id}`] = 'Quantidade é obrigatória';
      } else if (selection.quantity < 20) {
        newErrors[`quantity-${selection.id}`] = 'A quantidade mínima é de 20 unidades';
      } else {
        totalQuantity += selection.quantity;
      }
    });
    
    // Check for minimum total quantity
    if (totalQuantity === 0) {
      newErrors.quantity = 'A quantidade total deve ser de pelo menos 20 unidades';
    } else if (totalQuantity < 20) {
      newErrors.quantity = 'O pedido mínimo é de 20 unidades';
    }
    
    // Validate colors
    if (!formData.ribbonId) newErrors.ribbonId = 'Selecione a cor da fita';
    if (!formData.packageId) newErrors.packageId = 'Selecione a cor da embalagem';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};
