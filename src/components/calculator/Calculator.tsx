
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCalculator } from '@/hooks/useCalculator';
import { useProductsStore } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import FlavorSelector from './FlavorSelector';
import CalculatorTotals from './CalculatorTotals';
import CalculatorFooter from './CalculatorFooter';

const Calculator: React.FC = () => {
  const flavors = useProductsStore((state) => state.flavors);
  const isMobile = useIsMobile();
  
  const {
    flavorSelections,
    total,
    showMinimumWarning,
    handleFlavorChange,
    handleQuantityChange,
    addFlavorSelection,
    removeFlavorSelection,
    handleReset,
    getTotalQuantity,
    validateMinimumQuantity
  } = useCalculator(flavors);
  
  const handleGoToFaq = () => {
    // First validate minimum quantity
    if (!validateMinimumQuantity() && getTotalQuantity() > 0) {
      return;
    }
    
    const faqElement = document.getElementById('faq');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Convert number to number for the calculator (enforcing minimum of 20)
  const handleQuantityChangeAdapter = (id: string, value: number | null) => {
    // If value is less than 20 and not null, set to 20
    if (value !== null && value > 0 && value < 20) {
      value = 20;
    }
    handleQuantityChange(id, value);
  };
  
  const totalQuantity = getTotalQuantity();
  const showTotal = totalQuantity >= 20 || totalQuantity === 0;
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <p className="text-center mb-6">
        Use esta calculadora para estimar o preço dos seus bem-casados de acordo com a quantidade e sabores desejados.
        <span className="block mt-2 text-sm font-medium text-[#eb6824]">
          O pedido mínimo é de 20 unidades.
        </span>
      </p>
      
      {flavorSelections.map((selection) => (
        <FlavorSelector
          key={selection.id}
          flavors={flavors}
          selection={selection}
          onFlavorChange={handleFlavorChange}
          onQuantityChange={handleQuantityChangeAdapter}
          onRemove={removeFlavorSelection}
          canRemove={flavorSelections.length > 1}
          hideButtons={true}
        />
      ))}
      
      <Button 
        variant="outline" 
        className="w-full mb-6 flex items-center gap-2 rounded-full"
        onClick={addFlavorSelection}
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar outro sabor
      </Button>
      
      <CalculatorTotals
        total={showTotal ? total : 0}
        totalQuantity={totalQuantity}
        showMinimumWarning={showMinimumWarning}
      />
      
      <CalculatorFooter 
        isMobile={isMobile} 
        onReset={handleReset}
        onGoToFaq={handleGoToFaq}
        validateMinimum={validateMinimumQuantity}
      />
    </div>
  );
};

export default Calculator;
