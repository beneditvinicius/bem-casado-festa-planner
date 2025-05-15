
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCalculator } from '@/hooks/useCalculator';
import { useProductsStore } from '@/data/products';
import FlavorSelector from './FlavorSelector';
import CalculatorTotals from './CalculatorTotals';
import CalculatorFooter from './CalculatorFooter';

const Calculator: React.FC = () => {
  const flavors = useProductsStore((state) => state.flavors);
  
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
  
  return (
    <div className="w-full max-w-3xl mx-auto">
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
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onRemove={removeFlavorSelection}
          canRemove={flavorSelections.length > 1}
        />
      ))}
      
      <Button 
        variant="outline" 
        className="w-full mb-6 flex items-center gap-2"
        onClick={addFlavorSelection}
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar outro sabor
      </Button>
      
      <CalculatorTotals
        totalPrice={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
        totalQuantity={getTotalQuantity()}
      />
      
      <CalculatorFooter onReset={handleReset} />
    </div>
  );
};

export default Calculator;
