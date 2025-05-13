
import React from 'react';
import { formatCurrency, formatQuantity } from '@/utils/formatter.tsx';
import { CalculatorTotalsProps } from './types';

const CalculatorTotals: React.FC<CalculatorTotalsProps> = ({ total, totalQuantity }) => {
  return (
    <div className="bg-[#fef2e6] p-4 sm:p-6 rounded-md">
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-end">
          <span className="text-lg">Total do seu orçamento:</span>
          <span className="text-[#eb6824] text-xl sm:text-2xl font-bold">{formatCurrency(total)}</span>
        </div>
        <span className="text-muted-foreground text-sm">
          Total: {formatQuantity(totalQuantity)} unidades
        </span>
      </div>
    </div>
  );
};

export default CalculatorTotals;
