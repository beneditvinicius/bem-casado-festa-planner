
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

export const PackageColorManagement: React.FC = () => {
  const { 
    packageColors, 
    addPackageColor, 
    removePackageColor, 
    updatePackageColor 
  } = useProductsStore();
  
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const packageForm = useForm<ColorFormValues>({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: {
      name: "",
      code: "",
      color: "#FFFFFF",
      isNew: false,
    }
  });
  
  const handleAddPackage = (data: ColorFormValues) => {
    if (editingPackage) {
      updatePackageColor(editingPackage, data);
      toast({
        title: "Cor de embalagem atualizada",
        description: `A cor ${data.name} foi atualizada com sucesso.`,
      });
    } else {
      const newId = (packageColors.length + 1).toString();
      addPackageColor({ 
        id: newId, 
        name: data.name, 
        code: data.code, 
        color: data.color, 
        isNew: data.isNew || false 
      });
      toast({
        title: "Cor de embalagem adicionada",
        description: `A cor ${data.name} foi adicionada com sucesso.`,
      });
    }
    setIsAddingPackage(false);
    setEditingPackage(null);
    packageForm.reset();
  };
  
  const editPackage = (id: string) => {
    const pkg = packageColors.find(p => p.id === id);
    if (pkg) {
      packageForm.reset({
        name: pkg.name,
        code: pkg.code,
        color: pkg.color,
        isNew: pkg.isNew,
      });
      setEditingPackage(id);
      setIsAddingPackage(true);
    }
  };
  
  const handleRemovePackage = (id: string) => {
    removePackageColor(id);
    toast({
      title: "Cor de embalagem removida",
      description: "A cor de embalagem foi removida com sucesso.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Cores de Embalagens Disponíveis</h3>
        <Dialog open={isAddingPackage} onOpenChange={setIsAddingPackage}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPackage(null);
              packageForm.reset({
                name: "",
                code: "",
                color: "#FFFFFF",
                isNew: false,
              });
            }}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Cor de Embalagem
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPackage ? "Editar Cor de Embalagem" : "Adicionar Nova Cor de Embalagem"}</DialogTitle>
            </DialogHeader>
            <Form {...packageForm}>
              <form onSubmit={packageForm.handleSubmit(handleAddPackage)} className="space-y-4">
                <FormField
                  control={packageForm.control}
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
                  control={packageForm.control}
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
                  control={packageForm.control}
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
                  control={packageForm.control}
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
                    {editingPackage ? "Atualizar" : "Adicionar"} Cor
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packageColors.map((color) => (
          <div key={color.id} className="border rounded-lg p-4 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => handleRemovePackage(color.id)}
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
              onClick={() => editPackage(color.id)}
            >
              Editar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageColorManagement;
