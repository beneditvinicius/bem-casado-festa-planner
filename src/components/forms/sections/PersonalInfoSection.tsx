
import React from 'react';
import PersonalInfoForm from '../PersonalInfoForm';
import EventInfoForm from '../EventInfoForm';
import { ObservationsInput } from '../order-details/ObservationsInput';
import { FormData } from '@/hooks/useOrderForm';

interface PersonalInfoSectionProps {
  formData: FormData;
  errors: { [key: string]: string };
  isLoadingCep: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  searchCep: (cep: string) => Promise<void>;
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
    <div className="space-y-6">
      <div className="text-center my-6">
        <p className="text-lg font-medium text-[#eb6824]">Achou interessante? Preencha seus dados para receber o orçamento completo!</p>
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
