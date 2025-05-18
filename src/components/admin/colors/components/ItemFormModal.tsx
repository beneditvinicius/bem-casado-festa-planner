
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Flavor, RibbonColor, PackageColor } from '@/data/types';
import { ModalDialog } from '@/components/ui/modal-dialog';
import { Checkbox } from "@/components/ui/checkbox";
import ColorImageUploader from '../ColorImageUploader';

type FormData = {
  name: string;
  code?: string;
  color?: string;
  price?: number;
  imageUrl?: string | null;
  isNew?: boolean;
};

type ItemType = 'flavor' | 'ribbon' | 'package';

interface ItemFormModalProps<T extends Flavor | RibbonColor | PackageColor> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: T;
  onSubmit: (data: Partial<T>) => void;
  onCancel?: () => void;
  itemType: ItemType;
  title: string;
}

const ItemFormModal = <T extends Flavor | RibbonColor | PackageColor>({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
  onCancel,
  itemType,
  title
}: ItemFormModalProps<T>) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: '',
    color: '#ffffff',
    price: 0,
    imageUrl: null,
    isNew: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Reset form data when initialValues changes or dialog opens
  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        code: 'code' in initialValues ? initialValues.code : '',
        color: 'color' in initialValues ? initialValues.color : '#ffffff',
        price: 'price' in initialValues ? initialValues.price : 0,
        imageUrl: 'imageUrl' in initialValues ? initialValues.imageUrl : null,
        isNew: initialValues.isNew || false
      });
    } else {
      // Reset form for new item
      setFormData({
        name: '',
        code: '',
        color: '#ffffff',
        price: 0,
        imageUrl: null,
        isNew: false
      });
    }
  }, [initialValues, open]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isNew: checked }));
  };
  
  const handleImageChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };
  
  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, informe um nome para o item.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const itemData: Partial<T> = {
        name: formData.name,
      } as Partial<T>;
      
      if (itemType === 'flavor' && formData.price !== undefined) {
        (itemData as Partial<Flavor>).price = formData.price;
      }
      
      if ((itemType === 'ribbon' || itemType === 'package') && formData.color) {
        (itemData as any).color = formData.color;
        (itemData as any).code = formData.code;
      }
      
      if (formData.imageUrl !== undefined) {
        (itemData as any).imageUrl = formData.imageUrl;
      }
      
      if (formData.isNew !== undefined) {
        (itemData as any).isNew = formData.isNew;
      }
      
      onSubmit(itemData);
      
      if (onCancel) {
        onCancel();
      } else {
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };
  
  return (
    <ModalDialog
      title={title}
      isOpen={open}
      onClose={handleCancel}
      onConfirm={handleSubmit}
      isLoading={isLoading}
      confirmText="Salvar"
    >
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <Label htmlFor="name" className="text-center">Nome</Label>
          <Input
            id="name"
            name="name"
            placeholder="Digite o nome"
            value={formData.name}
            onChange={handleInputChange}
            className="rounded-full text-center"
            required
          />
        </div>

        {itemType === 'flavor' && (
          <div className="space-y-2 text-center">
            <Label htmlFor="price" className="text-center">Preço (R$)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={handleInputChange}
              className="rounded-full text-center"
              required
            />
          </div>
        )}

        {(itemType === 'ribbon' || itemType === 'package') && (
          <>
            <div className="space-y-2 text-center">
              <Label htmlFor="code" className="text-center">Código</Label>
              <Input
                id="code"
                name="code"
                placeholder="Ex: 310"
                value={formData.code}
                onChange={handleInputChange}
                className="rounded-full text-center"
              />
            </div>

            <div className="space-y-2 text-center">
              <Label htmlFor="color" className="text-center">Cor Hexadecimal</Label>
              <div className="flex items-center justify-center gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-12 h-10 p-1 rounded-full"
                />
                <Input
                  value={formData.color}
                  onChange={handleInputChange}
                  name="color"
                  className="flex-1 rounded-full text-center"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-center space-x-2">
          <Checkbox 
            id="isNew" 
            checked={formData.isNew} 
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="isNew" className="text-sm">Marcar como novidade</Label>
        </div>

        {(itemType === 'ribbon' || itemType === 'package') && (
          <div className="space-y-2 text-center">
            <Label className="text-center">Imagem (opcional)</Label>
            <ColorImageUploader
              imageUrl={formData.imageUrl}
              onChange={handleImageChange}
              colorType={itemType === 'ribbon' ? 'ribbon' : 'package'}
            />
            <p className="text-xs text-muted-foreground text-center">
              Upload de imagem (PNG com transparência recomendado)
            </p>
          </div>
        )}
      </div>
    </ModalDialog>
  );
};

export default ItemFormModal;
