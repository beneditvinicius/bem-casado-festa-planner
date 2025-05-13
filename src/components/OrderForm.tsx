
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

  return (
    <Card className="w-full" id="orcamento">
      <CardContent className="pt-6">
        <p className="text-center text-lg mb-4">
          Agora que já sabe qual será o seu orçamento, preencha seus dados para recebermos tudo prontinho no nosso WhatsApp e iniciarmos o seu contrato.
        </p>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Seus dados estão seguros! Usamos essas informações apenas para a criação do contrato.
        </p>
        
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
              className="h-12 bg-[#eb6824] hover:bg-[#d25618] text-white"
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
