
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useConfigStore } from '@/data/products';
import { Phone, Save, Image } from "lucide-react";
import BannerImageUploader from './BannerImageUploader';

const ConfigManagement: React.FC = () => {
  const { whatsappNumber, headerImageUrl, setWhatsappNumber, setHeaderImageUrl } = useConfigStore();
  const [tempWhatsappNumber, setTempWhatsappNumber] = useState(whatsappNumber);
  const [tempHeaderImageUrl, setTempHeaderImageUrl] = useState(headerImageUrl || '');
  const { toast } = useToast();

  const handleSaveWhatsapp = () => {
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

  const handleSaveHeaderImage = () => {
    setHeaderImageUrl(tempHeaderImageUrl);
    toast({
      title: "Imagem de cabeçalho atualizada",
      description: "As configurações de imagem do cabeçalho foram salvas com sucesso.",
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
              onClick={handleSaveWhatsapp}
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              <Phone className="mr-2 h-4 w-4" /> Salvar Número de WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 rounded-3xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2 pb-4">
              <Label className="text-center block">Imagem do Cabeçalho</Label>
              <BannerImageUploader 
                imageUrl={tempHeaderImageUrl}
                onChange={setTempHeaderImageUrl}
              />
            </div>

            <div className="mb-4 rounded-xl overflow-hidden border">
              <h4 className="text-base font-medium py-2 bg-gray-50 text-center">Prévia do Cabeçalho</h4>
              <div className="w-full h-36 relative">
                {tempHeaderImageUrl ? (
                  <img 
                    src={tempHeaderImageUrl} 
                    alt="Prévia do Cabeçalho" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#eb6824] flex items-center justify-center">
                    <span className="text-white font-semibold">Fundo padrão (sem imagem)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleSaveHeaderImage}
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              <Image className="mr-2 h-4 w-4" /> Salvar Imagem de Cabeçalho
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigManagement;
