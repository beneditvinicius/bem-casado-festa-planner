
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductResetActionsProps {
  onResetProducts: () => void;
}

export const ProductResetActions: React.FC<ProductResetActionsProps> = ({
  onResetProducts,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex justify-center mt-4`}>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onResetProducts} 
        className={`h-12 rounded-full ${isMobile ? 'w-full' : 'px-6'}`}
      >
        Limpar Tudo
      </Button>
    </div>
  );
};

export default ProductResetActions;
