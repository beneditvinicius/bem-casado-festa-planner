
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventInfoFormProps {
  formData: {
    eventDate: Date | undefined;
    eventLocation: string;
    eventType: string;
  };
  errors: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  const eventTypes = [
    { value: 'Casamento', label: 'Casamento' },
    { value: 'Aniversário', label: 'Aniversário' },
    { value: 'Formatura', label: 'Formatura' },
    { value: 'Nascimento', label: 'Nascimento' },
    { value: 'Inauguração', label: 'Inauguração' },
    { value: 'Lançamento', label: 'Lançamento' },
    { value: 'Corporativo', label: 'Corporativo' },
  ];
  
  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-medium">Informações do Evento</h3>
      
      <div className="space-y-2">
        <Label htmlFor="eventDate" className="text-base">Data do Evento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full h-10 font-normal justify-start text-left rounded-xl ${errors.eventDate ? 'border-red-500' : ''}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.eventDate ? (
                format(formData.eventDate, "PPP", { locale: ptBR })
              ) : (
                <span>Selecione a data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.eventDate}
              onSelect={handleDateChange}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
        {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="eventType" className="text-base">Natureza do Evento</Label>
        <Select
          value={formData.eventType}
          onValueChange={(value) => handleSelectChange('eventType', value)}
        >
          <SelectTrigger 
            className={`w-full h-10 rounded-xl ${errors.eventType ? 'border-red-500' : ''}`}
          >
            <SelectValue placeholder="Selecione o tipo de evento" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="eventLocation" className="text-base">Local do Evento</Label>
        <Input
          id="eventLocation"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleInputChange}
          placeholder="Local do evento"
          className={`rounded-xl text-center ${errors.eventLocation ? 'border-red-500' : ''}`}
        />
        {errors.eventLocation && <p className="text-red-500 text-sm">{errors.eventLocation}</p>}
      </div>
    </div>
  );
};

export default EventInfoForm;
