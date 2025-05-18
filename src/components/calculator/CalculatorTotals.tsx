
import React from 'react';
import { formatCurrency } from '@/utils/formatter.tsx';

interface CalculatorTotalsProps {
  totalQuantity: number;
  total: number;
  showMinimumWarning: boolean;
  hideSubtotal?: boolean;
}

const CalculatorTotals: React.FC<CalculatorTotalsProps> = ({ 
  totalQuantity, 
  total, 
  showMinimumWarning,
  hideSubtotal = false
}) => {
  const showValues = totalQuantity >= 20 && !showMinimumWarning;
  
  return (
    <div>
      {!hideSubtotal && showValues && (
        <div className="flex justify-center items-center gap-2 text-gray-600">
          <span>Subtotal:</span>
          <span className="font-semibold">{formatCurrency(total)}</span>
        </div>
      )}
      
      <div className="flex justify-center items-center gap-2 mt-2">
        <span className="text-base">Total:</span>
        <span className="text-xl font-bold text-[#eb6824]">
          {showValues ? formatCurrency(total) : "Aguardando quantidade mínima"}
        </span>
      </div>
    </div>
  );
};

export default CalculatorTotals;
