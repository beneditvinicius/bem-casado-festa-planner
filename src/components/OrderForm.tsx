
import React from 'react';
import { CardContent } from "@/components/ui/card";
import OrderDetailsForm from './forms/order-details/OrderDetailsForm';
import { useOrderForm } from '@/hooks/useOrderForm';
import PersonalInfoSection from './forms/sections/PersonalInfoSection';
import ProductResetActions from './forms/sections/ProductResetActions';
import SubmitButton from './forms/sections/SubmitButton';
import { useProductReset } from '@/hooks/useProductReset';

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
  
  // Convert additionalSelections to selectedAdditionals format for useProductReset
  const selectedAdditionals = additionalSelections.reduce((acc, item) => {
    acc[item.id] = item.selected;
    return acc;
  }, {} as Record<string, boolean>);
  
  // Set dummy function for setSelectedAdditionals since we use a different approach with handleAdditionalChange
  const setSelectedAdditionals = (additionals: Record<string, boolean>) => {
    Object.entries(additionals).forEach(([id, selected]) => {
      handleAdditionalChange(id, selected);
    });
  };
  
  // Use the product reset hook with direct access to all handlers
  const { resetProducts } = useProductReset({
    productType: formData.productType,
    flavorSelections,
    setFlavorSelections: (selections) => {
      // Clear existing selections
      flavorSelections.forEach(sel => handleRemoveFlavor(sel.id));
      // Add new selections
      selections.forEach(sel => {
        handleAddFlavor();
        const newId = flavorSelections[flavorSelections.length - 1].id;
        handleFlavorChange(newId, sel.id);
        handleFlavorQuantityChange(newId, sel.quantity.toString());
      });
    },
    selectedAdditionals,
    setSelectedAdditionals,
    boloGeladoFlavor: boloGeladoSelections[0]?.flavorId || null,
    setBoloGeladoFlavor: (flavor) => {
      if (flavor) {
        handleBoloGeladoFlavorChange(boloGeladoSelections[0]?.id || '', flavor);
      }
    },
    handleSelectChange,
    handleAddFlavor,
    handleAddAdditional: (id) => handleAdditionalChange(id, true)
  });
  
  const handleScrollToVisualizer = () => {
    const visualizerElement = document.getElementById('visualizer');
    if (visualizerElement) {
      visualizerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div id="pedido">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and introduction */}
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
          <ProductResetActions onResetProducts={resetProducts} />
          
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
    </div>
  );
};

export default OrderForm;
