
import React, { useState } from 'react';
import { useProductsStore } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const colorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  color: z.string().min(1, "Cor HEX é obrigatória"),
  isNew: z.boolean().optional(),
});

type ColorFormValues = z.infer<typeof colorSchema>;

const ColorManagement: React.FC = () => {
  const { 
    ribbonColors, 
    packageColors, 
    addRibbonColor, 
    addPackageColor,
    removeRibbonColor,
    removePackageColor,
    updateRibbonColor,
    updatePackageColor
  } = useProductsStore();
  
  const [isAddingRibbon, setIsAddingRibbon] = useState(false);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingRibbon, setEditingRibbon] = useState<string | null>(null);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const ribbonForm = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      code: "",
      color: "#FFFFFF",
      isNew: false,
    }
  });
  
  const packageForm = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
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
      addRibbonColor({ id: newId, ...data });
      toast({
        title: "Cor de fita adicionada",
        description: `A cor ${data.name} foi adicionada com sucesso.`,
      });
    }
    setIsAddingRibbon(false);
    setEditingRibbon(null);
    ribbonForm.reset();
  };
  
  const handleAddPackage = (data: ColorFormValues) => {
    if (editingPackage) {
      updatePackageColor(editingPackage, data);
      toast({
        title: "Cor de embalagem atualizada",
        description: `A cor ${data.name} foi atualizada com sucesso.`,
      });
    } else {
      const newId = (packageColors.length + 1).toString();
      addPackageColor({ id: newId, ...data });
      toast({
        title: "Cor de embalagem adicionada",
        description: `A cor ${data.name} foi adicionada com sucesso.`,
      });
    }
    setIsAddingPackage(false);
    setEditingPackage(null);
    packageForm.reset();
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
  
  const handleRemoveRibbon = (id: string) => {
    removeRibbonColor(id);
    toast({
      title: "Cor de fita removida",
      description: "A cor de fita foi removida com sucesso.",
    });
  };
  
  const handleRemovePackage = (id: string) => {
    removePackageColor(id);
    toast({
      title: "Cor de embalagem removida",
      description: "A cor de embalagem foi removida com sucesso.",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Cores</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ribbons">
          <TabsList className="mb-4">
            <TabsTrigger value="ribbons">Cores de Fitas</TabsTrigger>
            <TabsTrigger value="packages">Cores de Embalagens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ribbons">
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
          </TabsContent>
          
          <TabsContent value="packages">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ColorManagement;
