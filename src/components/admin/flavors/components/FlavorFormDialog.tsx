
import React, { useState, useEffect } from 'react';
import { Flavor } from '@/data/types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface FlavorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Flavor>) => void;
  initialValues?: Flavor;
  isLoading?: boolean;
}

const FlavorFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
  isLoading = false,
}: FlavorFormDialogProps) => {
  const [formData, setFormData] = useState<Partial<Flavor>>({
    name: initialValues?.name || '',
    price: initialValues?.price || 0,
    isNew: initialValues?.isNew || false,
    categoryId: initialValues?.categoryId || 'default',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name,
        price: initialValues.price,
        isNew: initialValues.isNew || false,
        categoryId: initialValues.categoryId,
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        isNew: false,
        categoryId: 'default',
      });
    }
  }, [initialValues, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {initialValues ? 'Editar Sabor' : 'Novo Sabor'}
          </DialogTitle>
          <p className="text-center text-sm text-gray-500 mt-1">
            Faça as alterações necessárias e clique em salvar quando terminar.
          </p>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              className="rounded-lg"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="isNew">Marcar como "Novidade"</Label>
            <Switch
              id="isNew"
              checked={formData.isNew}
              onCheckedChange={(checked) => 
                setFormData((prev) => ({ ...prev, isNew: checked }))
              }
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-full"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlavorFormDialog;
