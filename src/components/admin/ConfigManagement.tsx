
import React from 'react';
import { useProductsStore } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BannerImageUploader from './BannerImageUploader';
import PasswordManagement from './PasswordManagement';
import { ExternalLink } from 'lucide-react';

const ConfigManagement = () => {
  const { toast } = useToast();
  const whatsappNumber = useProductsStore(state => state.whatsappNumber);
  const setWhatsappNumber = useProductsStore(state => state.setWhatsappNumber);
  const headerImageUrl = useProductsStore(state => state.headerImageUrl);
  const setHeaderImageUrl = useProductsStore(state => state.setHeaderImageUrl);
  const catalogBemCasadosUrl = useProductsStore(state => state.catalogBemCasadosUrl);
  const setCatalogBemCasadosUrl = useProductsStore(state => state.setCatalogBemCasadosUrl);
  const catalogBolosGeladosUrl = useProductsStore(state => state.catalogBolosGeladosUrl);
  const setCatalogBolosGeladosUrl = useProductsStore(state => state.setCatalogBolosGeladosUrl);

  const [number, setNumber] = React.useState(whatsappNumber);
  const [bemCasadosUrl, setBemCasadosUrl] = React.useState(catalogBemCasadosUrl || '');
  const [bolosGeladosUrl, setBolosGeladosUrl] = React.useState(catalogBolosGeladosUrl || '');

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
    setCatalogBemCasadosUrl(bemCasadosUrl);
    setCatalogBolosGeladosUrl(bolosGeladosUrl);
    
    toast({
      title: 'Links de catálogo salvos',
      description: 'Os links para os catálogos foram atualizados com sucesso.',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const openCatalogLink = (url: string | null) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast({
        title: 'Link não configurado',
        description: 'O link para este catálogo ainda não foi configurado.',
        variant: 'destructive',
      });
    }
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
            Configure os links para seus catálogos de produtos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bemCasados">Link do Catálogo de Bem-Casados</Label>
              <Input
                id="bemCasados"
                placeholder="https://exemplo.com/bem-casados"
                value={bemCasadosUrl}
                onChange={(e) => setBemCasadosUrl(e.target.value)}
                className="rounded-full"
              />
              {bemCasadosUrl && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openCatalogLink(bemCasadosUrl)}
                    className="text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Visualizar
                  </Button>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="bolosGelados">Link do Catálogo de Bolos Gelados</Label>
              <Input
                id="bolosGelados"
                placeholder="https://exemplo.com/bolos-gelados"
                value={bolosGeladosUrl}
                onChange={(e) => setBolosGeladosUrl(e.target.value)}
                className="rounded-full"
              />
              {bolosGeladosUrl && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openCatalogLink(bolosGeladosUrl)}
                    className="text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Visualizar
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
            Salvar Links de Catálogo
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
