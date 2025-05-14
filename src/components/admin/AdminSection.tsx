
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorManagement from './ColorManagement';
import CombinationsManagement from './CombinationsManagement';

const AdminSection: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Painel de Administração</h1>
      
      <Tabs defaultValue="colors">
        <TabsList className="mb-6">
          <TabsTrigger value="colors">Gerenciar Cores</TabsTrigger>
          <TabsTrigger value="combinations">Gerenciar Combinações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <ColorManagement />
        </TabsContent>
        
        <TabsContent value="combinations">
          <CombinationsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSection;
