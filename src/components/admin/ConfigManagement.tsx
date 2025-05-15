
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useConfigStore } from '@/data/products';
import { Phone, Save } from "lucide-react";

const ConfigManagement: React.FC = () => {
  const { whatsappNumber, setWhatsappNumber } = useConfigStore();
  const [tempWhatsappNumber, setTempWhatsappNumber] = useState(whatsappNumber);
  const { toast } = useToast();

  const handleSave = () => {
    if (!tempWhatsappNumber) {
      toast({
        title: "Número inválido",
        description: "Por favor, insira um número de WhatsApp válido.",
        variant: "destructive"
      });
      return;
    }

    setWhatsappNumber(tempWhatsappNumber);
    toast({
      title: "Configurações atualizadas",
      description: "O número de WhatsApp foi salvo com sucesso.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-lg font-medium text-center mb-4">Configurações Gerais</h3>
      
      <Card className="mb-6 rounded-3xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number" className="text-center block">Número de WhatsApp</Label>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500">+</span>
                <Input
                  id="whatsapp-number"
                  value={tempWhatsappNumber}
                  onChange={(e) => setTempWhatsappNumber(e.target.value)}
                  placeholder="5565992000000"
                  type="tel"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                Formato: código do país + DDD + número (ex: 5565992000000)
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleSave}
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              <Save className="mr-2 h-4 w-4" /> Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigManagement;
