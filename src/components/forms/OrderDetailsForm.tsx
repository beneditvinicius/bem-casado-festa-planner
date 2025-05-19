import React from 'react';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/types';
import { FlavorSelection as FlavorSelectionType, ProductType, AdditionalSelection } from '@/hooks/orderForm/types';
import { ProductTypeSelector } from './order-details/ProductTypeSelector';
import { FlavorControls } from './order-details/FlavorControls';
import { BoloGeladoMessage } from './order-details/BoloGeladoMessage';
import { ColorSelectors } from './order-details/ColorSelectors';
import { AdditionalSelectors } from './order-details/AdditionalSelectors';
import { ObservationsInput } from './order-details/ObservationsInput';
import { OrderTotal } from './order-details/OrderTotal';

interface OrderDetailsFormProps {
  formData: {
    ribbonId: string;
    packageId: string;
    observations: string;
    productType: ProductType;
  };
  errors: { [key: string]: string };
  flavors: Flavor[];
  boloGeladoFlavors: BoloGeladoFlavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  additionals: Additional[];
  flavorSelections: FlavorSelectionType[];
  boloGeladoSelections: FlavorSelectionType[];
  additionalSelections: AdditionalSelection[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleProductTypeChange: (type: ProductType) => void;
  handleItemProductTypeChange: (id: string, type: ProductType) => void;
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleFlavorQuantityChange: (id: string, value: string) => void;
  handleAddBoloGeladoFlavor: () => void;
  handleRemoveBoloGeladoFlavor: (id: string) => void;
  handleBoloGeladoFlavorChange: (id: string, flavorId: string) => void;
  handleBoloGeladoQuantityChange: (id: string, value: string) => void;
  handleAdditionalChange: (id: string, selected: boolean) => void;
  calculateTotal: () => string;
}

const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({
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
  handleInputChange,
  handleSelectChange,
  handleProductTypeChange,
  handleItemProductTypeChange,
  handleAddFlavor,
  handleRemoveFlavor,
  handleFlavorChange,
  handleFlavorQuantityChange,
  handleAddBoloGeladoFlavor,
  handleRemoveBoloGeladoFlavor,
  handleBoloGeladoFlavorChange,
  handleBoloGeladoQuantityChange,
  handleAdditionalChange,
  calculateTotal,
}) => {
  const handleQuantityChange = (id: string, value: number | null) => {
    handleFlavorQuantityChange(id, value !== null ? value.toString() : '');
  };

  const handleBoloGeladoQuantityChangeAdapter = (id: string, value: number | null) => {
    handleBoloGeladoQuantityChange(id, value !== null ? value.toString() : '');
  };
  
  // Calculate total quantity of all selections
  const totalQuantity = 
    flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0) +
    boloGeladoSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Get all selections together for the combined view
  const allSelections = [...flavorSelections];
  
  // Check if there are bem-casados to display color selectors and additionals
  const hasBemCasados = flavorSelections.some(s => s.productType === 'bem-casado');
  
  // Check if there are bolo gelados to display the message
  const hasBoloGelados = flavorSelections.some(s => s.productType === 'bolo-gelado');

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-medium">Detalhes do Pedido</h3>
      
      {/* Note: We're keeping the global product type selector for backward compatibility */}
      <ProductTypeSelector 
        productType={formData.productType} 
        handleProductTypeChange={handleProductTypeChange}
      />
      
      <FlavorControls
        productType={formData.productType}
        flavors={flavors}
        boloGeladoFlavors={boloGeladoFlavors}
        selections={flavorSelections}
        errors={errors}
        handleAddFlavor={handleAddFlavor}
        handleRemoveFlavor={handleRemoveFlavor}
        handleFlavorChange={handleFlavorChange}
        handleQuantityChange={handleQuantityChange}
        handleItemProductTypeChange={handleItemProductTypeChange}
      />
      
      {hasBoloGelados && <BoloGeladoMessage />}
      
      {hasBemCasados && (
        <>
          <ColorSelectors
            formData={formData}
            errors={errors}
            ribbonColors={ribbonColors}
            packageColors={packageColors}
            handleSelectChange={handleSelectChange}
          />
          
          <AdditionalSelectors
            additionals={additionals}
            additionalSelections={additionalSelections}
            handleAdditionalChange={handleAdditionalChange}
          />
        </>
      )}

      <ObservationsInput 
        observations={formData.observations} 
        handleInputChange={handleInputChange} 
      />

      <OrderTotal 
        totalQuantity={totalQuantity} 
        calculateTotal={calculateTotal}
        errors={errors}
      />
    </div>
  );
};

export default OrderDetailsForm;
