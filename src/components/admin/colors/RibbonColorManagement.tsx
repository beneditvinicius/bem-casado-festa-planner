
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { RibbonColor } from '@/data/types';
import RibbonColorList from './components/RibbonColorList';
import RibbonColorFormDialog from './components/RibbonColorFormDialog';
import ItemFormModal from './components/ItemFormModal';

export const RibbonColorManagement: React.FC = () => {
  const { 
    ribbonColors, 
    addRibbonColor, 
    removeRibbonColor, 
    updateRibbonColor 
  } = useProductsStore();
  
  const [isAddingRibbon, setIsAddingRibbon] = useState(false);
  const [editingRibbon, setEditingRibbon] = useState<RibbonColor | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();
  
  const handleAddRibbon = (data: Partial<RibbonColor>) => {
    const newId = (ribbonColors.length + 1).toString();
    addRibbonColor({ 
      id: newId, 
      name: data.name || '',
      code: data.code || '',
      color: data.color || '#FFFFFF', 
      isNew: data.isNew || false,
      imageUrl: data.imageUrl || undefined
    });
    
    toast({
      title: "Cor de fita adicionada",
      description: `A cor ${data.name} foi adicionada com sucesso.`,
    });
    
    setIsAddingRibbon(false);
  };
  
  const handleEditRibbon = (id: string) => {
    const ribbon = ribbonColors.find(r => r.id === id);
    if (ribbon) {
      setEditingRibbon(ribbon);
      setIsEditModalOpen(true);
    }
  };
  
  const handleUpdateRibbon = (data: Partial<RibbonColor>) => {
    if (editingRibbon) {
      updateRibbonColor(editingRibbon.id, data);
      toast({
        title: "Cor de fita atualizada",
        description: `A cor ${data.name || editingRibbon.name} foi atualizada com sucesso.`,
      });
      setEditingRibbon(null);
      setIsEditModalOpen(false);
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
    setIsAddingRibbon(true);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-center">Cores de Fitas Disponíveis</h3>
        <Button onClick={handleOpenAddDialog} className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Cor de Fita
        </Button>
      </div>
      
      <RibbonColorList 
        colors={ribbonColors} 
        onEditColor={handleEditRibbon} 
        onRemoveColor={handleRemoveRibbon}
      />
      
      <RibbonColorFormDialog 
        open={isAddingRibbon} 
        onOpenChange={setIsAddingRibbon}
        onSubmit={handleAddRibbon}
        initialValues={undefined}
      />
      
      {editingRibbon && (
        <ItemFormModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          initialValues={editingRibbon}
          onSubmit={handleUpdateRibbon}
          itemType="ribbon"
          title="Editar Cor de Fita"
        />
      )}
    </div>
  );
};

export default RibbonColorManagement;
