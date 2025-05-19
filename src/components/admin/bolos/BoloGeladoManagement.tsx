
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProductsStore } from '@/data/store';
import { v4 as uuidv4 } from 'uuid';
import { BoloGeladoFlavor } from '@/data/types';

const BoloGeladoManagement: React.FC = () => {
  const { toast } = useToast();
  const boloGeladoFlavors = useProductsStore(state => state.boloGeladoFlavors);
  const addBoloGeladoFlavor = useProductsStore(state => state.addBoloGeladoFlavor);
  const removeBoloGeladoFlavor = useProductsStore(state => state.removeBoloGeladoFlavor);
  const updateBoloGeladoFlavor = useProductsStore(state => state.updateBoloGeladoFlavor);
  
  const [editFlavor, setEditFlavor] = useState<BoloGeladoFlavor | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newFlavor, setNewFlavor] = useState({
    name: '',
    price: ''
  });

  const handleEdit = (flavor: BoloGeladoFlavor) => {
    setEditFlavor(flavor);
    setIsEditModalOpen(true);
  };

  const handleRemove = (id: string) => {
    removeBoloGeladoFlavor(id);
    toast({
      title: "Sabor removido",
      description: "O sabor foi removido com sucesso."
    });
  };

  const handleUpdateFlavor = () => {
    if (!editFlavor) return;
    
    if (!editFlavor.name || !editFlavor.price) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    updateBoloGeladoFlavor(editFlavor.id, editFlavor);
    setIsEditModalOpen(false);
    setEditFlavor(null);
    
    toast({
      title: "Sabor atualizado",
      description: "O sabor foi atualizado com sucesso."
    });
  };

  const handleAddFlavor = () => {
    if (!newFlavor.name || !newFlavor.price) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    const price = parseFloat(newFlavor.price);
    if (isNaN(price)) {
      toast({
        title: "Preço inválido",
        description: "Por favor, insira um preço válido.",
        variant: "destructive"
      });
      return;
    }
    
    const flavor: BoloGeladoFlavor = {
      id: uuidv4(),
      name: newFlavor.name,
      price: price,
      categoryId: 'bolo-gelado'
    };
    
    addBoloGeladoFlavor(flavor);
    setNewFlavor({ name: '', price: '' });
    
    toast({
      title: "Sabor adicionado",
      description: "O novo sabor foi adicionado com sucesso."
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-lg font-medium text-center mb-4">Gerenciamento de Sabores de Bolo Gelado</h3>
      
      <div className="grid gap-4 mb-6">
        {boloGeladoFlavors.map(flavor => (
          <Card key={flavor.id} className="rounded-xl overflow-hidden">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium">{flavor.name}</h4>
                <p className="text-sm text-gray-500">R$ {flavor.price.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(flavor)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemove(flavor.id)}
                  className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remover</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="rounded-xl">
        <CardContent className="p-5">
          <h4 className="font-medium mb-4">Adicionar Novo Sabor</h4>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="new-name" className="text-sm">Nome</Label>
              <Input 
                id="new-name" 
                value={newFlavor.name} 
                onChange={e => setNewFlavor({...newFlavor, name: e.target.value})}
                className="mt-1 rounded-xl"
                placeholder="Nome do sabor"
              />
            </div>
            
            <div>
              <Label htmlFor="new-price" className="text-sm">Preço (R$)</Label>
              <Input 
                id="new-price" 
                value={newFlavor.price} 
                onChange={e => setNewFlavor({...newFlavor, price: e.target.value})}
                className="mt-1 rounded-xl"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            
            <Button 
              onClick={handleAddFlavor}
              className="mt-2 w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Sabor
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Editar Sabor</DialogTitle>
          </DialogHeader>
          
          {editFlavor && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="edit-name" className="text-sm">Nome</Label>
                <Input 
                  id="edit-name" 
                  value={editFlavor.name} 
                  onChange={e => setEditFlavor({...editFlavor, name: e.target.value})}
                  className="mt-1 rounded-xl"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-price" className="text-sm">Preço (R$)</Label>
                <Input 
                  id="edit-price" 
                  value={editFlavor.price} 
                  onChange={e => setEditFlavor({
                    ...editFlavor, 
                    price: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
                  })}
                  className="mt-1 rounded-xl"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-full"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleUpdateFlavor}
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoloGeladoManagement;
