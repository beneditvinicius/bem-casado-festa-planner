
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityFieldProps {
  id?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  hasButtons?: boolean;
  className?: string;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showMinimumMessage?: boolean;
}

export function QuantityField({
  id,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  hasButtons = true,
  className,
  error,
  onKeyDown,
  showMinimumMessage = false,
}: QuantityFieldProps) {
  const [inputValue, setInputValue] = useState<string>(
    value !== null ? value.toString() : ""
  );
  const [buzzing, setBuzzing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value !== null ? value.toString() : "");
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(""); // Clear input when focused
  };

  const validateAndUpdateValue = () => {
    setIsFocused(false);
    const parsedValue = parseInt(inputValue, 10);
    
    if (isNaN(parsedValue) || parsedValue === 0) {
      // If it's not a number or zero, reset
      onChange(null);
      return;
    }
    
    if (parsedValue < 20) {
      // If less than minimum, buzz and reset
      triggerBuzzAnimation();
      onChange(null);
      return;
    }
    
    // Valid value
    onChange(parsedValue);
  };

  const handleBlur = () => {
    validateAndUpdateValue();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateAndUpdateValue();
      inputRef.current?.blur();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const increment = () => {
    const currentValue = value || 0;
    if (max !== undefined && currentValue >= max) return;
    onChange(Math.max(20, currentValue + step)); // Ensure minimum is 20
  };

  const decrement = () => {
    if (value === null || value <= 20) {
      triggerBuzzAnimation();
      return;
    }
    onChange(Math.max(20, (value || 0) - step)); // Ensure minimum is 20
  };

  const triggerBuzzAnimation = () => {
    setBuzzing(true);
    setTimeout(() => setBuzzing(false), 500); // Duration of the animation
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn("flex flex-row", buzzing ? "animate-buzz" : "")}>
        {hasButtons && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#eb6824] text-white hover:bg-[#d25618] w-10 h-10 flex items-center justify-center"
            onClick={decrement}
          >
            <Minus className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-grow relative">
          {showMinimumMessage && value === null && !isFocused && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none text-sm">
              Mínimo: 20 unidades
            </div>
          )}
          <Input
            id={id}
            ref={inputRef}
            type="number"
            inputMode="numeric"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            className={cn(
              "rounded-none text-center border-x-0",
              error && "border-destructive",
              showMinimumMessage && value === null && !isFocused && "text-transparent" // Hide input text when showing placeholder
            )}
            aria-invalid={!!error}
            style={{ appearance: 'textfield', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
        </div>
        {hasButtons && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#eb6824] text-white hover:bg-[#d25618] w-10 h-10 flex items-center justify-center"
            onClick={increment}
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
