
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Additional } from '@/data/products';
import { cn } from '@/lib/utils';
import { AdditionalSelection } from '@/hooks/orderForm/types';

interface AdditionalSelectorsProps {
  additionals: Additional[];
  selectedAdditionals?: Record<string, boolean>;
  additionalSelections?: AdditionalSelection[];
  onChange?: (additionalId: string) => void;
  handleAdditionalChange?: (id: string, selected: boolean) => void;
}

export const AdditionalSelectors: React.FC<AdditionalSelectorsProps> = ({ 
  additionals, 
  selectedAdditionals, 
  additionalSelections, 
  onChange, 
  handleAdditionalChange 
}) => {
  // Function to determine if an additional is selected, checking both selection methods
  const isSelected = (id: string) => {
    if (additionalSelections) {
      const selection = additionalSelections.find(sel => sel.id === id);
      return selection ? selection.selected : false;
    }
    return selectedAdditionals?.[id] || false;
  };

  // Function to handle changes, using the appropriate callback
  const handleChange = (id: string) => {
    if (handleAdditionalChange) {
      const currentSelected = isSelected(id);
      handleAdditionalChange(id, !currentSelected);
    } else if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-3">Gostaria de algum adicional?</h3>
        <div className="grid grid-cols-1 gap-4">
          {additionals.map((additional) => (
            <div key={additional.id} className="flex items-start space-x-3 py-2">
              <Checkbox
                id={additional.id}
                checked={isSelected(additional.id)}
                onCheckedChange={() => handleChange(additional.id)}
                className={cn("rounded-md data-[state=checked]:bg-[#eb6824] border-gray-300")}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={additional.id}
                  className="text-sm cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {additional.name} (+R$ {additional.price.toFixed(2)})
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
