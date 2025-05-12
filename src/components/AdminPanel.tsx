import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Flavor, RibbonColor, PackageColor, Combination, useProductsStore } from '@/data/products';

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const flavors = useProductsStore((state) => state.flavors);
  const ribbonColors = useProductsStore((state) => state.ribbonColors);
  const packageColors = useProductsStore((state) => state.packageColors);
  const combinations = useProductsStore((state) => state.combinations);
  const whatsappNumber = useProductsStore((state) => state.whatsappNumber);
  
  const addFlavor = useProductsStore((state) => state.addFlavor);
  const removeFlavor = useProductsStore((state) => state.removeFlavor);
  const addRibbonColor = useProductsStore((state) => state.addRibbonColor);
  const removeRibbonColor = useProductsStore((state) => state.removeRibbonColor);
  const addPackageColor = useProductsStore((state) => state.addPackageColor);
  const removePackageColor = useProductsStore((state) => state.removePackageColor);
  const addCombination = useProductsStore((state) => state.addCombination);
  const removeCombination = useProductsStore((state) => state.removeCombination);
  const setWhatsappNumber = useProductsStore((state) => state.setWhatsappNumber);
  
  const [newFlavor, setNewFlavor] = useState({ name: '', price: 0 });
  const [newRibbon, setNewRibbon] = useState({ name: '', code: '', color: '#000000' });
  const [newPackage, setNewPackage] = useState({ name: '', code: '', color: '#000000' });
  const [newCombination, setNewCombination] = useState({ ribbonId: '', packageId: '', imageUrl: '' });
  const [newWhatsappNumber, setNewWhatsappNumber] = useState(whatsappNumber);

  const handleAddFlavor = () => {
    if (newFlavor.name && newFlavor.price > 0) {
      addFlavor({
        id: Date.now().toString(),
        name: newFlavor.name,
        price: newFlavor.price,
      });
      setNewFlavor({ name: '', price: 0 });
      toast({
        title: "Sucesso",
        description: "Sabor adicionado com sucesso.",
      });
    }
  };

  const handleAddRibbon = () => {
    if (newRibbon.name && newRibbon.color && newRibbon.code) {
      addRibbonColor({
        id: Date.now().toString(),
        name: newRibbon.name,
        code: newRibbon.code,
        color: newRibbon.color,
      });
      setNewRibbon({ name: '', code: '', color: '#000000' });
      toast({
        title: "Sucesso",
        description: "Cor de fita adicionada com sucesso.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Preencha todos os campos: nome, código e cor.",
        variant: "destructive"
      });
    }
  };

  const handleAddPackage = () => {
    if (newPackage.name && newPackage.color && newPackage.code) {
      addPackageColor({
        id: Date.now().toString(),
        name: newPackage.name,
        code: newPackage.code,
        color: newPackage.color,
      });
      setNewPackage({ name: '', code: '', color: '#000000' });
      toast({
        title: "Sucesso",
        description: "Cor de embalagem adicionada com sucesso.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Preencha todos os campos: nome, código e cor.",
        variant: "destructive"
      });
    }
  };

  const handleAddCombination = () => {
    if (newCombination.ribbonId && newCombination.packageId && newCombination.imageUrl) {
      const exists = combinations.some(
        c => c.ribbonId === newCombination.ribbonId && c.packageId === newCombination.packageId
      );
      
      if (exists) {
        toast({
          title: "Erro",
          description: "Esta combinação já existe.",
          variant: "destructive",
        });
        return;
      }
      
      addCombination({
        ribbonId: newCombination.ribbonId,
        packageId: newCombination.packageId,
        imageUrl: newCombination.imageUrl,
      });
      setNewCombination({ ribbonId: '', packageId: '', imageUrl: '' });
      toast({
        title: "Sucesso",
        description: "Combinação adicionada com sucesso.",
      });
    }
  };

  const handleUpdateWhatsapp = () => {
    setWhatsappNumber(newWhatsappNumber);
    toast({
      title: "Sucesso",
      description: "Número de WhatsApp atualizado com sucesso.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flavors">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="flavors">Sabores</TabsTrigger>
            <TabsTrigger value="ribbons">Fitas</TabsTrigger>
            <TabsTrigger value="packages">Embalagens</TabsTrigger>
            <TabsTrigger value="combinations">Combinações</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          {/* Flavors Tab */}
          <TabsContent value="flavors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="flavorName">Nome do Sabor</Label>
                <Input 
                  id="flavorName" 
                  value={newFlavor.name} 
                  onChange={(e) => setNewFlavor({ ...newFlavor, name: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="flavorPrice">Preço (R$)</Label>
                <Input 
                  id="flavorPrice" 
                  type="number" 
                  step="0.01" 
                  min="0"
                  value={newFlavor.price} 
                  onChange={(e) => setNewFlavor({ ...newFlavor, price: parseFloat(e.target.value) })} 
                />
              </div>
              <Button onClick={handleAddFlavor}>Adicionar Sabor</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flavors.map((flavor) => (
                  <TableRow key={flavor.id}>
                    <TableCell>{flavor.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      }).format(flavor.price)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeFlavor(flavor.id)}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Ribbons Tab */}
          <TabsContent value="ribbons" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label htmlFor="ribbonName">Nome da Cor</Label>
                <Input 
                  id="ribbonName" 
                  value={newRibbon.name} 
                  onChange={(e) => setNewRibbon({ ...newRibbon, name: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="ribbonCode">Código da Cor</Label>
                <Input 
                  id="ribbonCode" 
                  value={newRibbon.code} 
                  onChange={(e) => setNewRibbon({ ...newRibbon, code: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="ribbonColor">Cor (Hex)</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="ribbonColor" 
                    value={newRibbon.color} 
                    onChange={(e) => setNewRibbon({ ...newRibbon, color: e.target.value })} 
                  />
                  <div 
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: newRibbon.color }}
                  />
                </div>
              </div>
              <Button onClick={handleAddRibbon}>Adicionar Cor</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ribbonColors.map((ribbon) => (
                  <TableRow key={ribbon.id}>
                    <TableCell>{ribbon.name}</TableCell>
                    <TableCell>{ribbon.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: ribbon.color }}
                        />
                        <span>{ribbon.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeRibbonColor(ribbon.id)}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label htmlFor="packageName">Nome da Cor</Label>
                <Input 
                  id="packageName" 
                  value={newPackage.name} 
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="packageCode">Código da Cor</Label>
                <Input 
                  id="packageCode" 
                  value={newPackage.code} 
                  onChange={(e) => setNewPackage({ ...newPackage, code: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="packageColor">Cor (Hex)</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="packageColor" 
                    value={newPackage.color} 
                    onChange={(e) => setNewPackage({ ...newPackage, color: e.target.value })} 
                  />
                  <div 
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: newPackage.color }}
                  />
                </div>
              </div>
              <Button onClick={handleAddPackage}>Adicionar Cor</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packageColors.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.name}</TableCell>
                    <TableCell>{pkg.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: pkg.color }}
                        />
                        <span>{pkg.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removePackageColor(pkg.id)}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Combinations Tab */}
          <TabsContent value="combinations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label htmlFor="comboRibbon">Fita</Label>
                <select
                  id="comboRibbon"
                  className="w-full p-2 border rounded"
                  value={newCombination.ribbonId}
                  onChange={(e) => setNewCombination({ ...newCombination, ribbonId: e.target.value })}
                >
                  <option value="">Selecione uma fita</option>
                  {ribbonColors.map((ribbon) => (
                    <option key={ribbon.id} value={ribbon.id}>{ribbon.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="comboPackage">Embalagem</Label>
                <select
                  id="comboPackage"
                  className="w-full p-2 border rounded"
                  value={newCombination.packageId}
                  onChange={(e) => setNewCombination({ ...newCombination, packageId: e.target.value })}
                >
                  <option value="">Selecione uma embalagem</option>
                  {packageColors.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input 
                  id="imageUrl" 
                  value={newCombination.imageUrl} 
                  onChange={(e) => setNewCombination({ ...newCombination, imageUrl: e.target.value })} 
                />
              </div>
              <Button onClick={handleAddCombination}>Adicionar Combinação</Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fita</TableHead>
                  <TableHead>Embalagem</TableHead>
                  <TableHead>Imagem</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {combinations.map((combo) => {
                  const ribbon = ribbonColors.find(r => r.id === combo.ribbonId);
                  const pkg = packageColors.find(p => p.id === combo.packageId);
                  
                  return (
                    <TableRow key={`${combo.ribbonId}-${combo.packageId}`}>
                      <TableCell>{ribbon?.name || combo.ribbonId}</TableCell>
                      <TableCell>{pkg?.name || combo.packageId}</TableCell>
                      <TableCell>
                        <div className="w-16 h-16 rounded overflow-hidden bg-muted">
                          <img 
                            src={combo.imageUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/100?text=Erro";
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeCombination(combo.ribbonId, combo.packageId)}
                        >
                          Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <Label htmlFor="whatsappNumber">Número de WhatsApp (com código do país)</Label>
                <Input 
                  id="whatsappNumber" 
                  value={newWhatsappNumber} 
                  onChange={(e) => setNewWhatsappNumber(e.target.value)}
                  placeholder="Ex: 5511999999999"
                />
              </div>
              <Button onClick={handleUpdateWhatsapp}>Atualizar Número</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
