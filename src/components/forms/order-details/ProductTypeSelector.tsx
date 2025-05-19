
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductType } from '@/hooks/orderForm/types';

interface ProductTypeSelectorProps {
  productType: ProductType;
  handleProductTypeChange: (type: ProductType) => void;
}

export const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  productType,
  handleProductTypeChange
}) => {
  return (
    <div className="mb-4">
      <RadioGroup 
        value={productType}
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
  );
};
