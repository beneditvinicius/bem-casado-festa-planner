
import React from 'react';
import { formatCurrency } from '@/utils/formatter.tsx';

interface CalculatorTotalsProps {
  total: number;
  totalQuantity: number;
  showMinimumWarning: boolean;
}

const CalculatorTotals: React.FC<CalculatorTotalsProps> = ({ 
  total, 
  totalQuantity,
  showMinimumWarning
}) => {
  const isValidQuantity = totalQuantity === 0 || totalQuantity >= 20;

  return (
    <div className="w-full mb-6 text-center">
      <div className="bg-[#fef2e6] rounded-2xl p-4">
        {showMinimumWarning && (
          <div className="text-red-500 text-sm font-medium mb-2 text-center">
            O pedido mínimo é de 20 unidades.
          </div>
        )}
        
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm sm:text-base">Quantidade Total:</span>
            <span className="font-semibold text-base sm:text-lg">
              {totalQuantity} unidades
              {totalQuantity > 0 && totalQuantity < 20 && (
                <span className="text-red-500 text-sm font-medium ml-2">
                  (Mínimo: 20)
                </span>
              )}
            </span>
          </div>
          
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm sm:text-base">Valor Total:</span>
            <span className="text-[#eb6824] font-bold text-lg sm:text-xl">
              {isValidQuantity ? formatCurrency(total) : "Aguardando qtd. mínima"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTotals;
