
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { RibbonColor, PackageColor } from '@/data/products';
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface ColorSelectorsProps {
  formData: {
    ribbonId: string;
    packageId: string;
  };
  errors: { [key: string]: string };
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  handleSelectChange: (name: string, value: string) => void;
  onVisualizerClick: () => void;
}

export const ColorSelectors: React.FC<ColorSelectorsProps> = ({
  formData,
  errors,
  ribbonColors,
  packageColors,
  handleSelectChange,
  onVisualizerClick
}) => {
  // Force re-render when formData.ribbonId or formData.packageId changes
  const ribbonId = formData.ribbonId || (ribbonColors.length > 0 ? ribbonColors[0].id : '');
  const packageId = formData.packageId || (packageColors.length > 0 ? packageColors[0].id : '');

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button 
          type="button"
          onClick={onVisualizerClick}
          className="rounded-full bg-[#eb6824] hover:bg-[#d25618] text-white"
        >
          <Palette className="mr-2 h-4 w-4" />
          Teste as cores do bem casado
        </Button>
      </div>
      
      <div>
        <Label htmlFor="ribbonColor" className="text-base">Cor da Fita</Label>
        <Select 
          key={`ribbon-${ribbonId}`}
          value={ribbonId}
          onValueChange={(value) => handleSelectChange('ribbonId', value)}
        >
          <SelectTrigger id="ribbonColor" className={cn("h-12", errors.ribbonId && "border-red-500")}>
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
                  {color.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.ribbonId && <p className="text-red-500 text-sm mt-1">{errors.ribbonId}</p>}
      </div>
      
      <div>
        <Label htmlFor="packageColor" className="text-base">Cor da Embalagem</Label>
        <Select 
          key={`package-${packageId}`}
          value={packageId}
          onValueChange={(value) => handleSelectChange('packageId', value)}
        >
          <SelectTrigger id="packageColor" className={cn("h-12", errors.packageId && "border-red-500")}>
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
                  {color.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
      </div>
    </div>
  );
};
