
import React, { useState } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';
import { useProductsStore } from '@/data/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ModalDialog } from '@/components/ui/modal-dialog';
import { toast } from 'sonner';
import { Additional } from '@/data/types';

const AdditionalsManagement: React.FC = () => {
  const { additionals, addAdditional, updateAdditional, removeAdditional } = useProductsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdditional, setEditingAdditional] = useState<Additional | null>(null);
  const [newAdditional, setNewAdditional] = useState({ name: '', price: 0 });

  const handleAddAdditional = () => {
    if (!newAdditional.name) {
      toast.error('Nome é obrigatório');
      return;
    }

    const id = crypto.randomUUID();
    addAdditional({ id, name: newAdditional.name, price: newAdditional.price });
    setNewAdditional({ name: '', price: 0 });
    toast.success('Adicional adicionado com sucesso!');
  };

  const openEditModal = (additional: Additional) => {
    setEditingAdditional(additional);
    setIsModalOpen(true);
  };

  const handleSaveAdditional = () => {
    if (!editingAdditional) return;
    
    updateAdditional(editingAdditional.id, editingAdditional);
    setIsModalOpen(false);
    toast.success('Adicional atualizado com sucesso!');
  };

  const handleDeleteAdditional = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este adicional?')) {
      removeAdditional(id);
      toast.success('Adicional excluído com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4">Adicionais Disponíveis</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {additionals.map((additional) => (
              <TableRow key={additional.id}>
                <TableCell>{additional.name}</TableCell>
                <TableCell>R$ {additional.price.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openEditModal(additional)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteAdditional(additional.id)}
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
        <h2 className="text-lg font-semibold mb-4">Adicionar Novo Adicional</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            placeholder="Nome" 
            value={newAdditional.name} 
            onChange={(e) => setNewAdditional({ ...newAdditional, name: e.target.value })} 
          />
          <Input 
            type="number" 
            placeholder="Preço" 
            value={newAdditional.price === 0 ? '' : newAdditional.price} 
            onChange={(e) => setNewAdditional({ ...newAdditional, price: parseFloat(e.target.value) || 0 })} 
          />
          <Button onClick={handleAddAdditional} className="bg-[#eb6824] hover:bg-[#d25618]">
            <Plus className="mr-1 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <ModalDialog
        title="Editar Adicional"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSaveAdditional}
        confirmText="Salvar"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium mb-1">Nome</label>
            <Input 
              id="edit-name"
              value={editingAdditional?.name || ''} 
              onChange={(e) => setEditingAdditional(prev => prev ? { ...prev, name: e.target.value } : prev)} 
            />
          </div>
          <div>
            <label htmlFor="edit-price" className="block text-sm font-medium mb-1">Preço</label>
            <Input 
              id="edit-price"
              type="number" 
              value={editingAdditional?.price || 0} 
              onChange={(e) => setEditingAdditional(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : prev)} 
            />
          </div>
        </div>
      </ModalDialog>
    </div>
  );
};

export default AdditionalsManagement;
