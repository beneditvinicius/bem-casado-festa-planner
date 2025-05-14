
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VisualizationArea from '@/components/visualizer/VisualizationArea';
import { RibbonColor, PackageColor } from '@/data/products';

interface CombinationPreviewProps {
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  selectedRibbonId: string;
  selectedPackageId: string;
  setSelectedRibbonId: (id: string) => void;
  setSelectedPackageId: (id: string) => void;
  previewImage: string | null;
}

const CombinationPreview: React.FC<CombinationPreviewProps> = ({
  ribbonColors,
  packageColors,
  selectedRibbonId,
  selectedPackageId,
  setSelectedRibbonId,
  setSelectedPackageId,
  previewImage
}) => {
  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="ribbon">Cor da Fita</Label>
        <Select value={selectedRibbonId} onValueChange={setSelectedRibbonId}>
          <SelectTrigger id="ribbon">
            <SelectValue placeholder="Selecione a cor da fita" />
          </SelectTrigger>
          <SelectContent>
            {ribbonColors.map(ribbon => (
              <SelectItem key={ribbon.id} value={ribbon.id}>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{
                      backgroundColor: ribbon.color,
                      border: ribbon.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none'
                    }} 
                  />
                  {ribbon.name} ({ribbon.code})
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="package">Cor da Embalagem</Label>
        <Select value={selectedPackageId} onValueChange={setSelectedPackageId}>
          <SelectTrigger id="package">
            <SelectValue placeholder="Selecione a cor da embalagem" />
          </SelectTrigger>
          <SelectContent>
            {packageColors.map(pkg => (
              <SelectItem key={pkg.id} value={pkg.id}>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{
                      backgroundColor: pkg.color,
                      border: pkg.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none'
                    }} 
                  />
                  {pkg.name} ({pkg.code})
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedRibbonId && selectedPackageId && (
        <div className="border p-4 rounded-md">
          <h4 className="text-sm font-medium mb-2">Prévia da Combinação</h4>
          <div className="h-40">
            <VisualizationArea 
              ribbonCode={selectedRibbon?.code}
              ribbonName={selectedRibbon?.name}
              ribbonColor={selectedRibbon?.color}
              packageCode={selectedPackage?.code}
              packageName={selectedPackage?.name}
              packageColor={selectedPackage?.color}
              fallbackCombinationImage={previewImage || ''}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CombinationPreview;
