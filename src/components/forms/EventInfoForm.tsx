
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventInfoFormProps {
  formData: {
    eventDate: Date | undefined;
    eventLocation: string;
    eventType: string;
  };
  errors: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const EventInfoForm: React.FC<EventInfoFormProps> = ({
  formData,
  errors,
  handleInputChange,
  handleDateChange,
  handleSelectChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center mb-4">Informações do Evento</h3>
      
      <div>
        <Label htmlFor="eventType" className="block text-gray-700 mb-1">
          Tipo de Evento *
        </Label>
        <Select 
          value={formData.eventType}
          onValueChange={(value) => handleSelectChange('eventType', value)}
        >
          <SelectTrigger className="w-full rounded-full border-gray-300">
            <SelectValue placeholder="Selecione o tipo de evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Casamento">Casamento</SelectItem>
            <SelectItem value="Aniversário">Aniversário</SelectItem>
            <SelectItem value="Batizado">Batizado</SelectItem>
            <SelectItem value="Chá de Bebê">Chá de Bebê</SelectItem>
            <SelectItem value="Corporativo">Evento Corporativo</SelectItem>
            <SelectItem value="Outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.eventType && (
          <p className="text-sm text-red-500 mt-1">{errors.eventType}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="eventDate" className="block text-gray-700 mb-1">
          Data do Evento *
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal rounded-full border-gray-300"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.eventDate ? (
                format(formData.eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.eventDate}
              onSelect={handleDateChange}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <Label htmlFor="eventLocation" className="block text-gray-700 mb-1">
          Local do Evento/Cidade
        </Label>
        <Input 
          type="text" 
          id="eventLocation"
          name="eventLocation"
          placeholder="Nome do local ou endereço do evento" 
          value={formData.eventLocation}
          onChange={handleInputChange}
          className="w-full rounded-full border-gray-300"
        />
      </div>
    </div>
  );
};

export default EventInfoForm;
