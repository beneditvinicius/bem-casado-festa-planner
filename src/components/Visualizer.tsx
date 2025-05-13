
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { useProductsStore, Combination } from '@/data/products';

const Visualizer: React.FC = () => {
  const ribbonColors = useProductsStore((state) => state.ribbonColors);
  const packageColors = useProductsStore((state) => state.packageColors);
  const combinations = useProductsStore((state) => state.combinations);
  
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>(ribbonColors[0]?.id || '');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packageColors[0]?.id || '');
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (selectedRibbonId && selectedPackageId) {
      const combo = combinations.find(
        c => c.ribbonId === selectedRibbonId && c.packageId === selectedPackageId
      );
      
      if (combo) {
        setImageSrc(combo.imageUrl);
      } else {
        // Fallback se a combinação não existir
        setImageSrc('');
      }
    }
  }, [selectedRibbonId, selectedPackageId, combinations]);

  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ribbon" className="text-lg">Escolha a cor da fita</Label>
              <Select 
                value={selectedRibbonId} 
                onValueChange={setSelectedRibbonId}
              >
                <SelectTrigger id="ribbon" className="h-12 mt-2">
                  <SelectValue placeholder="Selecione a cor da fita" />
                </SelectTrigger>
                <SelectContent>
                  {ribbonColors.map((color) => (
                    <SelectItem key={color.id} value={color.id}>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none' }}
                        />
                        {color.name} {color.code}
                        {color.isNew && (
                          <Badge className="ml-2 bg-[#eb6824]">Novidade</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="package" className="text-lg">Escolha a cor da embalagem</Label>
              <Select 
                value={selectedPackageId} 
                onValueChange={setSelectedPackageId}
              >
                <SelectTrigger id="package" className="h-12 mt-2">
                  <SelectValue placeholder="Selecione a cor da embalagem" />
                </SelectTrigger>
                <SelectContent>
                  {packageColors.map((color) => (
                    <SelectItem key={color.id} value={color.id}>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none' }}
                        />
                        {color.name} {color.code}
                        {color.isNew && (
                          <Badge className="ml-2 bg-[#eb6824]">Novidade</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt="Visualização da combinação"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  <div className="w-56 h-32 mx-auto relative bg-white rounded shadow-md border">
                    {/* Representação visual simples quando não há imagem */}
                    <div 
                      className="absolute inset-0 m-4 border"
                      style={{ backgroundColor: packageColors.find(c => c.id === selectedPackageId)?.color || '#FFFFFF' }}
                    ></div>
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1.5"
                      style={{ backgroundColor: ribbonColors.find(c => c.id === selectedRibbonId)?.color || '#000000' }}
                    ></div>
                  </div>
                  <div className="flex items-start mt-4 justify-center">
                    <Info className="h-5 w-5 text-amber-800 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-left text-amber-800">
                      Esta combinação de cores não possui uma imagem disponível no momento.<br/>
                      Acesse o painel administrativo para adicionar mais imagens de combinações.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
            <p className="text-amber-800 text-sm">
              As cores exibidas na tela podem variar ligeiramente das cores reais dos produtos devido às configurações do seu dispositivo.
              Para uma visualização mais precisa, recomendamos solicitar amostras físicas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Visualizer;
