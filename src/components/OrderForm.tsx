
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import PersonalInfoForm from './forms/PersonalInfoForm';
import EventInfoForm from './forms/EventInfoForm';
import OrderDetailsForm from './forms/OrderDetailsForm';
import { useOrderForm } from '@/hooks/useOrderForm';

const OrderForm: React.FC = () => {
  const {
    formData,
    errors,
    flavors,
    ribbonColors,
    packageColors,
    isLoadingCep,
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    handleReset,
    calculateTotal,
    searchCep
  } = useOrderForm();

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            
            {/* Informações do Evento e Pedido */}
            <div className="space-y-6">
              <EventInfoForm
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
              />
              
              <OrderDetailsForm
                formData={formData}
                errors={errors}
                flavors={flavors}
                ribbonColors={ribbonColors}
                packageColors={packageColors}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                calculateTotal={calculateTotal}
              />
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
              <MessageSquare className="mr-2 h-4 w-4" />
              Enviar Orçamento via WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
