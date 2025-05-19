
import React, { useState } from 'react';
import { useProductsStore } from '@/data/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Pencil, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { FaqItem } from '@/data/slices/faqSlice';

const FaqManagement: React.FC = () => {
  const { faqItems, updateFaqItem } = useProductsStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem({ ...faqItems[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingItem(null);
  };

  const handleSave = (index: number) => {
    if (editingItem) {
      updateFaqItem(index, editingItem);
      toast.success('Pergunta atualizada com sucesso!');
      setEditingIndex(null);
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Gerenciar Perguntas Frequentes</h2>
      
      {faqItems.map((item, index) => (
        <Card key={index} className="p-4 mb-4">
          {editingIndex === index ? (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Pergunta</label>
                <Input
                  value={editingItem?.question || ''}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, question: e.target.value } : null)}
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Resposta</label>
                <Textarea
                  value={editingItem?.answer || ''}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, answer: e.target.value } : null)}
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="rounded-full"
                >
                  <X className="h-4 w-4 mr-1" /> Cancelar
                </Button>
                <Button 
                  onClick={() => handleSave(index)}
                  className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
                >
                  <Save className="h-4 w-4 mr-1" /> Salvar
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <h3 className="text-md font-medium">{item.question}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(index)}
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm whitespace-pre-line">{item.answer}</p>
            </>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FaqManagement;
