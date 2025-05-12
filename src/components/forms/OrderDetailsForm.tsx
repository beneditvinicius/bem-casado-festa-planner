
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Flavor, RibbonColor, PackageColor } from '@/data/products';

interface OrderDetailsFormProps {
  formData: {
    quantity: number;
    flavorId: string;
    ribbonId: string;
    packageId: string;
  };
  errors: { [key: string]: string };
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  calculateTotal: () => string;
}

const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({
  formData,
  errors,
  flavors,
  ribbonColors,
  packageColors,
  handleInputChange,
  handleSelectChange,
  calculateTotal,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Detalhes do Pedido</h3>
      
      <div>
        <Label htmlFor="quantity" className="text-base">Quantidade</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          min="1"
          className={cn("h-12", errors.quantity && "border-red-500")}
        />
        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
      </div>
      
      <div>
        <Label htmlFor="flavor" className="text-base">Sabor</Label>
        <Select 
          value={formData.flavorId} 
          onValueChange={(value) => handleSelectChange('flavorId', value)}
        >
          <SelectTrigger id="flavor" className={cn("h-12", errors.flavorId && "border-red-500")}>
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
        {errors.flavorId && <p className="text-red-500 text-sm mt-1">{errors.flavorId}</p>}
      </div>
      
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
                  {color.name} - {color.code}
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
                  {color.name} - {color.code}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
      </div>

      <div className="pt-4">
        <div className="bg-muted p-4 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <span className="text-base">Valor Total (estimado):</span>
            <span className="text-bem text-xl font-bold">
              {calculateTotal()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
