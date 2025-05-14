
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VisualizationArea from '@/components/visualizer/VisualizationArea';
import { RibbonColor, PackageColor, Combination } from '@/data/products';

interface AddCombinationDialogProps {
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  combinations: Combination[];
  addCombination: (combination: Omit<Combination, 'id'>) => void;
}

const AddCombinationDialog: React.FC<AddCombinationDialogProps> = ({
  ribbonColors,
  packageColors,
  combinations,
  addCombination
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const selectedRibbon = ribbonColors.find(r => r.id === selectedRibbonId);
  const selectedPackage = packageColors.find(p => p.id === selectedPackageId);
  
  const handleAddCombination = () => {
    if (!selectedRibbonId || !selectedPackageId) {
      toast({
        title: "Erro",
        description: "Selecione uma cor de fita e uma cor de embalagem.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if combination already exists
    const existingCombination = combinations.find(
      c => c.ribbonId === selectedRibbonId && c.packageId === selectedPackageId
    );
    
    if (existingCombination) {
      toast({
        title: "Combinação já existe",
        description: "Esta combinação de cores já foi adicionada.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, we would upload the image to a server here
    // For now, we'll just use the URL provided
    const newCombination = {
      ribbonId: selectedRibbonId,
      packageId: selectedPackageId,
      imageUrl: imageUrl || previewImage || ''
    };
    
    addCombination(newCombination);
    
    toast({
      title: "Combinação adicionada",
      description: "A nova combinação foi adicionada com sucesso."
    });
    
    // Reset form
    setSelectedRibbonId('');
    setSelectedPackageId('');
    setImageUrl('');
    setPreviewImage(null);
    setIsOpen(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Combinação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Combinação</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
          
          <div className="space-y-2">
            <Label>Imagem da Combinação (Opcional)</Label>
            <div className="flex flex-col space-y-2">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <Label 
                htmlFor="image-upload" 
                className="flex items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
              >
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Clique para selecionar uma imagem</span>
                </div>
              </Label>
              {previewImage && (
                <div className="relative h-32 w-full rounded-md overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="Prévia" 
                    className="h-full w-full object-contain" 
                  />
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="absolute top-1 right-1"
                    onClick={() => setPreviewImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Ou forneça uma URL de imagem:
            </p>
            <Input 
              type="text" 
              placeholder="https://exemplo.com/imagem.jpg" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddCombination}>
            Adicionar Combinação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCombinationDialog;
