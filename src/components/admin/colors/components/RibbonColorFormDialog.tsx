
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorFormSchema, ColorFormValues } from '../types';
import ColorImageUploader from '../ColorImageUploader';
import { RibbonColor } from '@/data/types';

interface RibbonColorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ColorFormValues) => void;
  editingRibbon: string | null;
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  initialValues?: RibbonColor;
}

const RibbonColorFormDialog: React.FC<RibbonColorFormDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  editingRibbon,
  previewImage,
  setPreviewImage,
  imageUrl,
  setImageUrl,
  initialValues
}) => {
  const ribbonForm = useForm<ColorFormValues>({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: initialValues || {
      name: "",
      code: "",
      color: "#FFFFFF",
      isNew: false,
      imageUrl: "",
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingRibbon ? "Editar Cor de Fita" : "Adicionar Nova Cor de Fita"}</DialogTitle>
        </DialogHeader>
        <Form {...ribbonForm}>
          <form onSubmit={ribbonForm.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={ribbonForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Vermelho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={ribbonForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código da Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: R001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={ribbonForm.control}
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
              control={ribbonForm.control}
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
                {editingRibbon ? "Atualizar" : "Adicionar"} Cor
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RibbonColorFormDialog;
