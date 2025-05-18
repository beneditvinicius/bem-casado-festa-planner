
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorManagement from './ColorManagement';
import BannerManagement from './BannerManagement';
import ConfigManagement from './ConfigManagement';

const AdminSection: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel de Administração</h1>
      
      <Tabs defaultValue="banner">
        <TabsList className="mb-6 flex justify-center">
          <TabsTrigger value="banner" className="rounded-full">Gerenciar Banner</TabsTrigger>
          <TabsTrigger value="colors" className="rounded-full">Gerenciar Cores</TabsTrigger>
          <TabsTrigger value="config" className="rounded-full">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="banner">
          <BannerManagement />
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorManagement />
        </TabsContent>
        
        <TabsContent value="config">
          <ConfigManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSection;
