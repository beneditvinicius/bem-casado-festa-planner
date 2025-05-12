
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, formatQuantity } from '@/utils/formatter';
import { Flavor, useProductsStore } from '@/data/products';

const Calculator: React.FC = () => {
  const { toast } = useToast();
  const flavors = useProductsStore((state) => state.flavors);
  
  const [quantity, setQuantity] = useState<number>(20);
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>(flavors[0]?.id || '');
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (selectedFlavorId) {
      const flavor = flavors.find(f => f.id === selectedFlavorId);
      setSelectedFlavor(flavor || null);
    }
  }, [selectedFlavorId, flavors]);

  useEffect(() => {
    if (selectedFlavor && quantity > 0) {
      setTotal(selectedFlavor.price * quantity);
    } else {
      setTotal(0);
    }
  }, [selectedFlavor, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      setQuantity(20);
    } else if (value < 20) {
      setQuantity(20);
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades.",
      });
    } else {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 10);
  };

  const decrementQuantity = () => {
    if (quantity <= 20) {
      toast({
        title: "Quantidade mínima",
        description: "O pedido mínimo é de 20 unidades.",
      });
      return;
    }
    setQuantity(prev => Math.max(20, prev - 10));
  };

  const handleReset = () => {
    setQuantity(20);
    setSelectedFlavorId(flavors[0]?.id || '');
    toast({
      title: "Calculadora reiniciada",
      description: "Os valores foram redefinidos."
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="flavor" className="text-lg">Escolha o Sabor</Label>
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
              value={selectedFlavorId} 
              onValueChange={setSelectedFlavorId}
            >
              <SelectTrigger id="flavor" className="text-xl h-14">
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
              <Label htmlFor="quantity" className="text-lg">Quantidade Desejada</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Ajuda</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Digite a quantidade de bem-casados desejada. O pedido mínimo é de 20 unidades. Você também pode usar os botões para aumentar ou diminuir a quantidade em intervalos de 10.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={decrementQuantity}
                className="rounded-r-none h-14 w-14"
                disabled={quantity <= 20}
              >
                <Minus className="h-5 w-5" />
              </Button>
              <Input
                id="quantity"
                type="number"
                min="20"
                value={quantity}
                onChange={handleQuantityChange}
                className="text-xl h-14 text-center rounded-none border-x-0"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={incrementQuantity}
                className="rounded-l-none h-14 w-14"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="bg-muted p-6 rounded-md">
              <div className="flex flex-col space-y-1">
                {selectedFlavor && (
                  <div className="flex justify-between text-lg">
                    <span>Valor por unidade:</span>
                    <span className="font-medium">{formatCurrency(selectedFlavor.price)}</span>
                  </div>
                )}
                <div className="flex justify-between items-end">
                  <span className="text-xl">Total do seu orçamento:</span>
                  <span className="text-bem text-3xl font-bold">{formatCurrency(total)}</span>
                </div>
                {quantity > 0 && selectedFlavor && (
                  <span className="text-muted-foreground">
                    {formatQuantity(quantity)} unidades x {formatCurrency(selectedFlavor.price)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="text-lg h-12"
            >
              Limpar Tudo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
