
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isBefore } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Send, Whatsapp } from "lucide-react";
import { cn } from '@/lib/utils';
import { formatCPF, formatPhone } from '@/utils/formatter';
import { useProductsStore } from '@/data/products';
import { useToast } from "@/hooks/use-toast";

interface FormData {
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

// Lista de estados brasileiros
const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const OrderForm: React.FC = () => {
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
    quantity: 100,
    flavorId: flavors[0]?.id || '',
    ribbonId: ribbonColors[0]?.id || '',
    packageId: packageColors[0]?.id || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatCEP = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData({ ...formData, [name]: formatCPF(value) });
    } else if (name === 'phone') {
      setFormData({ ...formData, [name]: formatPhone(value) });
    } else if (name === 'cep') {
      setFormData({ ...formData, [name]: formatCEP(value) });
    } else if (name === 'quantity') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
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
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantidade inválida';
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
Data: ${formData.eventDate ? format(formData.eventDate, 'dd/MM/yyyy', { locale: ptBR }) : ''}
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
      
      // Create WhatsApp URL
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
      quantity: 100,
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

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dados Pessoais</h3>
              
              <div>
                <Label htmlFor="name" className="text-base">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={cn("h-12", errors.name && "border-red-500")}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="cpf" className="text-base">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={cn("h-12", errors.cpf && "border-red-500")}
                />
                {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-base">Telefone/WhatsApp</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className={cn("h-12", errors.phone && "border-red-500")}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <h3 className="text-lg font-medium mt-6">Endereço Completo</h3>
              
              <div>
                <Label htmlFor="cep" className="text-base">CEP</Label>
                <Input
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  placeholder="00000-000"
                  maxLength={9}
                  className={cn("h-12", errors.cep && "border-red-500")}
                />
                {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
              </div>
              
              <div>
                <Label htmlFor="street" className="text-base">Rua/Avenida</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className={cn("h-12", errors.street && "border-red-500")}
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="number" className="text-base">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className={cn("h-12", errors.number && "border-red-500")}
                  />
                  {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                </div>
                
                <div>
                  <Label htmlFor="complement" className="text-base">Complemento</Label>
                  <Input
                    id="complement"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    placeholder="Opcional"
                    className="h-12"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="neighborhood" className="text-base">Bairro</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  className={cn("h-12", errors.neighborhood && "border-red-500")}
                />
                {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-base">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={cn("h-12", errors.city && "border-red-500")}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <Label htmlFor="state" className="text-base">Estado</Label>
                  <Select 
                    value={formData.state} 
                    onValueChange={(value) => handleSelectChange('state', value)}
                  >
                    <SelectTrigger id="state" className={cn("h-12", errors.state && "border-red-500")}>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {brazilianStates.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>
            
            {/* Informações do Evento e Pedido */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dados do Evento</h3>
              
              <div>
                <Label htmlFor="eventDate" className="text-base">Data do Evento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-12",
                        !formData.eventDate && "text-muted-foreground",
                        errors.eventDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.eventDate ? (
                        format(formData.eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.eventDate}
                      onSelect={handleDateChange}
                      initialFocus
                      locale={ptBR}
                      disabled={(date) => isBefore(date, new Date())}
                    />
                  </PopoverContent>
                </Popover>
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
              </div>
              
              <div>
                <Label htmlFor="eventLocation" className="text-base">Local do Evento</Label>
                <Input
                  id="eventLocation"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  className={cn("h-12", errors.eventLocation && "border-red-500")}
                />
                {errors.eventLocation && <p className="text-red-500 text-sm mt-1">{errors.eventLocation}</p>}
              </div>
              
              <h3 className="text-lg font-medium mt-6">Detalhes do Pedido</h3>
              
              <div>
                <Label htmlFor="quantity" className="text-base">Quantidade</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className={cn("h-12", errors.quantity && "border-red-500")}
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
              </div>
              
              <div>
                <Label htmlFor="flavor" className="text-base">Sabor</Label>
                <Select 
                  value={formData.flavorId} 
                  onValueChange={(value) => handleSelectChange('flavorId', value)}
                >
                  <SelectTrigger id="flavor" className={cn("h-12", errors.flavorId && "border-red-500")}>
                    <SelectValue placeholder="Selecione um sabor" />
                  </SelectTrigger>
                  <SelectContent>
                    {flavors.map((flavor) => (
                      <SelectItem key={flavor.id} value={flavor.id}>
                        {flavor.name} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(flavor.price)}/un
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.flavorId && <p className="text-red-500 text-sm mt-1">{errors.flavorId}</p>}
              </div>
              
              <div>
                <Label htmlFor="ribbonColor" className="text-base">Cor da Fita</Label>
                <Select 
                  value={formData.ribbonId} 
                  onValueChange={(value) => handleSelectChange('ribbonId', value)}
                >
                  <SelectTrigger id="ribbonColor" className={cn("h-12", errors.ribbonId && "border-red-500")}>
                    <SelectValue placeholder="Selecione a cor da fita" />
                  </SelectTrigger>
                  <SelectContent>
                    {ribbonColors.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none' }}
                          />
                          {color.name} - {color.code}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ribbonId && <p className="text-red-500 text-sm mt-1">{errors.ribbonId}</p>}
              </div>
              
              <div>
                <Label htmlFor="packageColor" className="text-base">Cor da Embalagem</Label>
                <Select 
                  value={formData.packageId} 
                  onValueChange={(value) => handleSelectChange('packageId', value)}
                >
                  <SelectTrigger id="packageColor" className={cn("h-12", errors.packageId && "border-red-500")}>
                    <SelectValue placeholder="Selecione a cor da embalagem" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageColors.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none' }}
                          />
                          {color.name} - {color.code}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
              </div>

              <div className="pt-4">
                {/* Valor total calculado */}
                <div className="bg-muted p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base">Valor Total (estimado):</span>
                    <span className="text-bem text-xl font-bold">
                      {formData.flavorId && formData.quantity 
                        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                            (flavors.find(f => f.id === formData.flavorId)?.price || 0) * formData.quantity
                          )
                        : 'R$ 0,00'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="h-12"
            >
              Limpar Tudo
            </Button>
            <Button 
              type="submit"
              className="h-12 bg-bem hover:bg-bem-dark text-white"
            >
              <Whatsapp className="mr-2 h-4 w-4" />
              Enviar Orçamento via WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
