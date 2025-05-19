
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface PersonalInfoFormProps {
  formData: {
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
  };
  errors: { [key: string]: string };
  isLoadingCep: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  searchCep: (cep: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  errors,
  isLoadingCep,
  handleInputChange,
  handleSelectChange,
  searchCep
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center mb-4">Informações Pessoais</h3>
      
      <div className="mb-4">
        <Label htmlFor="name" className="block text-gray-700 mb-1">
          Nome Completo *
        </Label>
        <Input 
          type="text" 
          id="name"
          name="name"
          placeholder="Digite seu nome completo" 
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpf" className="block text-gray-700 mb-1">
            CPF *
          </Label>
          <Input 
            type="text" 
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00" 
            value={formData.cpf}
            onChange={handleInputChange}
            className={`w-full rounded-lg ${errors.cpf ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.cpf && (
            <p className="text-sm text-red-500 mt-1">{errors.cpf}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone" className="block text-gray-700 mb-1">
            Telefone *
          </Label>
          <Input 
            type="text" 
            id="phone"
            name="phone"
            placeholder="(00) 00000-0000" 
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="cep" className="block text-gray-700 mb-1">
          CEP *
        </Label>
        <div className="relative">
          <Input 
            type="text" 
            id="cep"
            name="cep"
            placeholder="00000-000" 
            value={formData.cep}
            onChange={(e) => {
              handleInputChange(e);
              if (e.target.value.replace(/\D/g, '').length === 8) {
                searchCep(e.target.value);
              }
            }}
            className={`w-full rounded-lg ${errors.cep ? 'border-red-500' : 'border-gray-300'}`}
          />
          {isLoadingCep && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            </div>
          )}
        </div>
        {errors.cep && (
          <p className="text-sm text-red-500 mt-1">{errors.cep}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4">
        <div className="md:col-span-3">
          <Label htmlFor="street" className="block text-gray-700 mb-1">
            Rua *
          </Label>
          <Input 
            type="text" 
            id="street"
            name="street"
            placeholder="Nome da rua" 
            value={formData.street}
            onChange={handleInputChange}
            className={`w-full rounded-lg ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.street && (
            <p className="text-sm text-red-500 mt-1">{errors.street}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="number" className="block text-gray-700 mb-1">
            Número *
          </Label>
          <Input 
            type="text" 
            id="number"
            name="number"
            placeholder="Nº" 
            value={formData.number}
            onChange={handleInputChange}
            className={`w-full rounded-lg ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.number && (
            <p className="text-sm text-red-500 mt-1">{errors.number}</p>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="complement" className="block text-gray-700 mb-1">
          Complemento
        </Label>
        <Input 
          type="text" 
          id="complement"
          name="complement"
          placeholder="Apto, bloco, referência..." 
          value={formData.complement}
          onChange={handleInputChange}
          className="w-full rounded-lg border-gray-300"
        />
      </div>
      
      <div>
        <Label htmlFor="neighborhood" className="block text-gray-700 mb-1">
          Bairro *
        </Label>
        <Input 
          type="text" 
          id="neighborhood"
          name="neighborhood"
          placeholder="Nome do bairro" 
          value={formData.neighborhood}
          onChange={handleInputChange}
          className={`w-full rounded-lg ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.neighborhood && (
          <p className="text-sm text-red-500 mt-1">{errors.neighborhood}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="block text-gray-700 mb-1">
            Cidade *
          </Label>
          <Input 
            type="text" 
            id="city"
            name="city"
            placeholder="Nome da cidade" 
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="state" className="block text-gray-700 mb-1">
            Estado *
          </Label>
          <Select 
            value={formData.state}
            onValueChange={(value) => handleSelectChange('state', value)}
          >
            <SelectTrigger className={`w-full rounded-lg h-10 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}>
              <SelectValue placeholder="Selecione um estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AC">Acre</SelectItem>
              <SelectItem value="AL">Alagoas</SelectItem>
              <SelectItem value="AP">Amapá</SelectItem>
              <SelectItem value="AM">Amazonas</SelectItem>
              <SelectItem value="BA">Bahia</SelectItem>
              <SelectItem value="CE">Ceará</SelectItem>
              <SelectItem value="DF">Distrito Federal</SelectItem>
              <SelectItem value="ES">Espírito Santo</SelectItem>
              <SelectItem value="GO">Goiás</SelectItem>
              <SelectItem value="MA">Maranhão</SelectItem>
              <SelectItem value="MT">Mato Grosso</SelectItem>
              <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
              <SelectItem value="MG">Minas Gerais</SelectItem>
              <SelectItem value="PA">Pará</SelectItem>
              <SelectItem value="PB">Paraíba</SelectItem>
              <SelectItem value="PR">Paraná</SelectItem>
              <SelectItem value="PE">Pernambuco</SelectItem>
              <SelectItem value="PI">Piauí</SelectItem>
              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
              <SelectItem value="RN">Rio Grande do Norte</SelectItem>
              <SelectItem value="RS">Rio Grande do Sul</SelectItem>
              <SelectItem value="RO">Rondônia</SelectItem>
              <SelectItem value="RR">Roraima</SelectItem>
              <SelectItem value="SC">Santa Catarina</SelectItem>
              <SelectItem value="SP">São Paulo</SelectItem>
              <SelectItem value="SE">Sergipe</SelectItem>
              <SelectItem value="TO">Tocantins</SelectItem>
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
