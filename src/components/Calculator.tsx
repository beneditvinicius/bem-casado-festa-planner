
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plus, Minus, PlusCircle, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, formatQuantity } from '@/utils/formatter.tsx';
import { Flavor, useProductsStore } from '@/data/products';

interface FlavorSelection {
  id: string;
  flavorId: string;
  quantity: number;
}

const Calculator: React.FC = () => {
  const { toast } = useToast();
  const flavors = useProductsStore((state) => state.flavors);
  
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([
    { id: '1', flavorId: flavors[0]?.id || '', quantity: 0 }
  ]);
  
  const [total, setTotal] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [flavorSelections]);

  const calculateTotal = () => {
    let sum = 0;
    flavorSelections.forEach((selection) => {
      const flavor = flavors.find(f => f.id === selection.flavorId);
      if (flavor && selection.quantity > 0) {
        sum += flavor.price * selection.quantity;
      }
    });
    setTotal(sum);
  };

  const handleFlavorChange = (id: string, flavorId: string) => {
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, flavorId } : item
    ));
  };

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    
    if (isNaN(quantity) || quantity === 0) {
      setFlavorSelections(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: 0 } : item
      ));
      return;
    }
    
    if (quantity < 20) {
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades.",
      });
      setFlavorSelections(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: 20 } : item
      ));
      return;
    }
    
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const incrementQuantity = (id: string) => {
    setFlavorSelections(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 0) + 1) } : item
    ));
  };

  const decrementQuantity = (id: string) => {
    setFlavorSelections(prev => prev.map(item => {
      if (item.id !== id) return item;
      
      const newQuantity = (item.quantity || 0) - 1;
      if (newQuantity < 20 && newQuantity > 0) {
        toast({
          title: "Quantidade mínima",
          description: "O pedido mínimo é de 20 unidades.",
        });
        return { ...item, quantity: 20 };
      }
      
      return { ...item, quantity: Math.max(0, newQuantity) };
    }));
  };

  const addFlavorSelection = () => {
    const newId = String(Date.now());
    setFlavorSelections(prev => [...prev, { 
      id: newId, 
      flavorId: flavors[0]?.id || '', 
      quantity: 0 
    }]);
  };

  const removeFlavorSelection = (id: string) => {
    if (flavorSelections.length <= 1) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa ter pelo menos um sabor selecionado.",
      });
      return;
    }
    
    setFlavorSelections(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setFlavorSelections([{ 
      id: '1', 
      flavorId: flavors[0]?.id || '', 
      quantity: 0 
    }]);
    toast({
      title: "Calculadora reiniciada",
      description: "Os valores foram redefinidos."
    });
  };

  const getTotalQuantity = () => {
    return flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <p className="text-center text-lg mb-6">
          Apresentamos a maravilhosa calculadora de bem-casados! Com essa ferramenta, você pode calcular o valor do seu pedido, fazer seu orçamento detalhado que vai direto para nosso WhatsApp e pode simular a cor do seu bem-casado para ter certeza de que sua lembrança ficará do jeitinho que sonhou!
        </p>
        
        <div className="space-y-6">
          {flavorSelections.map((selection, index) => {
            const selectedFlavor = flavors.find(f => f.id === selection.flavorId);
            
            return (
              <div key={selection.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Sabor {index + 1}</h3>
                  {flavorSelections.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFlavorSelection(selection.id)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`flavor-${selection.id}`} className="text-lg">Escolha o Sabor</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Ajuda</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Selecione o sabor de bem-casado desejado. Cada sabor possui um valor específico por unidade.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select 
                      value={selection.flavorId} 
                      onValueChange={(value) => handleFlavorChange(selection.id, value)}
                    >
                      <SelectTrigger id={`flavor-${selection.id}`} className="text-xl h-14">
                        <SelectValue placeholder="Selecione um sabor" />
                      </SelectTrigger>
                      <SelectContent>
                        {flavors.map((flavor) => (
                          <SelectItem key={flavor.id} value={flavor.id} className="text-lg">
                            {flavor.name} - {formatCurrency(flavor.price)}/unidade
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`quantity-${selection.id}`} className="text-lg">Quantidade Desejada</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Ajuda</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Digite a quantidade de bem-casados desejada. O pedido mínimo é de 20 unidades.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => decrementQuantity(selection.id)}
                        className="rounded-r-none h-14 w-14"
                        disabled={selection.quantity <= 0}
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <Input
                        id={`quantity-${selection.id}`}
                        type="number"
                        min="20"
                        value={selection.quantity || ""}
                        placeholder="Mínimo 20"
                        onChange={(e) => handleQuantityChange(selection.id, e.target.value)}
                        className="text-xl h-14 text-center rounded-none border-x-0"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => incrementQuantity(selection.id)}
                        className="rounded-l-none h-14 w-14"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Pedido mínimo de 20 unidades.</p>
                  </div>
                  
                  {selectedFlavor && selection.quantity > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {formatQuantity(selection.quantity)} unidades x {formatCurrency(selectedFlavor.price)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          <Button 
            variant="outline" 
            onClick={addFlavorSelection}
            className="w-full flex items-center justify-center gap-2 h-12"
          >
            <PlusCircle className="h-5 w-5" />
            Adicionar outro sabor
          </Button>
          
          <div className="pt-4">
            <div className="bg-[#fef2e6] p-6 rounded-md">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-end">
                  <span className="text-xl">Total do seu orçamento:</span>
                  <span className="text-[#eb6824] text-3xl font-bold">{formatCurrency(total)}</span>
                </div>
                <span className="text-muted-foreground">
                  Total: {formatQuantity(getTotalQuantity())} unidades
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
              <p>Parcelamos em até 2x. Após a assinatura do contrato, é necessário o pagamento de 20% para garantir a reserva. O restante deve ser quitado até 3 dias antes da entrega ou retirada (válido para pagamento à vista ou via PIX).</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="text-lg h-12"
            >
              Limpar Tudo
            </Button>
            
            <Button
              variant="default"
              className="text-lg h-12 bg-[#eb6824] hover:bg-[#d25618]"
              onClick={() => scrollToSection('faq')}
            >
              Veja as dúvidas frequentes dos nossos clientes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
