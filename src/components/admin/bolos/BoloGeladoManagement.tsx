
import React, { useState } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';
import { useProductsStore } from '@/data/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ModalDialog } from '@/components/ui/modal-dialog';
import { toast } from 'sonner';
import { BoloGeladoFlavor } from '@/data/types';

const BoloGeladoManagement: React.FC = () => {
  const { boloGeladoFlavors, addBoloGeladoFlavor, updateBoloGeladoFlavor, removeBoloGeladoFlavor } = useProductsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlavor, setEditingFlavor] = useState<BoloGeladoFlavor | null>(null);
  const [newFlavor, setNewFlavor] = useState({ name: '', price: 0 });

  const handleAddFlavor = () => {
    if (!newFlavor.name) {
      toast.error('Nome é obrigatório');
      return;
    }

    const id = crypto.randomUUID();
    addBoloGeladoFlavor({ id, name: newFlavor.name, price: newFlavor.price, categoryId: 'bolo-gelado' });
    setNewFlavor({ name: '', price: 0 });
    toast.success('Sabor de bolo gelado adicionado com sucesso!');
  };

  const openEditModal = (flavor: BoloGeladoFlavor) => {
    setEditingFlavor(flavor);
    setIsModalOpen(true);
  };

  const handleSaveFlavor = () => {
    if (!editingFlavor) return;
    
    updateBoloGeladoFlavor(editingFlavor.id, editingFlavor);
    setIsModalOpen(false);
    toast.success('Sabor de bolo gelado atualizado com sucesso!');
  };

  const handleDeleteFlavor = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este sabor de bolo gelado?')) {
      removeBoloGeladoFlavor(id);
      toast.success('Sabor de bolo gelado excluído com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4">Sabores de Bolo Gelado Disponíveis</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boloGeladoFlavors.map((flavor) => (
              <TableRow key={flavor.id}>
                <TableCell>{flavor.name}</TableCell>
                <TableCell>R$ {flavor.price.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openEditModal(flavor)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteFlavor(flavor.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4">Adicionar Novo Sabor de Bolo Gelado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            placeholder="Nome" 
            value={newFlavor.name} 
            onChange={(e) => setNewFlavor({ ...newFlavor, name: e.target.value })} 
          />
          <Input 
            type="number" 
            placeholder="Preço" 
            value={newFlavor.price === 0 ? '' : newFlavor.price} 
            onChange={(e) => setNewFlavor({ ...newFlavor, price: parseFloat(e.target.value) || 0 })} 
          />
          <Button onClick={handleAddFlavor} className="bg-[#eb6824] hover:bg-[#d25618]">
            <Plus className="mr-1 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <ModalDialog
        title="Editar Sabor de Bolo Gelado"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSaveFlavor}
        confirmText="Salvar"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium mb-1">Nome</label>
            <Input 
              id="edit-name"
              value={editingFlavor?.name || ''} 
              onChange={(e) => setEditingFlavor(prev => prev ? { ...prev, name: e.target.value } : prev)} 
            />
          </div>
          <div>
            <label htmlFor="edit-price" className="block text-sm font-medium mb-1">Preço</label>
            <Input 
              id="edit-price"
              type="number" 
              value={editingFlavor?.price || 0} 
              onChange={(e) => setEditingFlavor(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : prev)} 
            />
          </div>
        </div>
      </ModalDialog>
    </div>
  );
};

export default BoloGeladoManagement;
