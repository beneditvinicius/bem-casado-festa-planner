
import React from 'react';

interface OrderTotalProps {
  totalQuantity: number;
  calculateTotal: () => string;
  errors: { [key: string]: string };
}

export const OrderTotal: React.FC<OrderTotalProps> = ({
  totalQuantity,
  calculateTotal,
  errors
}) => {
  const showMinimumWarning = totalQuantity > 0 && totalQuantity < 20;

  return (
    <div className="pt-4">
      <div className="bg-[#fef2e6] p-4 rounded-md mb-4">
        {showMinimumWarning && (
          <div className="text-red-500 text-sm font-medium mb-2 text-center">
            O pedido mínimo é de 20 unidades.
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-base">Valor Total (estimado):</span>
          <span className="text-[#eb6824] text-xl font-bold">
            {showMinimumWarning ? "Aguardando qtd. mínima" : calculateTotal()}
          </span>
        </div>
      </div>
      {errors.quantity && <p className="text-red-500 text-sm mt-1 text-center">{errors.quantity}</p>}
    </div>
  );
};
