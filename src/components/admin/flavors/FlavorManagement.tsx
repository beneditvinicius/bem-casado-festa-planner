
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useProductsStore } from '@/data/store';
import { Flavor } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import FlavorList from './components/FlavorList';
import FlavorFormDialog from './components/FlavorFormDialog';

const FlavorManagement = () => {
  const { flavors, addFlavor, updateFlavor, removeFlavor } = useProductsStore();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | undefined>(undefined);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [flavorToDelete, setFlavorToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFlavor = (flavorData: Partial<Flavor>) => {
    setIsLoading(true);
    
    setTimeout(() => {
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
      
      setIsLoading(false);
    }, 500); // Simulação de carregamento
  };

  const handleUpdateFlavor = (flavorData: Partial<Flavor>) => {
    if (selectedFlavor?.id) {
      setIsLoading(true);
      
      setTimeout(() => {
        updateFlavor(selectedFlavor.id, flavorData);
        
        toast({
          title: "Sabor atualizado",
          description: `${flavorData.name || selectedFlavor.name} foi atualizado com sucesso.`,
        });
        
        setIsLoading(false);
      }, 500); // Simulação de carregamento
    }
  };

  const confirmDeleteFlavor = (id: string) => {
    setFlavorToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteFlavor = () => {
    if (flavorToDelete) {
      setIsLoading(true);
      
      const flavorToRemove = flavors.find(flavor => flavor.id === flavorToDelete);
      
      setTimeout(() => {
        removeFlavor(flavorToDelete);
        
        toast({
          title: "Sabor removido",
          description: flavorToRemove ? `${flavorToRemove.name} foi removido com sucesso.` : "Sabor removido com sucesso.",
        });
        
        setDeleteConfirmOpen(false);
        setFlavorToDelete(null);
        setIsLoading(false);
      }, 500); // Simulação de carregamento
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
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sabores</CardTitle>
        <Button 
          onClick={handleAddNewClick} 
          className="ml-auto bg-[#eb6824] hover:bg-[#d25618] transition-colors duration-300"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Sabor
        </Button>
      </CardHeader>
      <CardContent>
        <FlavorList 
          flavors={flavors} 
          onEditFlavor={handleEditClick}
          onDeleteFlavor={confirmDeleteFlavor}
          isLoading={isLoading}
        />
        
        <FlavorFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleDialogSubmit}
          initialValues={selectedFlavor}
          isLoading={isLoading}
        />
        
        <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover este sabor? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteFlavor} 
                className="rounded-full bg-destructive hover:bg-destructive/90"
                disabled={isLoading}
              >
                {isLoading ? "Removendo..." : "Confirmar Exclusão"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default FlavorManagement;
