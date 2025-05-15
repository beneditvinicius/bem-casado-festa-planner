
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useConfigStore } from '@/data/products';
import { Image } from "lucide-react";
import BannerImageUploader from './BannerImageUploader';

const BannerManagement: React.FC = () => {
  const { bannerUrl, bannerText, setBannerUrl, setBannerText } = useConfigStore();
  const [tempBannerUrl, setTempBannerUrl] = useState(bannerUrl || '');
  const [tempBannerText, setTempBannerText] = useState(bannerText || '');
  const { toast } = useToast();

  const handleSave = () => {
    setBannerUrl(tempBannerUrl);
    setBannerText(tempBannerText);
    toast({
      title: "Banner atualizado",
      description: "As configurações do banner foram salvas com sucesso.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-lg font-medium text-center mb-4">Configurar Banner da Página Inicial</h3>
      
      <Card className="mb-6 rounded-3xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banner-text" className="text-center block">Texto do Banner</Label>
              <Input
                id="banner-text"
                value={tempBannerText}
                onChange={(e) => setTempBannerText(e.target.value)}
                placeholder="Digite o texto para exibir no banner"
              />
            </div>
            
            <div className="space-y-2 pb-4">
              <Label className="text-center block">Imagem do Banner</Label>
              <BannerImageUploader 
                imageUrl={tempBannerUrl}
                onChange={setTempBannerUrl}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6 rounded-3xl overflow-hidden border">
        <h4 className="text-base font-medium py-2 bg-gray-50 text-center">Prévia do Banner</h4>
        <div className="w-full h-48 relative">
          {tempBannerUrl ? (
            <img 
              src={tempBannerUrl} 
              alt="Prévia do Banner" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#fef2e6] flex items-center justify-center">
              <p className="text-[#eb6824] font-semibold px-4 py-2 text-center">
                {tempBannerText || "La Badiane Bem-Casados"}
              </p>
            </div>
          )}
          
          {tempBannerUrl && tempBannerText && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <h2 className="text-2xl text-white font-semibold px-4 py-2 text-center">
                {tempBannerText}
              </h2>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleSave}
          className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
        >
          <Image className="mr-2 h-4 w-4" /> Salvar Configurações do Banner
        </Button>
      </div>
    </div>
  );
};

export default BannerManagement;
