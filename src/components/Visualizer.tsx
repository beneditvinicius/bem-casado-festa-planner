
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
        // Fallback if combination doesn't exist
        setImageSrc('');
      }
    }
  }, [selectedRibbonId, selectedPackageId, combinations]);

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
                          style={{ backgroundColor: color.color }}
                        />
                        {color.name}
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
                          style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none' }}
                        />
                        {color.name}
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
                <div className="text-muted-foreground">
                  Nenhuma imagem disponível para esta combinação
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Visualizer;
