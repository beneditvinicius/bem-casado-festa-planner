
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/products';
import { FlavorSelection as FlavorSelectionType, ProductType, AdditionalSelection } from '@/hooks/useOrderForm';
import { FlavorSelection } from './order-details/FlavorSelection';
import { ColorSelectors } from './order-details/ColorSelectors';
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
    
  const showMinimumWarning = totalQuantity > 0 && totalQuantity < 20;

  const currentFlavors = formData.productType === 'bem-casado' ? flavors : boloGeladoFlavors;
  const currentSelections = formData.productType === 'bem-casado' ? flavorSelections : boloGeladoSelections;
  const handleCurrentFlavorChange = formData.productType === 'bem-casado' ? handleFlavorChange : handleBoloGeladoFlavorChange;
  const handleCurrentQuantityChange = formData.productType === 'bem-casado' ? handleQuantityChange : handleBoloGeladoQuantityChangeAdapter;
  const handleAddCurrentFlavor = formData.productType === 'bem-casado' ? handleAddFlavor : handleAddBoloGeladoFlavor;
  const handleRemoveCurrentFlavor = formData.productType === 'bem-casado' ? handleRemoveFlavor : handleRemoveBoloGeladoFlavor;

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-medium">Detalhes do Pedido</h3>
      
      <div className="mb-4">
        <RadioGroup 
          value={formData.productType}
          onValueChange={(val) => handleProductTypeChange(val as ProductType)}
          className="flex justify-center gap-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bem-casado" id="order-bem-casado" />
            <Label htmlFor="order-bem-casado" className="font-medium">Bem-Casado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bolo-gelado" id="order-bolo-gelado" />
            <Label htmlFor="order-bolo-gelado" className="font-medium">Bolo Gelado</Label>
          </div>
        </RadioGroup>
      </div>
      
      {currentSelections.map((selection, index) => (
        <FlavorSelection 
          key={selection.id}
          selection={selection}
          index={index}
          flavors={currentFlavors}
          errors={errors}
          isRemovable={currentSelections.length > 1}
          onRemove={handleRemoveCurrentFlavor}
          onFlavorChange={handleCurrentFlavorChange}
          onQuantityChange={handleCurrentQuantityChange}
        />
      ))}
      
      <Button 
        type="button"
        variant="outline" 
        onClick={handleAddCurrentFlavor}
        className="w-full flex items-center justify-center gap-2 h-10 rounded-full"
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar outro sabor
      </Button>
      
      {formData.productType === 'bolo-gelado' && (
        <div className="text-center p-4 bg-gray-50 rounded-xl text-gray-600">
          <p>Fita e embalagem não estão disponíveis para o Bolo Gelado.</p>
        </div>
      )}
      
      {formData.productType === 'bem-casado' && (
        <>
          <ColorSelectors
            formData={formData}
            errors={errors}
            ribbonColors={ribbonColors}
            packageColors={packageColors}
            handleSelectChange={handleSelectChange}
          />
          
          <div className="w-full border border-gray-200 rounded-xl p-4 mb-4">
            <h4 className="font-medium mb-3">Adicionais</h4>
            <div className="space-y-3">
              {additionals.map((additional) => {
                const selection = additionalSelections.find(a => a.id === additional.id);
                return (
                  <div key={additional.id} className="flex justify-between items-center">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id={`order-additional-${additional.id}`}
                        checked={selection?.selected || false}
                        onCheckedChange={(checked) => 
                          handleAdditionalChange(additional.id, checked === true)
                        }
                      />
                      <Label 
                        htmlFor={`order-additional-${additional.id}`}
                        className="text-sm leading-tight"
                      >
                        {additional.name}
                      </Label>
                    </div>
                    <span className="text-sm text-gray-600">+ R$ {additional.price.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="text-center">
        <Label htmlFor="observations" className="text-base">Observações (opcional)</Label>
        <Textarea
          id="observations"
          name="observations"
          value={formData.observations || ""}
          onChange={handleInputChange}
          placeholder="Alguma observação sobre seu pedido?"
          className="min-h-[100px] rounded-2xl text-center"
        />
      </div>

      <OrderTotal 
        totalQuantity={totalQuantity} 
        calculateTotal={calculateTotal}
        errors={errors}
      />
    </div>
  );
};

export default OrderDetailsForm;
