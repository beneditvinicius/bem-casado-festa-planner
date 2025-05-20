
import React from 'react';
import { useProductsStore } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BannerImageUploader from './BannerImageUploader';
import PasswordManagement from './PasswordManagement';

const ConfigManagement = () => {
  const { toast } = useToast();
  const whatsappNumber = useProductsStore(state => state.whatsappNumber);
  const setWhatsappNumber = useProductsStore(state => state.setWhatsappNumber);
  const headerImageUrl = useProductsStore(state => state.headerImageUrl);
  const setHeaderImageUrl = useProductsStore(state => state.setHeaderImageUrl);

  const [number, setNumber] = React.useState(whatsappNumber);

  const handleSave = () => {
    const cleanNumber = number.replace(/\D/g, '');
    
    if (cleanNumber.length < 10) {
      toast({
        title: 'Número inválido',
        description: 'Por favor, digite um número de WhatsApp válido.',
        variant: 'destructive',
      });
      return;
    }

    setWhatsappNumber(cleanNumber);
    
    toast({
      title: 'Configuração salva',
      description: 'O número de WhatsApp foi atualizado com sucesso.',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Banner de Cabeçalho</CardTitle>
          <CardDescription>
            Faça upload de uma imagem para o cabeçalho do site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BannerImageUploader imageUrl={headerImageUrl || ''} onChange={setHeaderImageUrl} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp</CardTitle>
          <CardDescription>
            Configure o número de WhatsApp que receberá os pedidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">Número de WhatsApp</Label>
            <Input
              id="whatsapp"
              placeholder="Ex: 5565992000000"
              value={number}
              onChange={handleInputChange}
              className="rounded-full"
            />
            <p className="text-sm text-gray-500">
              Digite o número com código do país (55) e DDD (sem espaços ou caracteres especiais).
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSave} 
            className="w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
          >
            Salvar Configuração
          </Button>
        </CardFooter>
      </Card>

      <PasswordManagement />
    </div>
  );
};

export default ConfigManagement;
