
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { ColorFormValues } from './types';
import RibbonColorList from './components/RibbonColorList';
import RibbonColorFormDialog from './components/RibbonColorFormDialog';

export const RibbonColorManagement: React.FC = () => {
  const { 
    ribbonColors, 
    addRibbonColor, 
    removeRibbonColor, 
    updateRibbonColor 
  } = useProductsStore();
  
  const [isAddingRibbon, setIsAddingRibbon] = useState(false);
  const [editingRibbon, setEditingRibbon] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  
  const { toast } = useToast();
  
  const handleAddRibbon = (data: ColorFormValues) => {
    // Use previewImage se disponível, caso contrário, use o imageUrl do formulário
    const finalImageUrl = previewImage || imageUrl;
    
    if (editingRibbon) {
      updateRibbonColor(editingRibbon, {
        ...data,
        imageUrl: finalImageUrl
      });
      toast({
        title: "Cor de fita atualizada",
        description: `A cor ${data.name} foi atualizada com sucesso.`,
      });
    } else {
      const newId = (ribbonColors.length + 1).toString();
      addRibbonColor({ 
        id: newId, 
        name: data.name, 
        code: data.code, 
        color: data.color, 
        isNew: data.isNew || false,
        imageUrl: finalImageUrl
      });
      toast({
        title: "Cor de fita adicionada",
        description: `A cor ${data.name} foi adicionada com sucesso.`,
      });
    }
    setIsAddingRibbon(false);
    setEditingRibbon(null);
    setPreviewImage(null);
    setImageUrl('');
  };
  
  const editRibbon = (id: string) => {
    const ribbon = ribbonColors.find(r => r.id === id);
    if (ribbon) {
      setImageUrl(ribbon.imageUrl || '');
      setPreviewImage(ribbon.imageUrl || null);
      setEditingRibbon(id);
      setIsAddingRibbon(true);
    }
  };
  
  const handleRemoveRibbon = (id: string) => {
    removeRibbonColor(id);
    toast({
      title: "Cor de fita removida",
      description: "A cor de fita foi removida com sucesso.",
    });
  };
  
  const handleOpenAddDialog = () => {
    setEditingRibbon(null);
    setPreviewImage(null);
    setImageUrl('');
    setIsAddingRibbon(true);
  };
  
  // Find the initial values for the form if editing a ribbon
  const initialValues = editingRibbon 
    ? ribbonColors.find(r => r.id === editingRibbon) 
    : undefined;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Cores de Fitas Disponíveis</h3>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Cor de Fita
        </Button>
      </div>
      
      <RibbonColorList 
        colors={ribbonColors} 
        onEditColor={editRibbon} 
        onRemoveColor={handleRemoveRibbon}
      />
      
      <RibbonColorFormDialog 
        open={isAddingRibbon} 
        onOpenChange={setIsAddingRibbon}
        onSubmit={handleAddRibbon}
        editingRibbon={editingRibbon}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        initialValues={initialValues}
      />
    </div>
  );
};

export default RibbonColorManagement;
