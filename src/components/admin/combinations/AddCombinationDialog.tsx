
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RibbonColor, PackageColor, Combination } from '@/data/products';
import CombinationPreview from './components/CombinationPreview';
import CombinationImageUploader from './components/CombinationImageUploader';

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
          <CombinationPreview 
            ribbonColors={ribbonColors}
            packageColors={packageColors}
            selectedRibbonId={selectedRibbonId}
            selectedPackageId={selectedPackageId}
            setSelectedRibbonId={setSelectedRibbonId}
            setSelectedPackageId={setSelectedPackageId}
            previewImage={previewImage}
          />
          
          <CombinationImageUploader 
            previewImage={previewImage}
            imageUrl={imageUrl}
            setPreviewImage={setPreviewImage}
            setImageUrl={setImageUrl}
          />
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
