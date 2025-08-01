
import React from 'react';

interface OrderTotalProps {
  totalQuantity: number;
  calculateTotal: () => string;
  errors: { [key: string]: string };
}

export const OrderTotal: React.FC<OrderTotalProps> = ({
  totalQuantity,
  calculateTotal,
  errors,
}) => {
  return (
    <div className="bg-orange-100 p-4 rounded-xl shadow-sm mb-2">
      <div className="grid grid-cols-1 gap-2 text-center">
        <div>
          <p className="text-sm font-medium">Quantidade Total:</p>
          <p className="text-xl font-semibold">{totalQuantity} unidades</p>
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity}</p>
          )}
        </div>
        <div>
          <p className="text-sm font-medium">Valor Total Estimado:</p>
          <p className="text-xl font-semibold">R$ {calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
}
