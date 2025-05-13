
import { useState } from 'react';
import { isBefore } from "date-fns";
import { formatCPF, formatPhone, formatCEP } from '@/utils/formatter.tsx';
import { useProductsStore, Flavor, RibbonColor, PackageColor } from '@/data/products';
import { useToast } from "@/hooks/use-toast";

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

interface UseOrderFormReturn {
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

  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([
    { id: '1', flavorId: flavors[0]?.id || '', quantity: 20 }
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false);

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

  const handleFlavorChange = (id: string, flavorId: string) => {
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, flavorId } : item
    ));
  };

  const handleFlavorQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    
    if (isNaN(quantity) || quantity === 0) {
      setFlavorSelections(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: 0 } : item
      ));
      return;
    }
    
    if (quantity < 20) {
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades.",
      });
      setFlavorSelections(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: 20 } : item
      ));
      return;
    }
    
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleAddFlavor = () => {
    const newId = String(Date.now());
    setFlavorSelections(prev => [...prev, { 
      id: newId, 
      flavorId: flavors[0]?.id || '', 
      quantity: 20 
    }]);
  };

  const handleRemoveFlavor = (id: string) => {
    if (flavorSelections.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa ter pelo menos um sabor selecionado.",
      });
      return;
    }
    
    setFlavorSelections(prev => prev.filter(item => item.id !== id));
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
    flavorSelections.forEach((selection, index) => {
      if (!selection.flavorId) {
        newErrors[`flavor-${selection.id}`] = 'Selecione um sabor';
      }
      
      if (!selection.quantity || selection.quantity < 20) {
        newErrors[`quantity-${selection.id}`] = 'A quantidade mínima é de 20 unidades';
      } else {
        totalQuantity += selection.quantity;
      }
    });
    
    if (totalQuantity === 0) {
      newErrors.quantity = 'A quantidade total deve ser de pelo menos 20 unidades';
    }
    
    // Validate colors
    if (!formData.ribbonId) newErrors.ribbonId = 'Selecione a cor da fita';
    if (!formData.packageId) newErrors.packageId = 'Selecione a cor da embalagem';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Calculate total quantity
      const totalQuantity = flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      // Find selected items
      const selectedRibbon = ribbonColors.find(r => r.id === formData.ribbonId);
      const selectedPackage = packageColors.find(p => p.id === formData.packageId);
      
      // Build flavors details
      const flavorDetails = flavorSelections
        .filter(selection => selection.quantity > 0)
        .map(selection => {
          const flavor = flavors.find(f => f.id === selection.flavorId);
          return `- ${selection.quantity} unidades de ${flavor?.name || ''} (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(flavor?.price || 0)}/un)`;
        })
        .join('\n');
      
      // Calculate total price
      let totalPrice = 0;
      flavorSelections.forEach(selection => {
        const flavor = flavors.find(f => f.id === selection.flavorId);
        if (flavor && selection.quantity > 0) {
          totalPrice += flavor.price * selection.quantity;
        }
      });
      
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
Quantidade Total: ${totalQuantity} unidades
${flavorDetails}

Cor da Fita: ${selectedRibbon?.name || ''} ${selectedRibbon?.code || ''}
Cor da Embalagem: ${selectedPackage?.name || ''} ${selectedPackage?.code || ''}

Valor Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
${formData.observations ? `\nObservações: ${formData.observations}` : ''}

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
      state: 'MT',
      eventDate: undefined,
      eventLocation: '',
      ribbonId: ribbonColors[0]?.id || '',
      packageId: packageColors[0]?.id || '',
      observations: ''
    });
    
    setFlavorSelections([
      { id: '1', flavorId: flavors[0]?.id || '', quantity: 20 }
    ]);
    
    setErrors({});
    toast({
      title: "Formulário reiniciado",
      description: "Os dados foram limpos."
    });
  };

  const calculateTotal = (): string => {
    let total = 0;
    
    flavorSelections.forEach(selection => {
      const flavor = flavors.find(f => f.id === selection.flavorId);
      if (flavor && selection.quantity > 0) {
        total += flavor.price * selection.quantity;
      }
    });
    
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
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
    calculateTotal,
    searchCep
  };
}
