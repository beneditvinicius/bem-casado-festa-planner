
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Flavor, RibbonColor, PackageColor } from '@/data/products';

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  item: Flavor | RibbonColor | PackageColor | null;
  type: 'flavor' | 'ribbon' | 'package';
}

const AdminEditModal: React.FC<EditModalProps> = ({ open, onClose, onSave, item, type }) => {
  const { toast } = useToast();
  const [editedItem, setEditedItem] = useState<any>(null);

  React.useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);

  if (!editedItem) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setEditedItem({ ...editedItem, [name]: parsedValue });
  };

  const handleSwitchChange = (checked: boolean) => {
    setEditedItem({ ...editedItem, isNew: checked });
  };

  const handleSave = () => {
    if (type === 'flavor' && (!editedItem.name || editedItem.price <= 0)) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos corretamente.",
        variant: "destructive"
      });
      return;
    } else if ((type === 'ribbon' || type === 'package') && 
              (!editedItem.name || !editedItem.code || !editedItem.color)) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos: nome, código e cor.",
        variant: "destructive"
      });
      return;
    }
    
    onSave(editedItem);
    toast({
      title: "Sucesso",
      description: "Item atualizado com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar {type === 'flavor' ? 'Sabor' : type === 'ribbon' ? 'Fita' : 'Embalagem'}</DialogTitle>
          <Button 
            variant="ghost" 
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              name="name"
              value={editedItem.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          {type === 'flavor' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Preço (R$)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={editedItem.price || ''}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          )}
          
          {(type === 'ribbon' || type === 'package') && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Código
                </Label>
                <Input
                  id="code"
                  name="code"
                  value={editedItem.code}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Cor (Hex)
                </Label>
                <div className="col-span-3 flex space-x-2">
                  <Input
                    id="color"
                    name="color"
                    value={editedItem.color}
                    onChange={handleChange}
                  />
                  <div
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: editedItem.color }}
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isNew" className="text-right">
              Novidade
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="isNew"
                checked={editedItem.isNew}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isNew">Marcar como "Novidade"</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-[#eb6824] hover:bg-[#d25618]">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEditModal;
