
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Additional } from '@/data/types';
import { AdditionalSelection } from '@/hooks/orderForm/types';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center rounded-full"
        >
          <span>Escolha os adicionais</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-3">
        {additionals.map((additional) => {
          const selection = additionalSelections.find(a => a.id === additional.id);
          return (
            <div key={additional.id} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-full">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`order-additional-${additional.id}`}
                  checked={selection?.selected || false}
                  onCheckedChange={(checked) => 
                    handleAdditionalChange(additional.id, checked === true)
                  }
                />
                <Label 
                  htmlFor={`order-additional-${additional.id}`}
                  className="text-sm leading-tight cursor-pointer"
                >
                  {additional.name}
                </Label>
              </div>
              <span className="text-sm font-medium text-gray-600">+ R$ {additional.price.toFixed(2)}</span>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};
