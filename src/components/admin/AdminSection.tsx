
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorManagement from './ColorManagement';
import ConfigManagement from './ConfigManagement';
import FlavorManagement from './flavors/FlavorManagement';

const AdminSection: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel de Administração</h1>
      
      <Tabs defaultValue="colors" className="animate-fade-in">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md rounded-xl p-1">
            <TabsTrigger value="colors" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Cores
            </TabsTrigger>
            <TabsTrigger value="flavors" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Sabores
            </TabsTrigger>
            <TabsTrigger value="packages" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Embalagens
            </TabsTrigger>
            <TabsTrigger value="config" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Config.
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="colors" className="transition-all duration-300">
          <ColorManagement />
        </TabsContent>
        
        <TabsContent value="flavors" className="transition-all duration-300">
          <FlavorManagement />
        </TabsContent>
        
        <TabsContent value="packages" className="transition-all duration-300">
          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              <h2 className="text-xl font-semibold mb-4 text-center">Gerenciamento de Embalagens</h2>
              <p className="text-center text-gray-500">Conteúdo em desenvolvimento</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="config" className="transition-all duration-300">
          <ConfigManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSection;
