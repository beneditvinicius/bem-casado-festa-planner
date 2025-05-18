
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PackageColor } from '@/data/types';
import ColorImageUploader from '../ColorImageUploader';
import { ModalDialog } from '@/components/ui/modal-dialog';
import { Checkbox } from "@/components/ui/checkbox";

type FormData = {
  name: string;
  color: string;
  imageUrl: string | null;
  code: string;
  isNew: boolean;
};

interface PackageColorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<PackageColor>) => void;
  initialValues?: PackageColor;
}

const PackageColorFormDialog: React.FC<PackageColorFormDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    color: '#ffffff',
    imageUrl: null,
    code: '',
    isNew: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Reset form data when initialValues changes or dialog opens
  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        color: initialValues.color || '#ffffff',
        imageUrl: initialValues.imageUrl || null,
        code: initialValues.code || '',
        isNew: initialValues.isNew || false
      });
    } else {
      // Reset form for new color
      setFormData({
        name: '',
        color: '#ffffff',
        imageUrl: null,
        code: '',
        isNew: false
      });
    }
  }, [initialValues, open]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        description: "Por favor, informe um nome para a cor.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const colorData: Partial<PackageColor> = {
        name: formData.name,
        color: formData.color,
        code: formData.code,
        imageUrl: formData.imageUrl,
        isNew: formData.isNew
      };
      
      onSubmit(colorData);
      
      onOpenChange(false);
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
  
  return (
    <ModalDialog
      title={initialValues ? 'Editar Cor da Embalagem' : 'Adicionar Cor da Embalagem'}
      isOpen={open}
      onClose={() => onOpenChange(false)}
      onConfirm={handleSubmit}
      isLoading={isLoading}
      confirmText={initialValues ? 'Salvar' : 'Adicionar'}
    >
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <Label htmlFor="name" className="text-center">Nome da cor</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ex: Branco (B001)"
            value={formData.name}
            onChange={handleInputChange}
            className="rounded-full text-center"
            required
          />
        </div>

        <div className="space-y-2 text-center">
          <Label htmlFor="code" className="text-center">Código da cor</Label>
          <Input
            id="code"
            name="code"
            placeholder="Ex: B001"
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

        <div className="flex items-center justify-center space-x-2">
          <Checkbox 
            id="isNew" 
            checked={formData.isNew} 
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="isNew" className="text-sm">Marcar como novidade</Label>
        </div>

        <div className="space-y-2 text-center">
          <Label className="text-center">Imagem da embalagem (opcional)</Label>
          <ColorImageUploader
            imageUrl={formData.imageUrl}
            onChange={handleImageChange}
            colorType="package"
          />
          <p className="text-xs text-muted-foreground text-center">
            Upload de imagem da embalagem (PNG com transparência recomendado)
          </p>
        </div>
      </div>
    </ModalDialog>
  );
};

export default PackageColorFormDialog;
