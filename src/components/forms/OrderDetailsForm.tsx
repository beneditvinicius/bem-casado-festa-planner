
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { Flavor, RibbonColor, PackageColor } from '@/data/products';
import { FlavorSelection } from '@/hooks/useOrderForm';
import { QuantityField } from '@/components/ui/quantity-field';

interface OrderDetailsFormProps {
  formData: {
    ribbonId: string;
    packageId: string;
    observations: string;
  };
  errors: { [key: string]: string };
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  flavorSelections: FlavorSelection[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleAddFlavor: () => void;
  handleRemoveFlavor: (id: string) => void;
  handleFlavorChange: (id: string, flavorId: string) => void;
  handleFlavorQuantityChange: (id: string, value: string) => void;
  calculateTotal: () => string;
}

const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({
  formData,
  errors,
  flavors,
  ribbonColors,
  packageColors,
  flavorSelections,
  handleInputChange,
  handleSelectChange,
  handleAddFlavor,
  handleRemoveFlavor,
  handleFlavorChange,
  handleFlavorQuantityChange,
  calculateTotal,
}) => {
  const handleQuantityChange = (id: string, value: number | null) => {
    handleFlavorQuantityChange(id, value !== null ? value.toString() : '');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string, value: number | null) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      handleQuantityChange(id, value);
    }
  };

  // Calculate total quantity
  const totalQuantity = flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const showMinimumWarning = totalQuantity > 0 && totalQuantity < 20;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Detalhes do Pedido</h3>
      
      {flavorSelections.map((selection, index) => (
        <div key={selection.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Sabor {index + 1}</h4>
            {flavorSelections.length > 1 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveFlavor(selection.id)}
                className="h-8 w-8 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            <div>
              <Label htmlFor={`flavor-${selection.id}`} className="text-base">Sabor</Label>
              <Select 
                value={selection.flavorId} 
                onValueChange={(value) => handleFlavorChange(selection.id, value)}
              >
                <SelectTrigger id={`flavor-${selection.id}`} className={cn("h-12", errors[`flavor-${selection.id}`] && "border-red-500")}>
                  <SelectValue placeholder="Selecione um sabor" />
                </SelectTrigger>
                <SelectContent>
                  {flavors.map((flavor) => (
                    <SelectItem key={flavor.id} value={flavor.id}>
                      {flavor.name} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(flavor.price)}/un
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors[`flavor-${selection.id}`] && <p className="text-red-500 text-sm mt-1">{errors[`flavor-${selection.id}`]}</p>}
            </div>
            
            <div>
              <Label htmlFor={`quantity-${selection.id}`} className="text-base">Quantidade</Label>
              <QuantityField
                id={`quantity-${selection.id}`}
                value={selection.quantity || null}
                onChange={(value) => handleQuantityChange(selection.id, value)}
                hasButtons={false}
                className="h-12"
                error={errors[`quantity-${selection.id}`]}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Tab') {
                    e.preventDefault();
                  }
                }}
              />
              {errors[`quantity-${selection.id}`] && <p className="text-red-500 text-sm mt-1">{errors[`quantity-${selection.id}`]}</p>}
              <p className="text-sm text-muted-foreground mt-1">O pedido mínimo é de 20 unidades.</p>
            </div>
          </div>
        </div>
      ))}
      
      <Button 
        type="button"
        variant="outline" 
        onClick={handleAddFlavor}
        className="w-full flex items-center justify-center gap-2 h-10"
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar outro sabor
      </Button>
      
      <div>
        <Label htmlFor="ribbonColor" className="text-base">Cor da Fita</Label>
        <Select 
          value={formData.ribbonId} 
          onValueChange={(value) => handleSelectChange('ribbonId', value)}
        >
          <SelectTrigger id="ribbonColor" className={cn("h-12", errors.ribbonId && "border-red-500")}>
            <SelectValue placeholder="Selecione a cor da fita" />
          </SelectTrigger>
          <SelectContent>
            {ribbonColors.map((color) => (
              <SelectItem key={color.id} value={color.id}>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none' }}
                  />
                  {color.name} {color.code}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.ribbonId && <p className="text-red-500 text-sm mt-1">{errors.ribbonId}</p>}
      </div>
      
      <div>
        <Label htmlFor="packageColor" className="text-base">Cor da Embalagem</Label>
        <Select 
          value={formData.packageId} 
          onValueChange={(value) => handleSelectChange('packageId', value)}
        >
          <SelectTrigger id="packageColor" className={cn("h-12", errors.packageId && "border-red-500")}>
            <SelectValue placeholder="Selecione a cor da embalagem" />
          </SelectTrigger>
          <SelectContent>
            {packageColors.map((color) => (
              <SelectItem key={color.id} value={color.id}>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color.color, border: color.color === '#FFFFFF' || color.color === '#F8F4E3' ? '1px solid #E2E8F0' : 'none' }}
                  />
                  {color.name} {color.code}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
      </div>

      <div>
        <Label htmlFor="observations" className="text-base">Observações (opcional)</Label>
        <Textarea
          id="observations"
          name="observations"
          value={formData.observations || ""}
          onChange={handleInputChange}
          placeholder="Alguma observação sobre seu pedido?"
          className="min-h-[100px]"
        />
      </div>

      <div className="pt-4">
        <div className="bg-[#fef2e6] p-4 rounded-md mb-4">
          {showMinimumWarning && (
            <div className="text-red-500 text-sm font-medium mb-2 text-center">
              O pedido mínimo é de 20 unidades.
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-base">Valor Total (estimado):</span>
            <span className="text-[#eb6824] text-xl font-bold">
              {showMinimumWarning ? "Aguardando qtd. mínima" : calculateTotal()}
            </span>
          </div>
        </div>
        {errors.quantity && <p className="text-red-500 text-sm mt-1 text-center">{errors.quantity}</p>}
      </div>
    </div>
  );
};

export default OrderDetailsForm;
