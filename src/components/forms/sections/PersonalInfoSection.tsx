
import React from 'react';
import PersonalInfoForm from '../PersonalInfoForm';
import EventInfoForm from '../EventInfoForm';
import { FormData } from '@/hooks/orderForm/types';

interface PersonalInfoSectionProps {
  formData: FormData;
  errors: { [key: string]: string };
  isLoadingCep: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  searchCep: () => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  isLoadingCep,
  handleInputChange,
  handleSelectChange,
  handleDateChange,
  searchCep,
}) => {
  return (
    <>
      <div className="w-full text-center py-4 my-2">
        <p className="font-medium text-[#eb6824] text-sm">
          Achou interessante? Agora preencha seus dados e mande seu pedido para nosso WhatsApp.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Pessoais */}
        <PersonalInfoForm 
          formData={formData} 
          errors={errors} 
          isLoadingCep={isLoadingCep} 
          handleInputChange={handleInputChange} 
          handleSelectChange={handleSelectChange} 
          searchCep={searchCep} 
        />
        
        {/* Informações do Evento */}
        <EventInfoForm 
          formData={formData} 
          errors={errors} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </>
  );
};

export default PersonalInfoSection;
