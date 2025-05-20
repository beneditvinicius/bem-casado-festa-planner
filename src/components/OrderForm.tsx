
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import PersonalInfoForm from './forms/PersonalInfoForm';
import EventInfoForm from './forms/EventInfoForm';
import OrderDetailsForm from './forms/OrderDetailsForm';
import MiniVisualizer from './visualizer/MiniVisualizer';
import { useOrderForm } from '@/hooks/useOrderForm';
import { useIsMobile } from '@/hooks/use-mobile';

const OrderForm: React.FC = () => {
  const {
    formData,
    errors,
    flavors,
    boloGeladoFlavors,
    ribbonColors,
    packageColors,
    additionals,
    flavorSelections,
    boloGeladoSelections,
    additionalSelections,
    isLoadingCep,
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleAddFlavor,
    handleRemoveFlavor,
    handleFlavorChange,
    handleFlavorQuantityChange,
    handleAddBoloGeladoFlavor,
    handleRemoveBoloGeladoFlavor,
    handleBoloGeladoFlavorChange,
    handleBoloGeladoQuantityChange,
    handleAdditionalChange,
    handleProductTypeChange,
    handleSubmit,
    handleReset,
    calculateTotal,
    searchCep
  } = useOrderForm();
  const isMobile = useIsMobile();
  
  const handleScrollToVisualizer = () => {
    const visualizerElement = document.getElementById('visualizer');
    if (visualizerElement) {
      visualizerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <Card className="w-full rounded-3xl" id="pedido">
      <CardContent className="pt-6 card-content">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Details Section */}
          <OrderDetailsForm 
            formData={formData}
            errors={errors}
            flavors={flavors}
            boloGeladoFlavors={boloGeladoFlavors}
            ribbonColors={ribbonColors}
            packageColors={packageColors}
            additionals={additionals}
            flavorSelections={flavorSelections}
            boloGeladoSelections={boloGeladoSelections}
            additionalSelections={additionalSelections}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleProductTypeChange={handleProductTypeChange}
            handleAddFlavor={handleAddFlavor}
            handleRemoveFlavor={handleRemoveFlavor}
            handleFlavorChange={handleFlavorChange}
            handleFlavorQuantityChange={handleFlavorQuantityChange}
            handleAddBoloGeladoFlavor={handleAddBoloGeladoFlavor}
            handleRemoveBoloGeladoFlavor={handleRemoveBoloGeladoFlavor}
            handleBoloGeladoFlavorChange={handleBoloGeladoFlavorChange}
            handleBoloGeladoQuantityChange={handleBoloGeladoQuantityChange}
            handleAdditionalChange={handleAdditionalChange}
            calculateTotal={calculateTotal}
          />
          
          {/* Incentive Message */}
          <div className="w-full text-center bg-[#fef7cd] p-4 rounded-lg my-6">
            <p className="font-medium text-gray-800">
              Achou interessante? Agora preencha seus dados e mande seu pedido para nosso WhatsApp.
            </p>
          </div>
          
          {/* Mini Visualizer */}
          <MiniVisualizer onExpandClick={handleScrollToVisualizer} />
          
          {/* Personal Info and Event Info */}
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
          
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-center gap-4'} pt-4`}>
            <Button type="button" variant="outline" onClick={handleReset} className={`h-12 rounded-full ${isMobile ? 'w-full' : 'px-6'}`}>
              Limpar Tudo
            </Button>
            <Button type="submit" className={`h-12 rounded-full bg-[#eb6824] hover:bg-[#d25618] text-white ${isMobile ? 'w-full' : 'px-6'}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Enviar Pedido via WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
