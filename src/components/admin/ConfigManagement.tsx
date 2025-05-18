
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useProductsStore } from '@/data/store';
import { Phone, Save, Image } from "lucide-react";
import BannerImageUploader from './BannerImageUploader';

const ConfigManagement: React.FC = () => {
  const { whatsappNumber, headerImageUrl, bannerText, setWhatsappNumber, setHeaderImageUrl, setBannerText } = useProductsStore();
  const [tempWhatsappNumber, setTempWhatsappNumber] = useState(whatsappNumber);
  const [tempHeaderImageUrl, setTempHeaderImageUrl] = useState(headerImageUrl || '');
  const [tempBannerText, setTempBannerText] = useState(bannerText || '');
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    
    setTimeout(() => {
      setWhatsappNumber(tempWhatsappNumber);
      toast({
        title: "Configurações atualizadas",
        description: "O número de WhatsApp foi salvo com sucesso.",
      });
      setIsLoading(false);
    }, 500);
  };

  const handleSaveHeaderImage = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setHeaderImageUrl(tempHeaderImageUrl);
      toast({
        title: "Imagem de cabeçalho atualizada",
        description: "A imagem de cabeçalho foi salva com sucesso.",
      });
      setIsLoading(false);
    }, 500);
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempHeaderImageUrl(url);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
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
                  className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-[#eb6824]"
                  disabled={isLoading}
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
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618] transition-all duration-300"
              disabled={isLoading}
            >
              <Phone className="mr-2 h-4 w-4" />
              {isLoading ? "Salvando..." : "Salvar Número de WhatsApp"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 rounded-3xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="headerImage" className="text-center block">Imagem de Cabeçalho</Label>
              <div className="flex flex-col items-center space-y-4">
                {tempHeaderImageUrl && (
                  <div className="mb-2 transition-all duration-300 hover:scale-105">
                    <img 
                      src={tempHeaderImageUrl} 
                      alt="Header atual" 
                      className="max-h-40 rounded-lg border shadow-sm" 
                    />
                  </div>
                )}
                <Input 
                  id="headerImageFile" 
                  type="file" 
                  accept="image/*"
                  onChange={handleHeaderImageChange}
                  className="max-w-md"
                  disabled={isLoading}
                />
              </div>
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
                    <img 
                      src="/lovable-uploads/f59e834a-effd-4659-a7d2-ac466e9aa740.png" 
                      alt="La Badiane Bem Casados"
                      className="h-16 filter brightness-0 invert" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleSaveHeaderImage}
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618] transition-all duration-300"
              disabled={isLoading}
            >
              <Image className="mr-2 h-4 w-4" />
              {isLoading ? "Salvando..." : "Salvar Imagem de Cabeçalho"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigManagement;
