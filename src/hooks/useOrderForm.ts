
import { useState } from 'react';
import { isBefore } from "date-fns";
import { formatCPF, formatPhone, formatCEP } from '@/utils/formatter';
import { useProductsStore, Flavor, RibbonColor, PackageColor } from '@/data/products';
import { useToast } from "@/hooks/use-toast";

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
  quantity: number;
  flavorId: string;
  ribbonId: string;
  packageId: string;
}

interface UseOrderFormReturn {
  formData: FormData;
  errors: { [key: string]: string };
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  whatsappNumber: string;
  isLoadingCep: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: () => void;
  calculateTotal: () => string;
  searchCep: () => void;
}

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
    state: 'SP',
    eventDate: undefined,
    eventLocation: '',
    quantity: 20,
    flavorId: flavors[0]?.id || '',
    ribbonId: ribbonColors[0]?.id || '',
    packageId: packageColors[0]?.id || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData({ ...formData, [name]: formatCPF(value) });
    } else if (name === 'phone') {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else if (name === 'cep') {
      setFormData({ ...formData, [name]: formatCEP(value) });
    } else if (name === 'quantity') {
      const newQuantity = parseInt(value) || 0;
      
      if (newQuantity < 20) {
        toast({
          title: "Quantidade mínima",
          description: "O pedido mínimo é de 20 unidades."
        });
        setFormData({ ...formData, [name]: 20 });
      } else {
        setFormData({ ...formData, [name]: newQuantity });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const searchCep = async () => {
    if (!formData.cep || formData.cep.length < 8) {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido para buscar o endereço.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoadingCep(true);
      const cleanCep = formData.cep.replace(/\D/g, '');
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive",
        });
        return;
      }

      setFormData({
        ...formData,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      });

      toast({
        title: "Endereço encontrado",
        description: "Os dados de endereço foram preenchidos automaticamente.",
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível buscar o endereço. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({ ...formData, eventDate: date });
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.cpf.trim() || formData.cpf.length < 14) newErrors.cpf = 'CPF inválido';
    if (!formData.phone.trim() || formData.phone.length < 14) newErrors.phone = 'Telefone inválido';
    if (!formData.cep.trim() || formData.cep.length < 9) newErrors.cep = 'CEP inválido';
    if (!formData.street.trim()) newErrors.street = 'Rua é obrigatória';
    if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state) newErrors.state = 'Estado é obrigatório';
    if (!formData.eventDate) {
      newErrors.eventDate = 'Data do evento é obrigatória';
    } else if (isBefore(formData.eventDate, new Date())) {
      newErrors.eventDate = 'A data do evento não pode ser no passado';
    }
    if (!formData.eventLocation.trim()) newErrors.eventLocation = 'Local do evento é obrigatório';
    if (!formData.quantity || formData.quantity < 20) newErrors.quantity = 'A quantidade mínima é de 20 unidades';
    if (!formData.flavorId) newErrors.flavorId = 'Selecione um sabor';
    if (!formData.ribbonId) newErrors.ribbonId = 'Selecione a cor da fita';
    if (!formData.packageId) newErrors.packageId = 'Selecione a cor da embalagem';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Find the selected items by their IDs
      const selectedFlavor = flavors.find(f => f.id === formData.flavorId);
      const selectedRibbon = ribbonColors.find(r => r.id === formData.ribbonId);
      const selectedPackage = packageColors.find(p => p.id === formData.packageId);
      
      // Build WhatsApp message
      const message = `
🎉 Novo Pedido de Orçamento (Site) 🎉

Cliente: ${formData.name}
CPF: ${formData.cpf}
Telefone: ${formData.phone}

Detalhes do Evento:
Data: ${formData.eventDate ? new Intl.DateTimeFormat('pt-BR').format(formData.eventDate) : ''}
Local: ${formData.eventLocation}

Endereço de Entrega:
${formData.street}, ${formData.number}${formData.complement ? `, ${formData.complement}` : ''}
${formData.neighborhood}, ${formData.city} - ${formData.state}
CEP: ${formData.cep}

Pedido de Bem-Casados:
Quantidade: ${formData.quantity} unidades
Sabor: ${selectedFlavor?.name || ''}
Cor da Fita: ${selectedRibbon?.name || ''} (${selectedRibbon?.code || ''})
Cor da Embalagem: ${selectedPackage?.name || ''} (${selectedPackage?.code || ''})

Valor Total: ${selectedFlavor ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedFlavor.price * formData.quantity) : ''}

Aguardando contato para finalização.
      `.trim();
      
      // Encode the message for WhatsApp
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp URL with the company number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
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
      state: 'SP',
      eventDate: undefined,
      eventLocation: '',
      quantity: 20,
      flavorId: flavors[0]?.id || '',
      ribbonId: ribbonColors[0]?.id || '',
      packageId: packageColors[0]?.id || '',
    });
    setErrors({});
    toast({
      title: "Formulário reiniciado",
      description: "Os dados foram limpos."
    });
  };

  const calculateTotal = (): string => {
    const selectedFlavor = flavors.find(f => f.id === formData.flavorId);
    if (selectedFlavor && formData.quantity) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedFlavor.price * formData.quantity);
    }
    return 'R$ 0,00';
  };

  return {
    formData,
    errors,
    flavors,
    ribbonColors,
    packageColors,
    whatsappNumber,
    isLoadingCep,
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    handleReset,
    calculateTotal,
    searchCep
  };
}
