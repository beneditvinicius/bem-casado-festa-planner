
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useProductsStore } from '@/data/store';
import { Flavor } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import FlavorList from './components/FlavorList';
import FlavorFormDialog from './components/FlavorFormDialog';

const FlavorManagement = () => {
  const { flavors, addFlavor, updateFlavor, removeFlavor } = useProductsStore();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | undefined>(undefined);

  const handleAddFlavor = (flavorData: Partial<Flavor>) => {
    const newFlavor: Flavor = {
      id: uuidv4(),
      name: flavorData.name || 'Novo Sabor',
      price: flavorData.price || 0,
      categoryId: flavorData.categoryId || 'default',
      isNew: flavorData.isNew || false,
    };

    addFlavor(newFlavor);
    
    toast({
      title: "Sabor adicionado",
      description: `${newFlavor.name} foi adicionado com sucesso.`,
    });
  };

  const handleUpdateFlavor = (flavorData: Partial<Flavor>) => {
    if (selectedFlavor?.id) {
      updateFlavor(selectedFlavor.id, flavorData);
      
      toast({
        title: "Sabor atualizado",
        description: `${flavorData.name || selectedFlavor.name} foi atualizado com sucesso.`,
      });
    }
  };

  const handleDeleteFlavor = (id: string) => {
    const flavorToDelete = flavors.find(flavor => flavor.id === id);
    
    if (flavorToDelete) {
      removeFlavor(id);
      
      toast({
        title: "Sabor removido",
        description: `${flavorToDelete.name} foi removido com sucesso.`,
      });
    }
  };

  const handleEditClick = (flavor: Flavor) => {
    setSelectedFlavor(flavor);
    setIsDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setSelectedFlavor(undefined);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (data: Partial<Flavor>) => {
    if (selectedFlavor) {
      handleUpdateFlavor(data);
    } else {
      handleAddFlavor(data);
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sabores</CardTitle>
        <Button onClick={handleAddNewClick} className="ml-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Sabor
        </Button>
      </CardHeader>
      <CardContent>
        <FlavorList 
          flavors={flavors} 
          onEditFlavor={handleEditClick}
          onDeleteFlavor={handleDeleteFlavor}
        />
        
        <FlavorFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleDialogSubmit}
          initialValues={selectedFlavor}
        />
      </CardContent>
    </Card>
  );
};

export default FlavorManagement;
