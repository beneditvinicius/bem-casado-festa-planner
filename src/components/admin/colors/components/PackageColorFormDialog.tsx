
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PackageColor } from '@/data/products';
import ColorImageUploader from '../ColorImageUploader';
import { ModalDialog } from '@/components/ui/modal-dialog';

type FormData = {
  name: string;
  hexColor: string;
  imageUrl: string | null;
};

interface PackageColorFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PackageColor) => void;
  initialData?: PackageColor;
  mode: 'add' | 'edit';
}

const PackageColorFormDialog: React.FC<PackageColorFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    hexColor: initialData?.hexColor || '#ffffff',
    imageUrl: initialData?.imageUrl || null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      onSave({
        id: initialData?.id || Date.now().toString(),
        name: formData.name,
        hexColor: formData.hexColor,
        imageUrl: formData.imageUrl
      });
      
      toast({
        title: `Cor ${mode === 'add' ? 'adicionada' : 'atualizada'} com sucesso!`,
      });
      
      onClose();
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
      title={mode === 'add' ? 'Adicionar Cor da Embalagem' : 'Editar Cor da Embalagem'}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      isLoading={isLoading}
      confirmText={mode === 'add' ? 'Adicionar' : 'Salvar'}
    >
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <Label htmlFor="name" className="text-center">Nome da cor</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ex: Branco"
            value={formData.name}
            onChange={handleInputChange}
            className="rounded-full text-center"
            required
          />
        </div>

        <div className="space-y-2 text-center">
          <Label htmlFor="hexColor" className="text-center">Cor Hexadecimal</Label>
          <div className="flex items-center justify-center gap-2">
            <Input
              id="hexColor"
              name="hexColor"
              type="color"
              value={formData.hexColor}
              onChange={handleInputChange}
              className="w-12 h-10 p-1 rounded-full"
            />
            <Input
              value={formData.hexColor}
              onChange={handleInputChange}
              name="hexColor"
              className="flex-1 rounded-full text-center"
            />
          </div>
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
