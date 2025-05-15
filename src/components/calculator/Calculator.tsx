
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
  
  const totalQuantity = getTotalQuantity();
  const showTotal = totalQuantity === 0 || totalQuantity >= 20;
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <p className="text-center mb-6">
        Use esta calculadora para estimar o preço dos seus bem-casados de acordo com a quantidade e sabores desejados.
      </p>
      
      {flavorSelections.map((selection) => (
        <FlavorSelector
          key={selection.id}
          flavors={flavors}
          selection={selection}
          onFlavorChange={handleFlavorChange}
          onQuantityChange={handleQuantityChange}
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
