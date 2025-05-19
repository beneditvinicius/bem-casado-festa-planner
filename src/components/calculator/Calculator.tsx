
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { useCalculator } from '@/hooks/useCalculator';
import { useProductsStore } from '@/data/store';
import { useIsMobile } from '@/hooks/use-mobile';
import FlavorSelector from './FlavorSelector';
import CalculatorTotals from './CalculatorTotals';
import CalculatorFooter from './CalculatorFooter';
import { Label } from "@/components/ui/label";

const Calculator: React.FC = () => {
  const flavors = useProductsStore((state) => state.flavors);
  const boloGeladoFlavors = useProductsStore((state) => state.boloGeladoFlavors);
  const additionals = useProductsStore((state) => state.additionals);
  const isMobile = useIsMobile();
  
  const {
    flavorSelections,
    additionalSelections,
    total,
    showMinimumWarning,
    handleProductTypeChange,
    handleFlavorChange,
    handleQuantityChange,
    handleAdditionalChange,
    addFlavorSelection,
    removeFlavorSelection,
    handleReset,
    getTotalQuantity,
    validateMinimumQuantity
  } = useCalculator(flavors, boloGeladoFlavors, additionals);
  
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
    handleQuantityChange(id, value);
  };
  
  const totalQuantity = getTotalQuantity();
  const showTotal = totalQuantity >= 20 || totalQuantity === 0;
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <p className="text-center mb-6">
        Use esta calculadora para estimar o preço dos seus produtos de acordo com a quantidade e sabores desejados.
      </p>
      
      {flavorSelections.map((selection) => (
        <FlavorSelector
          key={selection.id}
          flavors={flavors}
          boloGeladoFlavors={boloGeladoFlavors}
          selection={selection}
          onFlavorChange={handleFlavorChange}
          onQuantityChange={handleQuantityChangeAdapter}
          onProductTypeChange={handleProductTypeChange}
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
      
      {/* Adicionais only shown if at least one bem-casado selection exists */}
      {flavorSelections.some(s => s.productType === 'bem-casado') && (
        <div className="w-full mb-6 border border-gray-200 rounded-xl p-4">
          <h3 className="font-medium mb-3 text-center">Adicionais (para Bem-Casados)</h3>
          <div className="space-y-3">
            {additionals.map((additional) => {
              const selection = additionalSelections.find(a => a.id === additional.id);
              return (
                <div key={additional.id} className="flex justify-between items-center">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={`additional-${additional.id}`}
                      checked={selection?.selected || false}
                      onCheckedChange={(checked) => 
                        handleAdditionalChange(additional.id, checked === true)
                      }
                    />
                    <Label 
                      htmlFor={`additional-${additional.id}`}
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
      )}
      
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
