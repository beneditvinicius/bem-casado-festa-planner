
import React, { useState, useEffect, KeyboardEvent } from "react";
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

  useEffect(() => {
    setInputValue(value !== null ? value.toString() : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedValue = parseFloat(newValue);
    if (newValue === "" || isNaN(parsedValue)) {
      onChange(null);
    } else {
      // Enforce minimum value of 20 if the value is greater than 0
      const finalValue = parsedValue > 0 && parsedValue < 20 ? 20 : parsedValue;
      onChange(finalValue);
    }
  };

  const increment = () => {
    if (max !== undefined && value !== null && value >= max) return;
    const newValue = (value || 0) + step;
    onChange(newValue);
  };

  const decrement = () => {
    // If the current value is less than or equal to min, or if it's 20 (our min), trigger buzz
    if (value === null || value <= min || (value <= 20 && value > 0)) {
      triggerBuzzAnimation();
      return;
    }
    const newValue = value - step;
    onChange(newValue < min ? min : newValue);
  };

  const triggerBuzzAnimation = () => {
    setBuzzing(true);
    setTimeout(() => setBuzzing(false), 500); // Duration of the animation
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // To enforce the minimum value as user types
  useEffect(() => {
    if (value !== null && value > 0 && value < 20) {
      onChange(20);
    }
  }, [value, onChange]);

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
          {showMinimumMessage && value === null && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none text-sm">
              Mínimo: 20 unidades
            </div>
          )}
          <Input
            id={id}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              "rounded-none text-center border-x-0",
              error && "border-destructive",
              showMinimumMessage && value === null && "text-transparent", // Hide input text when showing placeholder
            )}
            aria-invalid={!!error}
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

// Add keyframes for buzz animation to index.css
