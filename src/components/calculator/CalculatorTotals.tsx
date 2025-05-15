
import React from 'react';

interface CalculatorTotalsProps {
  total: number;
  totalQuantity: number;
  showMinimumWarning?: boolean;
}

const CalculatorTotals: React.FC<CalculatorTotalsProps> = ({ 
  total, 
  totalQuantity,
  showMinimumWarning = false
}) => {
  return (
    <div className="bg-[#fef2e6] p-6 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <div className="text-base font-medium">Quantidade Total:</div>
        <div className="text-xl font-bold">
          {totalQuantity} {totalQuantity === 1 ? 'unidade' : 'unidades'}
        </div>
      </div>
      
      {showMinimumWarning && (
        <div className="text-red-500 text-sm font-medium mb-2 text-center">
          O pedido mínimo é de 20 unidades.
        </div>
      )}
      
      <div className="border-t pt-2 mt-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="text-base font-medium">Valor Total:</div>
          <div className="text-2xl font-bold text-[#eb6824]">
            {showMinimumWarning ? (
              <span className="text-gray-400">Aguardando qtd. mínima</span>
            ) : (
              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTotals;
