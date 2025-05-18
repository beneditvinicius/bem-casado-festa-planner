
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculator } from '@/hooks/useCalculator';
import { useProductsStore } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import FlavorSelector from './FlavorSelector';
import CalculatorFooter from './CalculatorFooter';
import CalculatorTotals from './CalculatorTotals';

const Calculator: React.FC = () => {
  const isMobile = useIsMobile();
  const flavors = useProductsStore((state) => state.flavors);
  
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
  
  return (
    <Card className="w-full rounded-3xl">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Flavor selections */}
          {flavorSelections.map((selection, index) => (
            <FlavorSelector
              key={selection.id}
              flavors={flavors}
              flavorId={selection.flavorId}
              quantity={selection.quantity}
              showDeleteButton={flavorSelections.length > 1}
              onFlavorChange={(flavorId) => handleFlavorChange(selection.id, flavorId)}
              onQuantityChange={(quantity) => handleQuantityChange(selection.id, quantity)}
              onDelete={() => removeFlavorSelection(selection.id)}
              showMinimumMessage={index === 0}
            />
          ))}

          {/* Add more / totals */}
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-center'}`}>
            <Button 
              type="button" 
              onClick={addFlavorSelection}
              className={`h-11 rounded-full ${isMobile ? 'w-full' : ''}`}
              variant="outline"
            >
              + Adicionar outro sabor
            </Button>
          </div>

          <CalculatorTotals 
            totalQuantity={getTotalQuantity()}
            total={total}
            showMinimumWarning={showMinimumWarning}
            hideSubtotal={true}  // Hide subtotal as requested
          />

          <CalculatorFooter 
            onReset={handleReset}
            validateMinimumQuantity={validateMinimumQuantity}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
