
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { ColorFormValues } from './types';
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
  
  const [editingColorData, setEditingColorData] = useState<ColorFormValues | null>(null);
  
  const handleAddPackage = (data: ColorFormValues) => {
    if (editingPackage) {
      updatePackageColor(editingPackage, data);
      toast({
        title: "Cor de embalagem atualizada",
        description: `A cor ${data.name} foi atualizada com sucesso.`,
      });
    } else {
      const newId = (packageColors.length + 1).toString();
      addPackageColor({ 
        id: newId, 
        ...data
      });
      toast({
        title: "Cor de embalagem adicionada",
        description: `A cor ${data.name} foi adicionada com sucesso.`,
      });
    }
    setIsAddingPackage(false);
    setEditingPackage(null);
    setEditingColorData(null);
  };
  
  const handleEditPackage = (id: string) => {
    const pkg = packageColors.find(p => p.id === id);
    if (pkg) {
      setEditingColorData({
        name: pkg.name,
        code: pkg.code,
        color: pkg.color,
        isNew: pkg.isNew || false,
        imageUrl: pkg.imageUrl || '',
      });
      setEditingPackage(id);
      setIsAddingPackage(true);
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
      setEditingColorData(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Cores de Embalagens Disponíveis</h3>
        <DialogTrigger asChild>
          <Button onClick={() => {
            setEditingPackage(null);
            setEditingColorData(null);
          }}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Cor de Embalagem
          </Button>
        </DialogTrigger>
      </div>
      
      <PackageColorList 
        colors={packageColors} 
        onEditColor={handleEditPackage} 
        onRemoveColor={handleRemovePackage}
      />
      
      <PackageColorFormDialog 
        isOpen={isAddingPackage}
        onOpenChange={handleOpenChange}
        onSubmit={handleAddPackage}
        editingColor={editingColorData}
        isEditing={!!editingPackage}
      />
    </div>
  );
};

export default PackageColorManagement;
