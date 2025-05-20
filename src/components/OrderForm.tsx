import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import OrderDetailsForm from './forms/order-details/OrderDetailsForm';
import { useOrderForm } from '@/hooks/useOrderForm';
import PersonalInfoSection from './forms/sections/PersonalInfoSection';
import ProductResetActions from './forms/sections/ProductResetActions';
import SubmitButton from './forms/sections/SubmitButton';

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
    calculateTotal,
    searchCep
  } = useOrderForm();
  
  // Reset only product details fields
  const handleResetProducts = () => {
    // Reset flavor selections but not personal info
    if (formData.productType === 'bem-casado') {
      if (flavorSelections.length > 1) {
        // Keep the first one and remove the rest
        for (let i = flavorSelections.length - 1; i > 0; i--) {
          handleRemoveFlavor(flavorSelections[i].id);
        }
        // Reset the first one
        handleFlavorChange(flavorSelections[0].id, '');
        handleFlavorQuantityChange(flavorSelections[0].id, '');
      } else if (flavorSelections.length === 1) {
        // Reset the only one
        handleFlavorChange(flavorSelections[0].id, '');
        handleFlavorQuantityChange(flavorSelections[0].id, '');
      } else {
        // Add one if there's none
        handleAddFlavor();
      }
      
      // Reset ribbon and package to first options
      handleSelectChange('ribbonId', ribbonColors[0]?.id || '');
      handleSelectChange('packageId', packageColors[0]?.id || '');
      
      // Reset additionals
      additionalSelections.forEach(additional => {
        if (additional.selected) {
          handleAdditionalChange(additional.id, false);
        }
      });
    } else {
      // For bolo gelado
      if (boloGeladoSelections.length > 1) {
        // Keep the first one and remove the rest
        for (let i = boloGeladoSelections.length - 1; i > 0; i--) {
          handleRemoveBoloGeladoFlavor(boloGeladoSelections[i].id);
        }
        // Reset the first one
        handleBoloGeladoFlavorChange(boloGeladoSelections[0].id, '');
        handleBoloGeladoQuantityChange(boloGeladoSelections[0].id, '');
      } else if (boloGeladoSelections.length === 1) {
        // Reset the only one
        handleBoloGeladoFlavorChange(boloGeladoSelections[0].id, '');
        handleBoloGeladoQuantityChange(boloGeladoSelections[0].id, '');
      } else {
        // Add one if there's none
        handleAddBoloGeladoFlavor();
      }
    }
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
            onVisualizerClick={handleScrollToVisualizer}
          />
          
          {/* Product action buttons */}
          <ProductResetActions onResetProducts={handleResetProducts} />
          
          {/* Personal Info and Event Info */}
          <PersonalInfoSection 
            formData={formData}
            errors={errors}
            isLoadingCep={isLoadingCep}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
            searchCep={searchCep}
          />
          
          {/* Submit Button */}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
