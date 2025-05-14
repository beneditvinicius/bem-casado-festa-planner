
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useProductsStore } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

const Visualizer: React.FC = () => {
  const { toast } = useToast();
  const ribbonColors = useProductsStore(state => state.ribbonColors);
  const packageColors = useProductsStore(state => state.packageColors);
  const combinations = useProductsStore(state => state.combinations);
  const isMobile = useIsMobile();
  
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>(ribbonColors[0]?.id || '');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packageColors[0]?.id || '');
  
  // Get the selected ribbon and package
  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);
  
  // Get image paths based on color codes
  const getRibbonImagePath = (code: string) => `/fita_${code.toLowerCase()}.png`;
  const getPackageImagePath = (code: string) => `/embalagem_${code.toLowerCase()}.png`;
  
  // Check if the images exist
  const [ribbonImageExists, setRibbonImageExists] = useState<boolean>(false);
  const [packageImageExists, setPackageImageExists] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if ribbon image exists
    if (selectedRibbon?.code) {
      const ribbonPath = getRibbonImagePath(selectedRibbon.code);
      const img = new Image();
      img.onload = () => setRibbonImageExists(true);
      img.onerror = () => {
        setRibbonImageExists(false);
        console.log(`Ribbon image not found: ${ribbonPath}`);
      };
      img.src = ribbonPath;
    }
    
    // Check if package image exists
    if (selectedPackage?.code) {
      const packagePath = getPackageImagePath(selectedPackage.code);
      const img = new Image();
      img.onload = () => setPackageImageExists(true);
      img.onerror = () => {
        setPackageImageExists(false);
        console.log(`Package image not found: ${packagePath}`);
      };
      img.src = packagePath;
    }
  }, [selectedRibbonId, selectedPackageId, selectedRibbon?.code, selectedPackage?.code]);
  
  // Try to get fallback combination image if separate images don't exist
  const fallbackCombinationImage = combinations.find(
    c => c.ribbonId === selectedRibbonId && c.packageId === selectedPackageId
  )?.imageUrl || '';
  
  const ribbonImagePath = selectedRibbon?.code ? getRibbonImagePath(selectedRibbon.code) : '';
  const packageImagePath = selectedPackage?.code ? getPackageImagePath(selectedPackage.code) : '';
  
  const hasValidImages = ribbonImageExists && packageImageExists;
  const hasFallbackImage = Boolean(fallbackCombinationImage);
  
  const handleRibbonChange = (value: string) => {
    setSelectedRibbonId(value);
    const ribbon = ribbonColors.find(r => r.id === value);
    if (ribbon) {
      toast({
        title: `Fita selecionada: ${ribbon.name}`,
        description: ribbon.code ? `Código: ${ribbon.code}` : undefined,
        duration: 2000,
      });
    }
  };
  
  const handlePackageChange = (value: string) => {
    setSelectedPackageId(value);
    const pkg = packageColors.find(p => p.id === value);
    if (pkg) {
      toast({
        title: `Embalagem selecionada: ${pkg.name}`,
        description: pkg.code ? `Código: ${pkg.code}` : undefined,
        duration: 2000,
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6 card-content">
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="ribbon" className="text-base sm:text-lg">Escolha a cor da fita</Label>
              <Select value={selectedRibbonId} onValueChange={handleRibbonChange}>
                <SelectTrigger id="ribbon" className="h-10 sm:h-12 mt-2">
                  <SelectValue placeholder="Selecione a cor da fita" />
                </SelectTrigger>
                <SelectContent>
                  {ribbonColors.map(color => (
                    <SelectItem key={color.id} value={color.id}>
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{
                            backgroundColor: color.color,
                            border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none'
                          }} 
                        />
                        {color.name} {color.code && `(${color.code})`}
                        {color.isNew && <Badge className="ml-2 bg-[#eb6824]">Novidade</Badge>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="package" className="text-base sm:text-lg">Escolha a cor da embalagem</Label>
              <Select value={selectedPackageId} onValueChange={handlePackageChange}>
                <SelectTrigger id="package" className="h-10 sm:h-12 mt-2">
                  <SelectValue placeholder="Selecione a cor da embalagem" />
                </SelectTrigger>
                <SelectContent>
                  {packageColors.map(color => (
                    <SelectItem key={color.id} value={color.id}>
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{
                            backgroundColor: color.color,
                            border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none'
                          }} 
                        />
                        {color.name} {color.code && `(${color.code})`}
                        {color.isNew && <Badge className="ml-2 bg-[#eb6824]">Novidade</Badge>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-8">
            <AspectRatio ratio={16 / 10} className="bg-muted rounded-md overflow-hidden">
              {hasValidImages && (
                <div className="relative w-full h-full">
                  <img 
                    src={packageImagePath} 
                    alt={`Embalagem ${selectedPackage?.name}`} 
                    className="w-full h-full object-contain absolute top-0 left-0 z-0"
                  />
                  <img 
                    src={ribbonImagePath} 
                    alt={`Fita ${selectedRibbon?.name}`} 
                    className="w-full h-full object-contain absolute top-0 left-0 z-10"
                  />
                </div>
              )}
              
              {!hasValidImages && hasFallbackImage && (
                <img 
                  src={fallbackCombinationImage} 
                  alt="Visualização da combinação" 
                  className="w-full h-full object-contain" 
                />
              )}
              
              {!hasValidImages && !hasFallbackImage && (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <div className="w-48 sm:w-56 h-28 sm:h-32 mx-auto relative bg-white rounded shadow-md border">
                    {/* Representação visual simples quando não há imagem */}
                    <div 
                      className="absolute inset-0 m-4 border" 
                      style={{
                        backgroundColor: selectedPackage?.color || '#FFFFFF'
                      }}
                    ></div>
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1.5" 
                      style={{
                        backgroundColor: selectedRibbon?.color || '#000000'
                      }}
                    ></div>
                  </div>
                  <div className="flex items-start mt-4 justify-center">
                    <Info className="h-5 w-5 text-amber-800 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-left text-sm text-amber-800">
                      Esta combinação de cores não possui uma imagem disponível no momento.<br />
                      Acesse o painel administrativo para adicionar mais imagens de combinações.
                    </p>
                  </div>
                </div>
              )}
            </AspectRatio>
            
            {/* Debug info for development */}
            <div className="mt-3 bg-gray-100 p-3 rounded-md text-xs text-gray-700">
              <p>Debug info:</p>
              <ul className="list-disc pl-5">
                <li>Ribbon ID: {selectedRibbonId} / Code: {selectedRibbon?.code}</li>
                <li>Package ID: {selectedPackageId} / Code: {selectedPackage?.code}</li>
                <li>Ribbon image: {ribbonImagePath} ({ribbonImageExists ? 'Found' : 'Not found'})</li>
                <li>Package image: {packageImagePath} ({packageImageExists ? 'Found' : 'Not found'})</li>
                <li>Fallback image: {fallbackCombinationImage ? fallbackCombinationImage : 'None available'}</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 sm:p-4 rounded-md border border-amber-200">
            <p className="text-sm text-amber-800">
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
