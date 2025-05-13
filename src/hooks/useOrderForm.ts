
import { useState } from 'react';
import { formatCPF, formatPhone, formatCEP } from '@/utils/formatter.tsx';
import { useProductsStore } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { useCepSearch } from './orderForm/useCepSearch';
import { useFlavorManagement } from './orderForm/useFlavorManagement';
import { useFormValidation } from './orderForm/useFormValidation';
import { createWhatsAppMessage } from './orderForm/useWhatsAppMessageCreator';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData({ ...formData, [name]: formatCPF(value) });
    } else if (name === 'phone') {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else if (name === 'cep') {
      setFormData({ ...formData, [name]: formatCEP(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({ ...formData, eventDate: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const whatsappUrl = createWhatsAppMessage(
        formData, 
        flavorSelections, 
        flavors, 
        ribbonColors, 
        packageColors, 
        whatsappNumber
      );
      
      // Show success message
      toast({
        title: "Orçamento gerado com sucesso!",
        description: "Você será redirecionado para o WhatsApp.",
      });
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleReset = () => {
    setFormData({
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
    
    // Reset flavor selections
    handleRemoveFlavor('all-except-first');
    
    toast({
      title: "Formulário reiniciado",
      description: "Os dados foram limpos."
    });
  };

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
