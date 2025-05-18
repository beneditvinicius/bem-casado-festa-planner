
import React, { useState, useEffect, KeyboardEvent, useRef } from "react";
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
  const incrementTimerRef = useRef<number | null>(null);
  const decrementTimerRef = useRef<number | null>(null);
  const initialDelayMs = 500; // Initial delay before rapid increment starts
  const incrementIntervalMs = 100; // How fast the value increments after the initial delay

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value !== null ? value.toString() : "");
    }
  }, [value, isFocused]);

  // Clean up any timers when unmounting
  useEffect(() => {
    return () => {
      if (incrementTimerRef.current) window.clearTimeout(incrementTimerRef.current);
      if (decrementTimerRef.current) window.clearTimeout(decrementTimerRef.current);
    };
  }, []);

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

  const handleBlur = () => {
    setIsFocused(false);
    if (value !== null && value > 0 && value < 20) {
      triggerBuzzAnimation();
      onChange(null);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(""); // Clear the input field when focused
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (value !== null && value > 0 && value < 20) {
        triggerBuzzAnimation();
        onChange(null);
        if (navigator.vibrate) navigator.vibrate(200);
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const increment = () => {
    if (max !== undefined && value !== null && value >= max) return;
    const newValue = (value || 0) + step;
    onChange(newValue);
  };

  const startIncrement = () => {
    increment(); // Immediate first increment
    
    // Start the hold-to-increment after initial delay
    incrementTimerRef.current = window.setTimeout(() => {
      const rapidIncrement = () => {
        increment();
        incrementTimerRef.current = window.setTimeout(rapidIncrement, incrementIntervalMs);
      };
      rapidIncrement();
    }, initialDelayMs);
  };

  const stopIncrement = () => {
    if (incrementTimerRef.current) {
      window.clearTimeout(incrementTimerRef.current);
      incrementTimerRef.current = null;
    }
  };

  const decrement = () => {
    if (value === null || value <= min) {
      return;
    }
    const newValue = value - step;
    if (newValue < 20 && newValue > 0) {
      triggerBuzzAnimation();
      onChange(null);
      if (navigator.vibrate) navigator.vibrate(200);
      return;
    }
    onChange(newValue < min ? min : newValue);
  };

  const startDecrement = () => {
    decrement(); // Immediate first decrement
    
    // Start the hold-to-decrement after initial delay
    decrementTimerRef.current = window.setTimeout(() => {
      const rapidDecrement = () => {
        decrement();
        decrementTimerRef.current = window.setTimeout(rapidDecrement, incrementIntervalMs);
      };
      rapidDecrement();
    }, initialDelayMs);
  };

  const stopDecrement = () => {
    if (decrementTimerRef.current) {
      window.clearTimeout(decrementTimerRef.current);
      decrementTimerRef.current = null;
    }
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
            onMouseDown={startDecrement}
            onMouseUp={stopDecrement}
            onMouseLeave={stopDecrement}
            onTouchStart={startDecrement}
            onTouchEnd={stopDecrement}
            onTouchCancel={stopDecrement}
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
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyPress}
            className={cn(
              "rounded-none text-center border-x-0",
              error && "border-destructive",
              showMinimumMessage && value === null && !isFocused && "text-transparent", // Hide input text when showing placeholder
            )}
            aria-invalid={!!error}
            // Remove browser's default spinner arrows
            style={{ appearance: 'textfield' }}
          />
        </div>
        {hasButtons && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#eb6824] text-white hover:bg-[#d25618] w-10 h-10 flex items-center justify-center"
            onClick={increment}
            onMouseDown={startIncrement}
            onMouseUp={stopIncrement}
            onMouseLeave={stopIncrement}
            onTouchStart={startIncrement}
            onTouchEnd={stopIncrement}
            onTouchCancel={stopIncrement}
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
