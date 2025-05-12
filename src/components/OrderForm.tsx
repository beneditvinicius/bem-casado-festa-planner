
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Send } from "lucide-react";
import { cn } from '@/lib/utils';
import { formatCPF, formatPhone } from '@/utils/formatter';
import { useProductsStore } from '@/data/products';
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  address: string;
  eventDate: Date | undefined;
  eventLocation: string;
  quantity: number;
  flavorId: string;
  ribbonId: string;
  packageId: string;
}

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
    address: '',
    eventDate: undefined,
    eventLocation: '',
    quantity: 100,
    flavorId: flavors[0]?.id || '',
    ribbonId: ribbonColors[0]?.id || '',
    packageId: packageColors[0]?.id || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData({ ...formData, [name]: formatCPF(value) });
    } else if (name === 'phone') {
      setFormData({ ...formData, [name]: formatPhone(value) });
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
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.eventDate) newErrors.eventDate = 'Data do evento é obrigatória';
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
*Novo Orçamento de Bem-Casados*

*Dados Pessoais:*
Nome: ${formData.name}
CPF: ${formData.cpf}
Telefone: ${formData.phone}
Endereço: ${formData.address}

*Dados do Evento:*
Data: ${formData.eventDate ? format(formData.eventDate, 'dd/MM/yyyy', { locale: ptBR }) : ''}
Local: ${formData.eventLocation}

*Pedido:*
Quantidade: ${formData.quantity} unidades
Sabor: ${selectedFlavor?.name || ''}
Cor da fita: ${selectedRibbon?.name || ''}
Cor da embalagem: ${selectedPackage?.name || ''}

*Total:* ${selectedFlavor ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedFlavor.price * formData.quantity) : ''}
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
      address: '',
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
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-lg">Nome</Label>
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
                <Label htmlFor="cpf" className="text-lg">CPF</Label>
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
                <Label htmlFor="phone" className="text-lg">Telefone</Label>
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
              
              <div>
                <Label htmlFor="address" className="text-lg">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={cn("h-12", errors.address && "border-red-500")}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
            
            {/* Event and Order Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventDate" className="text-lg">Data do Evento</Label>
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
                    />
                  </PopoverContent>
                </Popover>
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
              </div>
              
              <div>
                <Label htmlFor="eventLocation" className="text-lg">Local do Evento</Label>
                <Input
                  id="eventLocation"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  className={cn("h-12", errors.eventLocation && "border-red-500")}
                />
                {errors.eventLocation && <p className="text-red-500 text-sm mt-1">{errors.eventLocation}</p>}
              </div>
              
              <div>
                <Label htmlFor="quantity" className="text-lg">Quantidade</Label>
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
                <Label htmlFor="flavor" className="text-lg">Sabor</Label>
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
                        {flavor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.flavorId && <p className="text-red-500 text-sm mt-1">{errors.flavorId}</p>}
              </div>
              
              <div>
                <Label htmlFor="ribbonColor" className="text-lg">Cor da Fita</Label>
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
                            style={{ backgroundColor: color.color }}
                          />
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ribbonId && <p className="text-red-500 text-sm mt-1">{errors.ribbonId}</p>}
              </div>
              
              <div>
                <Label htmlFor="packageColor" className="text-lg">Cor da Embalagem</Label>
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
                            style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none' }}
                          />
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
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
              <Send className="mr-2 h-4 w-4" />
              Enviar Orçamento via WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
