
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CommonFieldsProps {
  name: string;
  isNew?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (checked: boolean) => void;
}

const CommonFields: React.FC<CommonFieldsProps> = ({
  name,
  isNew,
  onChange,
  onCheckboxChange
}) => {
  return (
    <>
      <div className="space-y-2 text-center">
        <Label htmlFor="name" className="text-center">Nome</Label>
        <Input
          id="name"
          name="name"
          placeholder="Digite o nome"
          value={name}
          onChange={onChange}
          className="rounded-full text-center"
          required
        />
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Checkbox 
          id="isNew" 
          checked={isNew} 
          onCheckedChange={onCheckboxChange}
        />
        <Label htmlFor="isNew" className="text-sm">Marcar como novidade</Label>
      </div>
    </>
  );
};

export default CommonFields;
