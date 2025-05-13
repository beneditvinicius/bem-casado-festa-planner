
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  MessageSquare, 
  Upload, 
  Info, 
  Edit, 
  ChevronDown 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Flavor, 
  RibbonColor, 
  PackageColor, 
  Combination, 
  useProductsStore 
} from '@/data/products';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useIsMobile } from '@/hooks/use-mobile';

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const flavors = useProductsStore((state) => state.flavors);
  const ribbonColors = useProductsStore((state) => state.ribbonColors);
  const packageColors = useProductsStore((state) => state.packageColors);
  const combinations = useProductsStore((state) => state.combinations);
  const whatsappNumber = useProductsStore((state) => state.whatsappNumber);
  
  const addFlavor = useProductsStore((state) => state.addFlavor);
  const removeFlavor = useProductsStore((state) => state.removeFlavor);
  const updateFlavor = useProductsStore((state) => state.updateFlavor);
  const addRibbonColor = useProductsStore((state) => state.addRibbonColor);
  const removeRibbonColor = useProductsStore((state) => state.removeRibbonColor);
  const updateRibbonColor = useProductsStore((state) => state.updateRibbonColor);
  const addPackageColor = useProductsStore((state) => state.addPackageColor);
  const removePackageColor = useProductsStore((state) => state.removePackageColor);
  const updatePackageColor = useProductsStore((state) => state.updatePackageColor);
  const addCombination = useProductsStore((state) => state.addCombination);
  const removeCombination = useProductsStore((state) => state.removeCombination);
  const setWhatsappNumber = useProductsStore((state) => state.setWhatsappNumber);
  
  const [newFlavor, setNewFlavor] = useState({ name: '', price: 0, isNew: false });
  const [newRibbon, setNewRibbon] = useState({ name: '', code: '', color: '#000000', isNew: false });
  const [newPackage, setNewPackage] = useState({ name: '', code: '', color: '#000000', isNew: false });
  const [newCombination, setNewCombination] = useState({ ribbonId: '', packageId: '', imageUrl: '' });
  const [newWhatsappNumber, setNewWhatsappNumber] = useState(whatsappNumber || '5566999580591');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<'flavor' | 'ribbon' | 'package'>('flavor');
  const [editItem, setEditItem] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState('flavors');
  
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddFlavor = () => {
    if (newFlavor.name && newFlavor.price > 0) {
      addFlavor({
        id: Date.now().toString(),
        name: newFlavor.name,
        price: newFlavor.price,
        isNew: newFlavor.isNew
      });
      setNewFlavor({ name: '', price: 0, isNew: false });
      toast({
        title: "Sucesso",
        description: "Sabor adicionado com sucesso.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Preencha todos os campos corretamente.",
        variant: "destructive"
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
        isNew: newRibbon.isNew
      });
      setNewRibbon({ name: '', code: '', color: '#000000', isNew: false });
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
        isNew: newPackage.isNew
      });
      setNewPackage({ name: '', code: '', color: '#000000', isNew: false });
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
    } else {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateWhatsapp = () => {
    if (!newWhatsappNumber) {
      toast({
        title: "Erro",
        description: "O número de WhatsApp não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }
    
    setWhatsappNumber(newWhatsappNumber);
    toast({
      title: "Sucesso",
      description: "Número de WhatsApp atualizado com sucesso.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setUploadedImages(prev => [...prev, ...filesArray]);
      
      toast({
        title: "Imagens carregadas",
        description: `${filesArray.length} imagens adicionadas para upload.`,
      });
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // Edit functions
  const openEditModal = (type: 'flavor' | 'ribbon' | 'package', item: any) => {
    setEditType(type);
    setEditItem({...item});
    setEditModalOpen(true);
  };
  
  const handleSaveEdit = () => {
    if (!editItem) return;
    
    try {
      if (editType === 'flavor') {
        if (editItem.name && editItem.price > 0) {
          updateFlavor(editItem.id, editItem);
          toast({
            title: "Sucesso",
            description: "Sabor atualizado com sucesso.",
          });
        } else {
          throw new Error("Nome e preço são obrigatórios");
        }
      } 
      else if (editType === 'ribbon') {
        if (editItem.name && editItem.color && editItem.code) {
          updateRibbonColor(editItem.id, editItem);
          toast({
            title: "Sucesso",
            description: "Cor de fita atualizada com sucesso.",
          });
        } else {
          throw new Error("Todos os campos são obrigatórios");
        }
      } 
      else if (editType === 'package') {
        if (editItem.name && editItem.color && editItem.code) {
          updatePackageColor(editItem.id, editItem);
          toast({
            title: "Sucesso",
            description: "Cor de embalagem atualizada com sucesso.",
          });
        } else {
          throw new Error("Todos os campos são obrigatórios");
        }
      }
      
      setEditModalOpen(false);
      setEditItem(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar alterações",
        variant: "destructive"
      });
    }
  };
  
  // Mobile section selector
  const handleMobileTabChange = (value: string) => {
    setCurrentTab(value);
    setMobileMenuOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Painel de Controle</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          // Mobile view with dropdown
          <div className="mb-4">
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {currentTab === 'flavors' && 'Sabores'}
              {currentTab === 'ribbons' && 'Fitas'}
              {currentTab === 'packages' && 'Embalagens'}
              {currentTab === 'combinations' && 'Combinações'}
              {currentTab === 'settings' && 'Configurações'}
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileMenuOpen ? 'transform rotate-180' : ''}`} />
            </Button>
            
            {mobileMenuOpen && (
              <div className="mt-2 rounded-md border bg-white shadow-sm">
                <div className="flex flex-col">
                  <button
                    className={`px-4 py-2 text-left hover:bg-gray-100 ${currentTab === 'flavors' ? 'bg-gray-50 font-medium' : ''}`}
                    onClick={() => handleMobileTabChange('flavors')}
                  >
                    Sabores
                  </button>
                  <button
                    className={`px-4 py-2 text-left hover:bg-gray-100 ${currentTab === 'ribbons' ? 'bg-gray-50 font-medium' : ''}`}
                    onClick={() => handleMobileTabChange('ribbons')}
                  >
                    Fitas
                  </button>
                  <button
                    className={`px-4 py-2 text-left hover:bg-gray-100 ${currentTab === 'packages' ? 'bg-gray-50 font-medium' : ''}`}
                    onClick={() => handleMobileTabChange('packages')}
                  >
                    Embalagens
                  </button>
                  <button
                    className={`px-4 py-2 text-left hover:bg-gray-100 ${currentTab === 'combinations' ? 'bg-gray-50 font-medium' : ''}`}
                    onClick={() => handleMobileTabChange('combinations')}
                  >
                    Combinações
                  </button>
                  <button
                    className={`px-4 py-2 text-left hover:bg-gray-100 ${currentTab === 'settings' ? 'bg-gray-50 font-medium' : ''}`}
                    onClick={() => handleMobileTabChange('settings')}
                  >
                    Configurações
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              {/* Mobile tab content */}
              {currentTab === 'flavors' && (
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 items-end">
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
                        value={newFlavor.price || ''} 
                        onChange={(e) => setNewFlavor({ ...newFlavor, price: parseFloat(e.target.value) || 0 })} 
                      />
                    </div>
                    <div className="flex items-center">
                      <Switch 
                        id="isNewFlavor" 
                        checked={newFlavor.isNew}
                        onCheckedChange={(checked) => setNewFlavor({ ...newFlavor, isNew: checked })}
                      />
                      <Label htmlFor="isNewFlavor" className="ml-2">Marcar como "Novidade"</Label>
                    </div>
                    <Button onClick={handleAddFlavor}>Adicionar Sabor</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
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
                            {flavor.isNew && <Badge className="bg-[#eb6824]">Novidade</Badge>}
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditModal('flavor', flavor)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
                </div>
              )}
              
              {currentTab === 'ribbons' && (
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 items-end">
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
                    <div className="flex items-center">
                      <Switch 
                        id="isNewRibbon" 
                        checked={newRibbon.isNew}
                        onCheckedChange={(checked) => setNewRibbon({ ...newRibbon, isNew: checked })}
                      />
                      <Label htmlFor="isNewRibbon" className="ml-2">Marcar como "Novidade"</Label>
                    </div>
                    <Button onClick={handleAddRibbon}>Adicionar Cor</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Cor</TableHead>
                        <TableHead>Ações</TableHead>
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
                              <span className="hidden sm:inline">{ribbon.color}</span>
                            </div>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditModal('ribbon', ribbon)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
                </div>
              )}
              
              {currentTab === 'packages' && (
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 items-end">
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
                    <div className="flex items-center">
                      <Switch 
                        id="isNewPackage" 
                        checked={newPackage.isNew}
                        onCheckedChange={(checked) => setNewPackage({ ...newPackage, isNew: checked })}
                      />
                      <Label htmlFor="isNewPackage" className="ml-2">Marcar como "Novidade"</Label>
                    </div>
                    <Button onClick={handleAddPackage}>Adicionar Cor</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Cor</TableHead>
                        <TableHead>Ações</TableHead>
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
                              <span className="hidden sm:inline">{pkg.color}</span>
                            </div>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditModal('package', pkg)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
                </div>
              )}
              
              {currentTab === 'combinations' && (
                
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-4">
                    <div className="flex items-start mb-2">
                      <Info className="h-5 w-5 text-amber-800 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800">Upload de Imagens em Massa</h3>
                        <p className="text-sm text-amber-800">
                          Para melhor organização, nomeie suas imagens seguindo o padrão: 
                          <span className="font-medium"> fita_[nome]_embalagem_[nome].jpg</span> 
                          (ex: fita_dourado_embalagem_rose.jpg)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="border-dashed border-2 rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-center text-sm text-gray-500 mb-4">
                        Arraste e solte suas imagens aqui, ou clique para selecionar
                      </p>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="image-upload">
                        <Button variant="default" className="cursor-pointer">
                          Selecionar Imagens
                        </Button>
                      </label>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Imagens para upload ({uploadedImages.length})</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeUploadedImage(index)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </Button>
                              </div>
                              <p className="text-xs mt-1 truncate">{image.name}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button className="bg-[#eb6824] hover:bg-[#d25618]">
                            Carregar {uploadedImages.length} imagens
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Adicionar Combinação Manual</h4>
                    <div className="grid grid-cols-1 gap-4 items-end">
                      <div>
                        <Label htmlFor="comboRibbon">Fita</Label>
                        <Select 
                          value={newCombination.ribbonId} 
                          onValueChange={(value) => setNewCombination({ ...newCombination, ribbonId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma fita" />
                          </SelectTrigger>
                          <SelectContent>
                            {ribbonColors.map((ribbon) => (
                              <SelectItem key={ribbon.id} value={ribbon.id}>{ribbon.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="comboPackage">Embalagem</Label>
                        <Select
                          value={newCombination.packageId}
                          onValueChange={(value) => setNewCombination({ ...newCombination, packageId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma embalagem" />
                          </SelectTrigger>
                          <SelectContent>
                            {packageColors.map((pkg) => (
                              <SelectItem key={pkg.id} value={pkg.id}>{pkg.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                  </div>
                  
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fita</TableHead>
                        <TableHead>Embalagem</TableHead>
                        <TableHead>Imagem</TableHead>
                        <TableHead>Ações</TableHead>
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
                </div>
              )}
              
              {currentTab === 'settings' && (
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 items-end">
                    <div>
                      <Label htmlFor="whatsappNumber">Número de WhatsApp (com código do país)</Label>
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 text-[#eb6824]" />
                        <Input 
                          id="whatsappNumber" 
                          value={newWhatsappNumber} 
                          onChange={(e) => setNewWhatsappNumber(e.target.value)}
                          placeholder="Ex: 5511999999999"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Atualmente configurado: {newWhatsappNumber || "Não configurado"}
                      </p>
                    </div>
                    <Button onClick={handleUpdateWhatsapp} className="bg-[#eb6824] hover:bg-[#d25618]">
                      Atualizar Número
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Desktop view with tabs
          <Tabs defaultValue="flavors" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="flavors">Sabores</TabsTrigger>
              <TabsTrigger value="ribbons">Fitas</TabsTrigger>
              <TabsTrigger value="packages">Embalagens</TabsTrigger>
              <TabsTrigger value="combinations">Combinações</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            {/* Flavors Tab */}
            <TabsContent value="flavors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
                    value={newFlavor.price || ''} 
                    onChange={(e) => setNewFlavor({ ...newFlavor, price: parseFloat(e.target.value) || 0 })} 
                  />
                </div>
                <div className="flex items-center">
                  <Switch 
                    id="isNewFlavor" 
                    checked={newFlavor.isNew}
                    onCheckedChange={(checked) => setNewFlavor({ ...newFlavor, isNew: checked })}
                  />
                  <Label htmlFor="isNewFlavor" className="ml-2">Marcar como "Novidade"</Label>
                </div>
                <Button onClick={handleAddFlavor}>Adicionar Sabor</Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[180px]">Ações</TableHead>
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
                        {flavor.isNew && <Badge className="bg-[#eb6824]">Novidade</Badge>}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal('flavor', flavor)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Editar
                        </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                <div className="flex items-center">
                  <Switch 
                    id="isNewRibbon" 
                    checked={newRibbon.isNew}
                    onCheckedChange={(checked) => setNewRibbon({ ...newRibbon, isNew: checked })}
                  />
                  <Label htmlFor="isNewRibbon" className="ml-2">Marcar como "Novidade"</Label>
                </div>
                <div className="md:col-span-2">
                  <Button onClick={handleAddRibbon}>Adicionar Cor de Fita</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[180px]">Ações</TableHead>
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
                        {ribbon.isNew && <Badge className="bg-[#eb6824]">Novidade</Badge>}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal('ribbon', ribbon)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Editar
                        </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                <div className="flex items-center">
                  <Switch 
                    id="isNewPackage" 
                    checked={newPackage.isNew}
                    onCheckedChange={(checked) => setNewPackage({ ...newPackage, isNew: checked })}
                  />
                  <Label htmlFor="isNewPackage" className="ml-2">Marcar como "Novidade"</Label>
                </div>
                <div className="md:col-span-2">
                  <Button onClick={handleAddPackage}>Adicionar Cor de Embalagem</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[180px]">Ações</TableHead>
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
                        {pkg.isNew && <Badge className="bg-[#eb6824]">Novidade</Badge>}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal('package', pkg)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Editar
                        </Button>
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
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                <div className="flex items-start mb-2">
                  <Info className="h-5 w-5 text-amber-800 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">Upload de Imagens em Massa</h3>
                    <p className="text-sm text-amber-800">
                      Para melhor organização, nomeie suas imagens seguindo o padrão: 
                      <span className="font-medium"> fita_[nome]_embalagem_[nome].jpg</span> 
                      (ex: fita_dourado_embalagem_rose.jpg)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="border-dashed border-2 rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-center text-sm text-gray-500 mb-4">
                    Arraste e solte suas imagens aqui, ou clique para selecionar
                  </p>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="default" className="cursor-pointer">
                      Selecionar Imagens
                    </Button>
                  </label>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Imagens para upload ({uploadedImages.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeUploadedImage(index)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </Button>
                          </div>
                          <p className="text-xs mt-1 truncate">{image.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-[#eb6824] hover:bg-[#d25618]">
                        Carregar {uploadedImages.length} imagens
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Adicionar Combinação Manual</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor="comboRibbon">Fita</Label>
                    <Select 
                      value={newCombination.ribbonId} 
                      onValueChange={(value) => setNewCombination({ ...newCombination, ribbonId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma fita" />
                      </SelectTrigger>
                      <SelectContent>
                        {ribbonColors.map((ribbon) => (
                          <SelectItem key={ribbon.id} value={ribbon.id}>{ribbon.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="comboPackage">Embalagem</Label>
                    <Select
                      value={newCombination.packageId}
                      onValueChange={(value) => setNewCombination({ ...newCombination, packageId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma embalagem" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageColors.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>{pkg.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">URL da Imagem</Label>
                    <Input 
                      id="imageUrl" 
                      value={newCombination.imageUrl} 
                      onChange={(e) => setNewCombination({ ...newCombination, imageUrl: e.target.value })} 
                    />
                  </div>
                  <div>
                    <Button onClick={handleAddCombination} className="w-full">Adicionar Combinação</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fita</TableHead>
                      <TableHead>Embalagem</TableHead>
                      <TableHead>Imagem</TableHead>
                      <TableHead>Ações</TableHead>
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
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <Label htmlFor="whatsappNumber">Número de WhatsApp (com código do país)</Label>
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 text-[#eb6824]" />
                    <Input 
                      id="whatsappNumber" 
                      value={newWhatsappNumber} 
                      onChange={(e) => setNewWhatsappNumber(e.target.value)}
                      placeholder="Ex: 5511999999999"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Atualmente configurado: {newWhatsappNumber || "Não configurado"}
                  </p>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleUpdateWhatsapp} className="bg-[#eb6824] hover:bg-[#d25618]">
                    Atualizar Número
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType === 'flavor' && 'Editar Sabor'}
              {editType === 'ribbon' && 'Editar Fita'}
              {editType === 'package' && 'Editar Embalagem'}
            </DialogTitle>
          </DialogHeader>
          
          {editItem && (
            <div className="space-y-4 py-4">
              {editType === 'flavor' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Nome</Label>
                    <Input 
                      id="edit-name" 
                      value={editItem.name} 
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Preço</Label>
                    <Input 
                      id="edit-price" 
                      type="number"
                      step="0.01"
                      min="0"
                      value={editItem.price} 
                      onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="edit-isNew" 
                      checked={editItem.isNew}
                      onCheckedChange={(checked) => setEditItem({ ...editItem, isNew: checked })}
                    />
                    <Label htmlFor="edit-isNew">Marcar como "Novidade"</Label>
                  </div>
                </>
              )}
              
              {(editType === 'ribbon' || editType === 'package') && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Nome</Label>
                    <Input 
                      id="edit-name" 
                      value={editItem.name} 
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-code">Código</Label>
                    <Input 
                      id="edit-code" 
                      value={editItem.code} 
                      onChange={(e) => setEditItem({ ...editItem, code: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-color">Cor (Hex)</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="edit-color" 
                        value={editItem.color} 
                        onChange={(e) => setEditItem({ ...editItem, color: e.target.value })}
                      />
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: editItem.color }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="edit-isNew" 
                      checked={editItem.isNew}
                      onCheckedChange={(checked) => setEditItem({ ...editItem, isNew: checked })}
                    />
                    <Label htmlFor="edit-isNew">Marcar como "Novidade"</Label>
                  </div>
                </>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminPanel;
