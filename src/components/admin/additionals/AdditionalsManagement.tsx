
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
import { Additional } from '@/data/types';

const AdditionalsManagement: React.FC = () => {
  const { toast } = useToast();
  const additionals = useProductsStore(state => state.additionals);
  const addAdditional = useProductsStore(state => state.addAdditional);
  const removeAdditional = useProductsStore(state => state.removeAdditional);
  const updateAdditional = useProductsStore(state => state.updateAdditional);
  
  const [editAdditional, setEditAdditional] = useState<Additional | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAdditional, setNewAdditional] = useState({
    name: '',
    price: ''
  });

  const handleEdit = (additional: Additional) => {
    setEditAdditional(additional);
    setIsEditModalOpen(true);
  };

  const handleRemove = (id: string) => {
    removeAdditional(id);
    toast({
      title: "Adicional removido",
      description: "O item adicional foi removido com sucesso."
    });
  };

  const handleUpdateAdditional = () => {
    if (!editAdditional) return;
    
    if (!editAdditional.name || !editAdditional.price) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    updateAdditional(editAdditional.id, editAdditional);
    setIsEditModalOpen(false);
    setEditAdditional(null);
    
    toast({
      title: "Adicional atualizado",
      description: "O item adicional foi atualizado com sucesso."
    });
  };

  const handleAddAdditional = () => {
    if (!newAdditional.name || !newAdditional.price) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    const price = parseFloat(newAdditional.price);
    if (isNaN(price)) {
      toast({
        title: "Preço inválido",
        description: "Por favor, insira um preço válido.",
        variant: "destructive"
      });
      return;
    }
    
    const additional: Additional = {
      id: uuidv4(),
      name: newAdditional.name,
      price: price
    };
    
    addAdditional(additional);
    setNewAdditional({ name: '', price: '' });
    
    toast({
      title: "Adicional adicionado",
      description: "O novo item adicional foi adicionado com sucesso."
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-lg font-medium text-center mb-4">Gerenciamento de Itens Adicionais</h3>
      
      <div className="grid gap-4 mb-6">
        {additionals.map(additional => (
          <Card key={additional.id} className="rounded-xl overflow-hidden">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium">{additional.name}</h4>
                <p className="text-sm text-gray-500">+ R$ {additional.price.toFixed(2)} por unidade</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(additional)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemove(additional.id)}
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
          <h4 className="font-medium mb-4">Adicionar Novo Item</h4>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="new-name" className="text-sm">Nome</Label>
              <Input 
                id="new-name" 
                value={newAdditional.name} 
                onChange={e => setNewAdditional({...newAdditional, name: e.target.value})}
                className="mt-1 rounded-xl"
                placeholder="Nome do item adicional"
              />
            </div>
            
            <div>
              <Label htmlFor="new-price" className="text-sm">Preço por unidade (R$)</Label>
              <Input 
                id="new-price" 
                value={newAdditional.price} 
                onChange={e => setNewAdditional({...newAdditional, price: e.target.value})}
                className="mt-1 rounded-xl"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            
            <Button 
              onClick={handleAddAdditional}
              className="mt-2 w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Item
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Editar Item Adicional</DialogTitle>
          </DialogHeader>
          
          {editAdditional && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="edit-name" className="text-sm">Nome</Label>
                <Input 
                  id="edit-name" 
                  value={editAdditional.name} 
                  onChange={e => setEditAdditional({...editAdditional, name: e.target.value})}
                  className="mt-1 rounded-xl"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-price" className="text-sm">Preço por unidade (R$)</Label>
                <Input 
                  id="edit-price" 
                  value={editAdditional.price} 
                  onChange={e => setEditAdditional({
                    ...editAdditional, 
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
              onClick={handleUpdateAdditional}
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

export default AdditionalsManagement;
