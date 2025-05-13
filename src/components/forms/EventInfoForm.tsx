
import React from 'react';
import { format, isBefore } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface EventInfoFormProps {
  formData: {
    eventDate: Date | undefined;
    eventLocation: string;
  };
  errors: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Date | undefined) => void;
}

const EventInfoForm: React.FC<EventInfoFormProps> = ({
  formData,
  errors,
  handleInputChange,
  handleDateChange,
}) => {
  // Add a ref to control popover state
  const popoverRef = React.useRef<HTMLButtonElement>(null);
  
  const handleDateSelect = (date: Date | undefined) => {
    handleDateChange(date);
    // Close popover after selection
    setTimeout(() => {
      if (popoverRef.current) {
        const popoverInstance = document.querySelector('[data-state="open"]');
        if (popoverInstance) {
          // This triggers the close action in the Radix UI popover
          document.body.click();
        }
      }
    }, 100);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Dados do Evento</h3>
      
      <div>
        <Label htmlFor="eventDate" className="text-base">Data do Evento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={popoverRef}
              variant="outline"
              className={cn(
                "w-full justify-start text-left h-12",
                !formData.eventDate && "text-muted-foreground",
                errors.eventDate && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.eventDate ? (
                format(formData.eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.eventDate}
              onSelect={handleDateSelect}
              initialFocus
              locale={ptBR}
              disabled={(date) => isBefore(date, new Date())}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
        <p className="text-sm text-muted-foreground mt-1">Mediante disponibilidade na nossa agenda</p>
      </div>
      
      <div>
        <Label htmlFor="eventLocation" className="text-base">Local do Evento / Cidade</Label>
        <Input
          id="eventLocation"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleInputChange}
          className={cn("h-12", errors.eventLocation && "border-red-500")}
        />
        {errors.eventLocation && <p className="text-red-500 text-sm mt-1">{errors.eventLocation}</p>}
      </div>
    </div>
  );
};

export default EventInfoForm;
