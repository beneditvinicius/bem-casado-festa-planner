
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

interface QuantityFieldProps {
  id: string;
  value: number | null;
  onChange: (value: number | null) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  className?: string;
  hasButtons?: boolean;
  error?: string;
}

export const QuantityField: React.FC<QuantityFieldProps> = ({
  id,
  value,
  onChange,
  onIncrement,
  onDecrement,
  className,
  hasButtons = true,
  error
}) => {
  const { toast } = useToast();
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState<string>('');
  
  const handleFocus = () => {
    setIsFocused(true);
    setLocalValue('');
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    
    const numericValue = localValue === '' ? null : parseInt(localValue, 10);
    
    if (numericValue !== null && numericValue < 20) {
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades."
      });
      onChange(null);
      setLocalValue('');
      return;
    }
    
    onChange(numericValue);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };
  
  const handleIncrement = () => {
    if (onIncrement) {
      onIncrement();
    } else {
      const newValue = (value || 0) + 1;
      if (newValue >= 20) {
        onChange(newValue);
      }
    }
  };
  
  const handleDecrement = () => {
    if (onDecrement) {
      onDecrement();
    } else {
      const newValue = (value || 0) - 1;
      if (newValue >= 20) {
        onChange(newValue);
      } else {
        toast({
          title: "Quantidade mínima",
          description: "O pedido mínimo é de 20 unidades."
        });
        onChange(null);
      }
    }
  };
  
  // Display value in input only if not focused and value exists
  const displayValue = isFocused ? localValue : (value ? value.toString() : '');
  
  return (
    <div className="flex items-center">
      {hasButtons && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleDecrement} 
          className="rounded-r-none h-12 w-12" 
          disabled={value === null || value <= 20}
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}
      <Input 
        id={id} 
        type="number" 
        value={displayValue} 
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        min={20}
        className={cn(
          "h-12 text-center", 
          hasButtons && "rounded-none border-x-0",
          error && "border-red-500",
          className
        )} 
      />
      {hasButtons && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleIncrement} 
          className="rounded-l-none h-12 w-12"
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
