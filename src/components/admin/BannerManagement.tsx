
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useConfigStore } from '@/data/products';
import { useToast } from "@/hooks/use-toast";

const BannerManagement: React.FC = () => {
  const { toast } = useToast();
  // Use headerImageUrl instead of bannerUrl
  const { headerImageUrl, setHeaderImageUrl } = useConfigStore();
  const [tempBannerUrl, setTempBannerUrl] = useState(headerImageUrl || '');

  const handleSave = () => {
    setHeaderImageUrl(tempBannerUrl);
    toast({
      title: "Banner atualizado",
      description: "O banner foi atualizado com sucesso.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-xl">
        <CardContent className="pt-6">
          <h3 className="text-xl font-medium mb-4">Configuração do Banner</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="banner-url">URL da Imagem do Banner</Label>
              <Input
                id="banner-url"
                value={tempBannerUrl}
                onChange={(e) => setTempBannerUrl(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="mb-2"
              />
            </div>
            
            <Button 
              onClick={handleSave}
              className="w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              Salvar Banner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannerManagement;
