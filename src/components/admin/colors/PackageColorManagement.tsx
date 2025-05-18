
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { PackageColor } from '@/data/types';
import PackageColorList from './components/PackageColorList';
import PackageColorFormDialog from './components/PackageColorFormDialog';
import ItemFormModal from './components/ItemFormModal';

export const PackageColorManagement: React.FC = () => {
  const { 
    packageColors, 
    addPackageColor, 
    removePackageColor, 
    updatePackageColor 
  } = useProductsStore();
  
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageColor | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();
  
  const handleAddPackage = (data: Partial<PackageColor>) => {
    // When adding a new color, ensure we explicitly provide all required fields
    const newPackageColor: PackageColor = {
      id: (packageColors.length + 1).toString(),
      name: data.name || '',
      code: data.code || '',
      color: data.color || '#FFFFFF',
      isNew: data.isNew || false,
      imageUrl: data.imageUrl
    };
    
    addPackageColor(newPackageColor);
    
    toast({
      title: "Cor de embalagem adicionada",
      description: `A cor ${data.name} foi adicionada com sucesso.`,
    });
    
    setIsAddingPackage(false);
  };
  
  const handleEditPackage = (id: string) => {
    const packageColor = packageColors.find(p => p.id === id);
    if (packageColor) {
      setEditingPackage(packageColor);
      setIsEditModalOpen(true);
    }
  };
  
  const handleUpdatePackage = (data: Partial<PackageColor>) => {
    if (editingPackage) {
      updatePackageColor(editingPackage.id, data);
      toast({
        title: "Cor de embalagem atualizada",
        description: `A cor ${data.name || editingPackage.name} foi atualizada com sucesso.`,
      });
      setEditingPackage(null);
      setIsEditModalOpen(false);
    }
  };
  
  const handleRemovePackage = (id: string) => {
    removePackageColor(id);
    toast({
      title: "Cor de embalagem removida",
      description: "A cor de embalagem foi removida com sucesso.",
    });
  };
  
  const handleOpenChange = (open: boolean) => {
    setIsAddingPackage(open);
    if (!open) {
      setEditingPackage(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-center">Cores de Embalagens Disponíveis</h3>
        <Button 
          onClick={() => {
            setIsAddingPackage(true);
          }}
          className="rounded-full"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Cor de Embalagem
        </Button>
      </div>
      
      <PackageColorList 
        colors={packageColors} 
        onEditColor={handleEditPackage} 
        onRemoveColor={handleRemovePackage}
      />
      
      <PackageColorFormDialog 
        open={isAddingPackage}
        onOpenChange={handleOpenChange}
        onSubmit={handleAddPackage}
        initialValues={undefined}
      />
      
      {editingPackage && (
        <ItemFormModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          initialValues={editingPackage}
          onSubmit={handleUpdatePackage}
          itemType="package"
          title="Editar Cor de Embalagem"
        />
      )}
    </div>
  );
};

export default PackageColorManagement;
