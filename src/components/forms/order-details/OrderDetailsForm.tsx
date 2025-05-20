
import React from 'react';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/products';
import { FlavorSelection as FlavorSelectionType, ProductType, AdditionalSelection } from '@/hooks/orderForm/types';
import { ProductTypeSelector } from './order-details/ProductTypeSelector';
import { FlavorControls } from './order-details/FlavorControls';
import { BoloGeladoMessage } from './order-details/BoloGeladoMessage';
import { ColorSelectors } from './order-details/ColorSelectors';
import { AdditionalSelectors } from './order-details/AdditionalSelectors';
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
  
  // Calculate total quantity
  const totalQuantity = formData.productType === 'bem-casado'
    ? flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : boloGeladoSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
  const currentFlavors = formData.productType === 'bem-casado' ? flavors : boloGeladoFlavors;
  const currentSelections = formData.productType === 'bem-casado' ? flavorSelections : boloGeladoSelections;
  const handleCurrentFlavorChange = formData.productType === 'bem-casado' ? handleFlavorChange : handleBoloGeladoFlavorChange;
  const handleCurrentQuantityChange = formData.productType === 'bem-casado' ? handleQuantityChange : handleBoloGeladoQuantityChangeAdapter;
  const handleAddCurrentFlavor = formData.productType === 'bem-casado' ? handleAddFlavor : handleAddBoloGeladoFlavor;
  const handleRemoveCurrentFlavor = formData.productType === 'bem-casado' ? handleRemoveFlavor : handleRemoveBoloGeladoFlavor;

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-medium">Detalhes do Produto</h3>
      
      <ProductTypeSelector 
        productType={formData.productType} 
        handleProductTypeChange={handleProductTypeChange}
      />
      
      <FlavorControls
        productType={formData.productType}
        flavors={currentFlavors}
        selections={currentSelections}
        errors={errors}
        handleAddFlavor={handleAddCurrentFlavor}
        handleRemoveFlavor={handleRemoveCurrentFlavor}
        handleFlavorChange={handleCurrentFlavorChange}
        handleQuantityChange={handleCurrentQuantityChange}
      />
      
      {formData.productType === 'bolo-gelado' && <BoloGeladoMessage />}
      
      {formData.productType === 'bem-casado' && (
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

      <OrderTotal 
        totalQuantity={totalQuantity} 
        calculateTotal={calculateTotal}
        errors={errors}
      />
    </div>
  );
};

export default OrderDetailsForm;
