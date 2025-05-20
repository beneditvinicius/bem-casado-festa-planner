
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Palette } from "lucide-react";
import PersonalInfoForm from './forms/PersonalInfoForm';
import EventInfoForm from './forms/EventInfoForm';
import OrderDetailsForm from './forms/OrderDetailsForm';
import { useOrderForm } from '@/hooks/useOrderForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
  
  const [showMiniTest, setShowMiniTest] = useState(true);
  
  // Reset only product details fields
  const handleResetProducts = () => {
    // Reset flavor selections and product type but not personal info
    if (flavorSelections.length > 0) {
      flavorSelections.forEach(selection => {
        handleRemoveFlavor(selection.id);
      });
    }
    if (boloGeladoSelections.length > 0) {
      boloGeladoSelections.forEach(selection => {
        handleRemoveBoloGeladoFlavor(selection.id);
      });
    }
    
    // Add back one empty flavor selection
    handleAddFlavor();
  };
  
  // Reset only personal info fields
  const handleResetPersonalInfo = () => {
    // Reset personal info, event info, and observations but keep product selections
    const personalFields = ['name', 'cpf', 'phone', 'cep', 'street', 'number', 
                           'complement', 'neighborhood', 'city', 'observations',
                           'eventLocation', 'eventType'];
    
    personalFields.forEach(field => {
      if (field in formData) {
        handleInputChange({
          target: { name: field, value: '' }
        } as React.ChangeEvent<HTMLInputElement>);
      }
    });
    
    // Reset event date
    handleDateChange(undefined);
  };
  
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
          {/* Updated Title and introduction */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Faça seu Orçamento</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Utilize essa calculadora para estimar o preço dos seus produtos de acordo com a quantidade e sabores desejados.
            </p>
          </div>
          
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
          
          {/* Product action buttons */}
          <div className={`flex ${isMobile ? 'flex-col' : 'justify-center'} gap-3 mt-4`}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleResetProducts} 
              className={`h-12 rounded-full ${isMobile ? 'w-full' : 'px-6'}`}
            >
              Limpar Tudo
            </Button>
            <Button 
              type="button" 
              onClick={handleScrollToVisualizer} 
              className={`h-12 rounded-full bg-[#eb6824] hover:bg-[#d25618] text-white ${isMobile ? 'w-full' : 'px-6'}`}
            >
              <Palette className="mr-2 h-4 w-4" />
              Teste as cores do bem casado
            </Button>
          </div>
          
          {/* Incentive Message with increased prominence */}
          <div className="w-full text-center py-8 my-6">
            <p className="font-medium text-gray-800 text-lg">
              Achou interessante? Agora preencha seus dados e mande seu pedido para nosso WhatsApp.
            </p>
          </div>
          
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
            <div className="space-y-6">
              <EventInfoForm 
                formData={formData} 
                errors={errors} 
                handleInputChange={handleInputChange} 
                handleDateChange={handleDateChange}
                handleSelectChange={handleSelectChange}
              />
              
              {/* Observations field moved here */}
              <div className="space-y-2">
                <Label htmlFor="observations" className="block text-base">Observações (opcional)</Label>
                <Textarea
                  id="observations"
                  name="observations"
                  placeholder="Alguma observação ou detalhe importante sobre o pedido?"
                  value={formData.observations}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border-gray-300 min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Seus dados estão seguros! Usamos essas informações apenas para o lançamento do seu pedido no sistema.
                </p>
              </div>
            </div>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-center gap-4'} pt-6`}>
            <Button type="button" variant="outline" onClick={handleResetPersonalInfo} className={`h-12 rounded-full ${isMobile ? 'w-full' : 'px-6'}`}>
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
