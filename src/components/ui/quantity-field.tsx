
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
}: QuantityFieldProps) {
  const [inputValue, setInputValue] = useState<string>(
    value !== null ? value.toString() : ""
  );

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
      onChange(parsedValue);
    }
  };

  const increment = () => {
    if (max !== undefined && value !== null && value >= max) return;
    const newValue = (value || 0) + step;
    onChange(newValue);
  };

  const decrement = () => {
    if (value === null || value <= min) return;
    const newValue = value - step;
    onChange(newValue < min ? min : newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className={cn("flex flex-row", className)}>
      {hasButtons && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-l-full rounded-r-none"
          onClick={decrement}
        >
          <Minus className="h-4 w-4" />
        </Button>
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
          hasButtons
            ? "rounded-none text-center border-x-0"
            : "min-w-0 w-full rounded-full text-center",
          error && "border-destructive",
        )}
        aria-invalid={!!error}
      />
      {hasButtons && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-l-none rounded-r-full"
          onClick={increment}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
