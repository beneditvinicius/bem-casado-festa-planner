
import React from 'react';
import { Button } from "@/components/ui/button";

interface CalculatorFooterProps {
  isMobile: boolean;
  onReset: () => void;
  onGoToFaq: () => void;
  onConfirm?: () => boolean;
}

const CalculatorFooter: React.FC<CalculatorFooterProps> = ({ 
  isMobile, 
  onReset, 
  onGoToFaq,
  onConfirm
}) => {
  const handleGoToFaq = () => {
    if (onConfirm) onConfirm();
    onGoToFaq();
  };
  
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-4'} justify-center w-full`}>
      <Button 
        variant="outline" 
        onClick={onReset} 
        className={`text-sm sm:text-base h-12 rounded-full ${isMobile ? 'w-full' : 'px-6'}`}
      >
        Limpar Tudo
      </Button>
      
      <Button 
        variant="default" 
        className={`text-sm sm:text-base h-12 bg-[#eb6824] hover:bg-[#d25618] rounded-full ${isMobile ? 'w-full' : 'px-6'}`} 
        onClick={handleGoToFaq}
      >
        Dúvidas Frequentes
      </Button>
    </div>
  );
};

export default CalculatorFooter;
