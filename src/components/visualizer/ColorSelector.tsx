
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface ColorOption {
  id: string;
  name: string;
  code?: string;
  color: string;
  isNew?: boolean;
}

interface ColorSelectorProps {
  id: string;
  label: string;
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  id, 
  label, 
  options, 
  value, 
  onChange 
}) => {
  const { toast } = useToast();
  
  const handleChange = (newValue: string) => {
    onChange(newValue);
    const selected = options.find(option => option.id === newValue);
    if (selected) {
      toast({
        title: `${label} selecionada: ${selected.name}`,
        description: undefined,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <Label htmlFor={id} className="text-base sm:text-lg">{label}</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id={id} className="h-10 sm:h-12 mt-2">
          <SelectValue placeholder={`Selecione a ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.id} value={option.id}>
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{
                    backgroundColor: option.color,
                    border: option.color === '#FFFFFF' || option.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none'
                  }} 
                />
                {option.name}
                {option.isNew && <Badge className="ml-2 bg-[#eb6824]">Novidade</Badge>}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ColorSelector;
