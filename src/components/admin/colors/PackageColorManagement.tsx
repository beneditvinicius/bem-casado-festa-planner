
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { PackageColor } from '@/data/types';
import PackageColorList from './components/PackageColorList';
import PackageColorFormDialog from './components/PackageColorFormDialog';

export const PackageColorManagement: React.FC = () => {
  const { 
    packageColors, 
    addPackageColor, 
    removePackageColor, 
    updatePackageColor 
  } = useProductsStore();
  
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleAddPackage = (data: Partial<PackageColor>) => {
    if (editingPackage) {
      // Make sure we're passing all required properties when updating
      updatePackageColor(editingPackage, data);
      toast({
        title: "Cor de embalagem atualizada",
        description: `A cor ${data.name} foi atualizada com sucesso.`,
      });
    } else {
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
    }
    setIsAddingPackage(false);
    setEditingPackage(null);
  };
  
  const handleEditPackage = (id: string) => {
    setEditingPackage(id);
    setIsAddingPackage(true);
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

  // Find the initial values for the form if editing a package
  const initialValues = editingPackage 
    ? packageColors.find(p => p.id === editingPackage) 
    : undefined;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-center">Cores de Embalagens Disponíveis</h3>
        <Button 
          onClick={() => {
            setEditingPackage(null);
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
        initialValues={initialValues}
      />
    </div>
  );
};

export default PackageColorManagement;
