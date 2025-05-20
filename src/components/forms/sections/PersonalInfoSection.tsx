
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
      <div className="w-full py-6 my-4">
        <div className="bg-bem-light rounded-2xl py-5 px-4 shadow-sm">
          <p className="font-semibold text-bem text-base sm:text-lg text-center">
            Achou interessante? Agora preencha seus dados e mande seu pedido para nosso WhatsApp.
          </p>
        </div>
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
