
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorFormSchema, ColorFormValues } from '../types';
import ColorImageUploader from '../ColorImageUploader';

interface PackageColorFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ColorFormValues) => void;
  editingColor: ColorFormValues | null;
  isEditing: boolean;
}

const PackageColorFormDialog: React.FC<PackageColorFormDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  editingColor,
  isEditing
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: {
      name: "",
      code: "",
      color: "#FFFFFF",
      isNew: false,
      imageUrl: "",
    }
  });
  
  useEffect(() => {
    if (editingColor) {
      form.reset(editingColor);
      setImageUrl(editingColor.imageUrl || '');
      setPreviewImage(editingColor.imageUrl || null);
    } else {
      form.reset({
        name: "",
        code: "",
        color: "#FFFFFF",
        isNew: false,
        imageUrl: "",
      });
      setImageUrl('');
      setPreviewImage(null);
    }
  }, [editingColor, form]);
  
  const handleSubmit = (data: ColorFormValues) => {
    // Use previewImage if available, otherwise use the imageUrl from the form
    const finalImageUrl = previewImage || imageUrl;
    onSubmit({
      ...data,
      imageUrl: finalImageUrl
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Cor de Embalagem" : "Adicionar Nova Cor de Embalagem"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Azul" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código da Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: E001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor (HEX)</FormLabel>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: field.value }}
                    />
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Marcar como novidade</FormLabel>
                </FormItem>
              )}
            />
            
            {/* Upload de imagem */}
            <ColorImageUploader
              previewImage={previewImage}
              imageUrl={imageUrl}
              setPreviewImage={setPreviewImage}
              setImageUrl={setImageUrl}
            />
            
            <DialogFooter>
              <Button type="submit">
                {isEditing ? "Atualizar" : "Adicionar"} Cor
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageColorFormDialog;
