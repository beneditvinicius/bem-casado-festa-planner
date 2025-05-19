
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ObservationsInputProps {
  observations: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ObservationsInput: React.FC<ObservationsInputProps> = ({
  observations,
  handleInputChange
}) => {
  return (
    <div className="text-center">
      <Label htmlFor="observations" className="text-base">Observações (opcional)</Label>
      <Textarea
        id="observations"
        name="observations"
        value={observations || ""}
        onChange={handleInputChange}
        placeholder="Alguma observação sobre seu pedido?"
        className="min-h-[100px] rounded-2xl text-center"
      />
    </div>
  );
};
