
import React from 'react';
import { useProductsStore } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import BannerImageUploader from './BannerImageUploader';
import PasswordManagement from './PasswordManagement';

const ConfigManagement = () => {
  const { toast } = useToast();
  const whatsappNumber = useProductsStore(state => state.whatsappNumber);
  const setWhatsappNumber = useProductsStore(state => state.setWhatsappNumber);
  const headerImageUrl = useProductsStore(state => state.headerImageUrl);
  const setHeaderImageUrl = useProductsStore(state => state.setHeaderImageUrl);
  const catalogoBemCasadosLink = useProductsStore(state => state.catalogoBemCasadosLink);
  const setCatalogoBemCasadosLink = useProductsStore(state => state.setCatalogoBemCasadosLink);
  const catalogoBolosGeladosLink = useProductsStore(state => state.catalogoBolosGeladosLink);
  const setCatalogoBolosGeladosLink = useProductsStore(state => state.setCatalogoBolosGeladosLink);

  const [number, setNumber] = React.useState(whatsappNumber);
  const [bemCasadosLink, setBemCasadosLink] = React.useState(catalogoBemCasadosLink);
  const [bolosGeladosLink, setBolosGeladosLink] = React.useState(catalogoBolosGeladosLink);

  const handleSaveWhatsApp = () => {
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

  const handleSaveCatalogLinks = () => {
    setCatalogoBemCasadosLink(bemCasadosLink);
    setCatalogoBolosGeladosLink(bolosGeladosLink);
    
    toast({
      title: 'Links salvos',
      description: 'Os links dos catálogos foram atualizados com sucesso.',
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
          <CardTitle>Links dos Catálogos</CardTitle>
          <CardDescription>
            Configure os links para os catálogos de Bem-Casados e Bolos Gelados que aparecerão na página inicial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bem-casados-link">Link Catálogo Bem-Casados</Label>
              <Input
                id="bem-casados-link"
                placeholder="https://exemplo.com/catalogo-bem-casados"
                value={bemCasadosLink}
                onChange={(e) => setBemCasadosLink(e.target.value)}
                className="rounded-full"
              />
              {bemCasadosLink && (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(bemCasadosLink, '_blank')}
                    className="rounded-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bolos-gelados-link">Link Catálogo Bolos Gelados</Label>
              <Input
                id="bolos-gelados-link"
                placeholder="https://exemplo.com/catalogo-bolos-gelados"
                value={bolosGeladosLink}
                onChange={(e) => setBolosGeladosLink(e.target.value)}
                className="rounded-full"
              />
              {bolosGeladosLink && (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(bolosGeladosLink, '_blank')}
                    className="rounded-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSaveCatalogLinks} 
            className="w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
          >
            Salvar Links dos Catálogos
          </Button>
        </CardFooter>
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
            onClick={handleSaveWhatsApp} 
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
