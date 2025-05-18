
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
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
  
  // State and refs for rapid increment/decrement
  const [incrementSpeed, setIncrementSpeed] = useState<number>(300); // Velocidade inicial em ms
  const [decrementSpeed, setDecrementSpeed] = useState<number>(300);
  const incrementTimerRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimerRef = useRef<NodeJS.Timeout | null>(null);
  const incrementSpeedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const decrementSpeedTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value !== null ? value.toString() : "");
    }
  }, [value, isFocused]);

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
  
  // Funções para incremento rápido ao pressionar e segurar o botão
  const startIncrementing = () => {
    increment();
    
    // Limpa qualquer timer existente
    if (incrementTimerRef.current) {
      clearInterval(incrementTimerRef.current);
    }
    
    // Inicia um novo timer para incremento contínuo
    incrementTimerRef.current = setInterval(() => {
      increment();
    }, incrementSpeed);
    
    // Timer para acelerar o incremento quanto mais tempo o botão é pressionado
    incrementSpeedTimerRef.current = setInterval(() => {
      setIncrementSpeed(prev => Math.max(50, prev * 0.8)); // Aumenta a velocidade gradualmente
    }, 1000);
  };

  const startDecrementing = () => {
    decrement();
    
    // Limpa qualquer timer existente
    if (decrementTimerRef.current) {
      clearInterval(decrementTimerRef.current);
    }
    
    // Inicia um novo timer para decremento contínuo
    decrementTimerRef.current = setInterval(() => {
      decrement();
    }, decrementSpeed);
    
    // Timer para acelerar o decremento quanto mais tempo o botão é pressionado
    decrementSpeedTimerRef.current = setInterval(() => {
      setDecrementSpeed(prev => Math.max(50, prev * 0.8)); // Aumenta a velocidade gradualmente
    }, 1000);
  };

  const stopIncrementing = () => {
    if (incrementTimerRef.current) {
      clearInterval(incrementTimerRef.current);
      incrementTimerRef.current = null;
    }
    
    if (incrementSpeedTimerRef.current) {
      clearInterval(incrementSpeedTimerRef.current);
      incrementSpeedTimerRef.current = null;
    }
    
    // Reseta a velocidade para o valor inicial
    setIncrementSpeed(300);
  };

  const stopDecrementing = () => {
    if (decrementTimerRef.current) {
      clearInterval(decrementTimerRef.current);
      decrementTimerRef.current = null;
    }
    
    if (decrementSpeedTimerRef.current) {
      clearInterval(decrementSpeedTimerRef.current);
      decrementSpeedTimerRef.current = null;
    }
    
    // Reseta a velocidade para o valor inicial
    setDecrementSpeed(300);
  };
  
  // Limpa os timers quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (incrementTimerRef.current) {
        clearInterval(incrementTimerRef.current);
      }
      if (decrementTimerRef.current) {
        clearInterval(decrementTimerRef.current);
      }
      if (incrementSpeedTimerRef.current) {
        clearInterval(incrementSpeedTimerRef.current);
      }
      if (decrementSpeedTimerRef.current) {
        clearInterval(decrementSpeedTimerRef.current);
      }
    };
  }, []);

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
            onMouseDown={startDecrementing}
            onMouseUp={stopDecrementing}
            onMouseLeave={stopDecrementing}
            onTouchStart={startDecrementing}
            onTouchEnd={stopDecrementing}
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
            onMouseDown={startIncrementing}
            onMouseUp={stopIncrementing}
            onMouseLeave={stopIncrementing}
            onTouchStart={startIncrementing}
            onTouchEnd={stopIncrementing}
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
