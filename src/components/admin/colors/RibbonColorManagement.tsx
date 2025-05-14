
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ColorFormSchema, ColorFormValues } from './types';

export const RibbonColorManagement: React.FC = () => {
  const { 
    ribbonColors, 
    addRibbonColor, 
    removeRibbonColor, 
    updateRibbonColor 
  } = useProductsStore();
  
  const [isAddingRibbon, setIsAddingRibbon] = useState(false);
  const [editingRibbon, setEditingRibbon] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const ribbonForm = useForm<ColorFormValues>({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: {
      name: "",
      code: "",
      color: "#FFFFFF",
      isNew: false,
    }
  });
  
  const handleAddRibbon = (data: ColorFormValues) => {
    if (editingRibbon) {
      updateRibbonColor(editingRibbon, data);
      toast({
        title: "Cor de fita atualizada",
        description: `A cor ${data.name} foi atualizada com sucesso.`,
      });
    } else {
      const newId = (ribbonColors.length + 1).toString();
      addRibbonColor({ 
        id: newId, 
        name: data.name, 
        code: data.code, 
        color: data.color, 
        isNew: data.isNew || false 
      });
      toast({
        title: "Cor de fita adicionada",
        description: `A cor ${data.name} foi adicionada com sucesso.`,
      });
    }
    setIsAddingRibbon(false);
    setEditingRibbon(null);
    ribbonForm.reset();
  };
  
  const editRibbon = (id: string) => {
    const ribbon = ribbonColors.find(r => r.id === id);
    if (ribbon) {
      ribbonForm.reset({
        name: ribbon.name,
        code: ribbon.code,
        color: ribbon.color,
        isNew: ribbon.isNew,
      });
      setEditingRibbon(id);
      setIsAddingRibbon(true);
    }
  };
  
  const handleRemoveRibbon = (id: string) => {
    removeRibbonColor(id);
    toast({
      title: "Cor de fita removida",
      description: "A cor de fita foi removida com sucesso.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Cores de Fitas Disponíveis</h3>
        <Dialog open={isAddingRibbon} onOpenChange={setIsAddingRibbon}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRibbon(null);
              ribbonForm.reset({
                name: "",
                code: "",
                color: "#FFFFFF",
                isNew: false,
              });
            }}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Cor de Fita
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRibbon ? "Editar Cor de Fita" : "Adicionar Nova Cor de Fita"}</DialogTitle>
            </DialogHeader>
            <Form {...ribbonForm}>
              <form onSubmit={ribbonForm.handleSubmit(handleAddRibbon)} className="space-y-4">
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
                
                <DialogFooter>
                  <Button type="submit">
                    {editingRibbon ? "Atualizar" : "Adicionar"} Cor
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ribbonColors.map((color) => (
          <div key={color.id} className="border rounded-lg p-4 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => handleRemoveRibbon(color.id)}
            >
              <Trash2 size={16} />
            </button>
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full" 
                style={{ 
                  backgroundColor: color.color,
                  border: color.color === '#FFFFFF' ? '1px solid #E2E8F0' : 'none'
                }} 
              />
              <div>
                <p className="font-medium">{color.name}</p>
                <p className="text-sm text-gray-500">Código: {color.code}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 w-full"
              onClick={() => editRibbon(color.id)}
            >
              Editar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RibbonColorManagement;
