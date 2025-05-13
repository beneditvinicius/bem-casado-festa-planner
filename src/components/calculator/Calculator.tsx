
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useProductsStore } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCalculator } from '@/hooks/useCalculator';
import FlavorSelector from './FlavorSelector';
import CalculatorTotals from './CalculatorTotals';
import CalculatorFooter from './CalculatorFooter';

const Calculator: React.FC = () => {
  const flavors = useProductsStore(state => state.flavors);
  const isMobile = useIsMobile();
  
  const {
    flavorSelections,
    total,
    handleFlavorChange,
    handleQuantityChange,
    incrementQuantity,
    decrementQuantity,
    addFlavorSelection,
    removeFlavorSelection,
    handleReset,
    getTotalQuantity
  } = useCalculator(flavors);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <Card className="w-full" id="calculator">
      <CardContent className="pt-6 card-content">
        <p className="text-center text-sm sm:text-base mb-6">
          Apresentamos a maravilhosa calculadora de bem-casados! Com essa ferramenta, você pode calcular o valor do seu pedido, fazer seu orçamento detalhado que vai direto para nosso WhatsApp e pode simular a cor do seu bem-casado para ter certeza de que sua lembrança ficará do jeitinho que sonhou!
        </p>
        
        <div className="space-y-6">
          {flavorSelections.map((selection, index) => (
            <FlavorSelector
              key={selection.id}
              selection={selection}
              flavors={flavors}
              onFlavorChange={handleFlavorChange}
              onQuantityChange={handleQuantityChange}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              onRemove={removeFlavorSelection}
              showRemoveButton={flavorSelections.length > 1}
            />
          ))}
          
          <Button 
            variant="outline" 
            onClick={addFlavorSelection} 
            className="w-full flex items-center justify-center gap-2 h-12"
          >
            <PlusCircle className="h-4 w-4" />
            Adicionar outro sabor
          </Button>
          
          <div className="pt-4">
            <CalculatorTotals 
              total={total} 
              totalQuantity={getTotalQuantity()} 
            />
          </div>
          
          <CalculatorFooter 
            isMobile={isMobile} 
            onReset={handleReset} 
            onGoToFaq={() => scrollToSection('faq')} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
