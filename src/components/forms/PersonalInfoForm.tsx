
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { formatCPF, formatPhone, formatCEP } from '@/utils/formatter';
import { cn } from '@/lib/utils';

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
  searchCep: () => void;
}

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

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  errors,
  isLoadingCep,
  handleInputChange,
  handleSelectChange,
  searchCep
}) => {
  return (
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
        <div className="flex space-x-2">
          <Input
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleInputChange}
            placeholder="00000-000"
            maxLength={9}
            className={cn("h-12 flex-1", errors.cep && "border-red-500")}
          />
          <Button 
            type="button" 
            onClick={searchCep} 
            disabled={isLoadingCep || formData.cep.length < 8}
            className="h-12 w-12 px-0"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
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
          <select 
            id="state"
            name="state"
            value={formData.state}
            onChange={(e) => handleSelectChange('state', e.target.value)}
            className={cn(
              "h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              errors.state && "border-red-500"
            )}
          >
            {brazilianStates.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
