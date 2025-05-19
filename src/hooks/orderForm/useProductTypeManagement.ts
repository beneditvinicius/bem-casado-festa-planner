
import { useState } from 'react';
import { ProductType } from './types';

export const useProductTypeManagement = (
  initialProductType: ProductType = 'bem-casado'
) => {
  const [productType, setProductType] = useState<ProductType>(initialProductType);

  const handleProductTypeChange = (type: ProductType) => {
    setProductType(type);
  };

  return {
    productType,
    handleProductTypeChange
  };
};
