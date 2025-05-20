
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface SubmitButtonProps {
  onSubmit?: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-center'} pt-6`}>
      <Button 
        type="submit" 
        className={`h-12 rounded-full bg-[#eb6824] hover:bg-[#d25618] text-white ${isMobile ? 'w-full' : 'px-6'}`}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Enviar Pedido via WhatsApp
      </Button>
    </div>
  );
};

export default SubmitButton;
