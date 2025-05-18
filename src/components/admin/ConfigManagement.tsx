
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useProductsStore } from '@/data/store';
import { MessageSquare, Image } from "lucide-react";

const ConfigManagement: React.FC = () => {
  const { whatsappNumber, headerImageUrl, setWhatsappNumber, setHeaderImageUrl } = useProductsStore();
  const [tempWhatsappNumber, setTempWhatsappNumber] = useState(whatsappNumber);
  const [tempHeaderImageUrl, setTempHeaderImageUrl] = useState(headerImageUrl || '');
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

  const handleRemoveHeaderImage = () => {
    setTempHeaderImageUrl('');
    setHeaderImageUrl('');
    toast({
      title: "Imagem removida",
      description: "A imagem de cabeçalho foi removida com sucesso.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h3 className="text-lg font-medium text-center mb-4">Configurações Gerais</h3>
      
      <Card className="mb-6 rounded-3xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number" className="text-center block">Número de WhatsApp (com código do país)</Label>
              <div className="flex gap-2 items-center">
                <MessageSquare className="text-[#eb6824]" />
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
                Atualmente configurado: {whatsappNumber || "Não configurado"}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleSaveWhatsapp}
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618] transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Atualizar Número"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 rounded-3xl">
        <CardContent className="pt-6">
          <h4 className="text-lg font-medium text-center mb-4">Foto de Cabeçalho</h4>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Faça upload de uma imagem para ser usada como background do cabeçalho do site. 
              Recomendamos uma imagem de alta qualidade com dimensões mínimas de 1200×400 pixels.
            </p>
            
            {tempHeaderImageUrl && (
              <div className="flex justify-center">
                <div className="relative w-64 h-64 border-2 border-dashed border-[#eb6824] rounded-full overflow-hidden">
                  <img 
                    src={tempHeaderImageUrl} 
                    alt="Imagem do cabeçalho" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <Input 
                  id="headerImageFile" 
                  type="file" 
                  accept="image/*"
                  onChange={handleHeaderImageChange}
                  className="mx-auto max-w-md"
                  disabled={isLoading}
                />
              </div>
                
              <div className="flex justify-center space-x-4 mt-4">
                <Button 
                  variant="outline"
                  onClick={handleRemoveHeaderImage}
                  className="rounded-full"
                  disabled={!tempHeaderImageUrl || isLoading}
                >
                  Remover imagem
                </Button>
                
                <Button 
                  onClick={handleSaveHeaderImage}
                  className="rounded-full bg-[#eb6824] hover:bg-[#d25618] transition-all duration-300"
                  disabled={!tempHeaderImageUrl || isLoading}
                >
                  <Image className="mr-2 h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar imagem"}
                </Button>
              </div>
            </div>

            <div className="mb-4 rounded-xl overflow-hidden border mt-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigManagement;
