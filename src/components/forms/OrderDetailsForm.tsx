
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Flavor, RibbonColor, PackageColor } from '@/data/products';
import { FlavorSelection as FlavorSelectionType } from '@/hooks/useOrderForm';
import { FlavorSelection } from './order-details/FlavorSelection';
import { ColorSelectors } from './order-details/ColorSelectors';
import { OrderTotal } from './order-details/OrderTotal';

interface OrderDetailsFormProps {
  formData: {
    ribbonId: string;
    packageId: string;
    observations: string;
  };
  errors: { [key: string]: string };
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  flavorSelections: FlavorSelectionType[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleFlavorQuantityChange: (id: string, value: string) => void;
  calculateTotal: () => string;
}

const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({
  formData,
  errors,
  flavors,
  ribbonColors,
  packageColors,
  flavorSelections,
  handleInputChange,
  handleSelectChange,
  handleAddFlavor,
  handleRemoveFlavor,
  handleFlavorChange,
  handleFlavorQuantityChange,
  calculateTotal,
}) => {
  const handleQuantityChange = (id: string, value: number | null) => {
    handleFlavorQuantityChange(id, value !== null ? value.toString() : '');
  };
  
  // Calculate total quantity
  const totalQuantity = flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const showMinimumWarning = totalQuantity > 0 && totalQuantity < 20;

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-medium">Detalhes do Pedido</h3>
      
      {flavorSelections.map((selection, index) => (
        <FlavorSelection 
          key={selection.id}
          selection={selection}
          index={index}
          flavors={flavors}
          errors={errors}
          isRemovable={flavorSelections.length > 1}
          onRemove={handleRemoveFlavor}
          onFlavorChange={handleFlavorChange}
          onQuantityChange={handleQuantityChange}
        />
      ))}
      
      <Button 
        type="button"
        variant="outline" 
        onClick={handleAddFlavor}
        className="w-full flex items-center justify-center gap-2 h-10 rounded-full"
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar outro sabor
      </Button>
      
      <ColorSelectors
        formData={formData}
        errors={errors}
        ribbonColors={ribbonColors}
        packageColors={packageColors}
        handleSelectChange={handleSelectChange}
      />

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
