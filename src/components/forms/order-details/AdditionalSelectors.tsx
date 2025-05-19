
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Additional } from '@/data/types';
import { AdditionalSelection } from '@/hooks/orderForm/types';

interface AdditionalSelectorsProps {
  additionals: Additional[];
  additionalSelections: AdditionalSelection[];
  handleAdditionalChange: (id: string, selected: boolean) => void;
}

export const AdditionalSelectors: React.FC<AdditionalSelectorsProps> = ({
  additionals,
  additionalSelections,
  handleAdditionalChange
}) => {
  return (
    <div className="w-full border border-gray-200 rounded-xl p-4 mb-4">
      <h4 className="font-medium mb-3">Adicionais</h4>
      <div className="space-y-3">
        {additionals.map((additional) => {
          const selection = additionalSelections.find(a => a.id === additional.id);
          return (
            <div key={additional.id} className="flex justify-between items-center">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id={`order-additional-${additional.id}`}
                  checked={selection?.selected || false}
                  onCheckedChange={(checked) => 
                    handleAdditionalChange(additional.id, checked === true)
                  }
                />
                <Label 
                  htmlFor={`order-additional-${additional.id}`}
                  className="text-sm leading-tight"
                >
                  {additional.name}
                </Label>
              </div>
              <span className="text-sm text-gray-600">+ R$ {additional.price.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
