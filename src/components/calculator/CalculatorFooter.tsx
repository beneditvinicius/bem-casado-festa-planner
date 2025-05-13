
import React from 'react';
import { Button } from "@/components/ui/button";

interface CalculatorFooterProps {
  isMobile: boolean;
  onReset: () => void;
  onGoToFaq: () => void;
}

const CalculatorFooter: React.FC<CalculatorFooterProps> = ({ isMobile, onReset, onGoToFaq }) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row gap-4'} justify-between`}>
      <Button 
        variant="outline" 
        onClick={onReset} 
        className={`text-sm sm:text-base h-12 ${isMobile ? 'w-full' : ''}`}
      >
        Limpar Tudo
      </Button>
      
      <Button 
        variant="default" 
        className={`text-sm sm:text-base h-12 bg-[#eb6824] hover:bg-[#d25618] ${isMobile ? 'w-full' : ''}`} 
        onClick={onGoToFaq}
      >
        Dúvidas Frequentes
      </Button>
    </div>
  );
};

export default CalculatorFooter;
