
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FlavorFieldsProps {
  price: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FlavorFields: React.FC<FlavorFieldsProps> = ({ 
  price,
  onChange
}) => {
  return (
    <div className="space-y-2 text-center">
      <Label htmlFor="price" className="text-center">Preço (R$)</Label>
      <Input
        id="price"
        name="price"
        type="number"
        step="0.01"
        placeholder="0.00"
        value={price}
        onChange={onChange}
        className="rounded-full text-center"
        required
      />
    </div>
  );
};

export default FlavorFields;
