
import { FormData, FlavorSelection } from './types';
import { useToast } from "@/hooks/use-toast";

interface UseFormHandlersProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleRemoveFlavor: (id: string) => void;
}

interface UseFormHandlersReturn {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleReset: () => void;
}

export const useFormHandlers = ({
  formData,
  setFormData,
  handleRemoveFlavor
}: UseFormHandlersProps): UseFormHandlersReturn => {
  const { toast } = useToast();
  
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
      eventLocation: '', // Added this missing field
      eventType: 'Casamento',
      productType: 'bem-casado',
      ribbonId: '',
      packageId: '',
      observations: ''
    });
    
    // Reset flavor selections
    handleRemoveFlavor('all-except-first');
    
    toast({
      title: "Formulário reiniciado",
      description: "Os dados foram limpos."
    });
  };
  
  // Helper functions for formatting (imported from utils in the main hook)
  const formatCPF = (value: string) => {
    // Remove non-numeric characters
    let cpf = value.replace(/\D/g, '');
    
    // Apply CPF format
    if (cpf.length > 0) {
      cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
      
      // Limit to 14 chars (999.999.999-99)
      cpf = cpf.slice(0, 14);
    }
    
    return cpf;
  };

  const formatPhone = (value: string) => {
    // Remove non-numeric characters
    let phone = value.replace(/\D/g, '');
    
    // Apply phone format
    if (phone.length > 0) {
      phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
      phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
      
      // Limit to 15 chars ((99) 99999-9999)
      phone = phone.slice(0, 15);
    }
    
    return phone;
  };

  const formatCEP = (value: string) => {
    // Remove non-numeric characters
    let cep = value.replace(/\D/g, '');
    
    // Apply CEP format
    if (cep.length > 5) {
      cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
      
      // Limit to 9 chars (99999-999)
      cep = cep.slice(0, 9);
    }
    
    return cep;
  };

  return {
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleReset
  };
};
