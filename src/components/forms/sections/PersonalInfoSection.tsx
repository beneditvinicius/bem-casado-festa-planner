
import React from 'react';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import EventInfoForm from '@/components/forms/EventInfoForm';
import { ObservationsInput } from '@/components/forms/order-details/ObservationsInput';

interface PersonalInfoSectionProps {
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
    eventDate: Date | undefined;
    eventLocation: string;
    eventType: string;
    observations: string;
  };
  errors: { [key: string]: string };
  isLoadingCep: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  searchCep: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  isLoadingCep,
  handleInputChange,
  handleSelectChange,
  handleDateChange,
  searchCep
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mt-4 mb-4">
        <p className="text-[#eb6824] font-medium text-base">
          Gostou do orçamento? Preencha o restante do formulário e nos mande seu pedido completo!
        </p>
      </div>
      
      <PersonalInfoForm
        formData={formData}
        errors={errors}
        isLoadingCep={isLoadingCep}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        searchCep={searchCep}
      />
      
      <EventInfoForm
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleDateChange={handleDateChange}
      />
      
      <ObservationsInput 
        observations={formData.observations}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default PersonalInfoSection;
