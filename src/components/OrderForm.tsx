
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import PersonalInfoForm from './forms/PersonalInfoForm';
import EventInfoForm from './forms/EventInfoForm';
import OrderDetailsForm from './forms/OrderDetailsForm';
import { useOrderForm } from '@/hooks/useOrderForm';
import { useIsMobile } from '@/hooks/use-mobile';

const OrderForm: React.FC = () => {
  const {
    formData,
    errors,
    flavors,
    ribbonColors,
    packageColors,
    flavorSelections,
    isLoadingCep,
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleAddFlavor,
    handleRemoveFlavor,
    handleFlavorChange,
    handleFlavorQuantityChange,
    handleSubmit,
    handleReset,
    calculateTotal,
    searchCep
  } = useOrderForm();
  const isMobile = useIsMobile();
  
  return (
    <Card className="w-full rounded-3xl" id="orcamento">
      <CardContent className="pt-6 card-content">
        <p className="text-center text-sm sm:text-base mb-4">Agora que já sabe qual será o seu orçamento, preencha seus dados para recebermos tudo prontinho no nosso WhatsApp para lançarmos seu pedido!</p>
        <p className="text-xs text-gray-500 mb-4 text-center">Seus dados estão seguros! Usamos essas informações apenas para o lançamento no sistema.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
                flavorSelections={flavorSelections} 
                handleInputChange={handleInputChange} 
                handleSelectChange={handleSelectChange} 
                handleAddFlavor={handleAddFlavor} 
                handleRemoveFlavor={handleRemoveFlavor} 
                handleFlavorChange={handleFlavorChange} 
                handleFlavorQuantityChange={handleFlavorQuantityChange} 
                calculateTotal={calculateTotal} 
              />
            </div>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-center gap-4'} pt-4`}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset} 
              className={`h-12 rounded-full ${isMobile ? 'w-full' : 'px-6'}`}
            >
              Limpar Tudo
            </Button>
            <Button 
              type="submit" 
              className={`h-12 rounded-full bg-[#eb6824] hover:bg-[#d25618] text-white ${isMobile ? 'w-full' : 'px-6'}`}
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
