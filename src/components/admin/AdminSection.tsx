
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorManagement from './ColorManagement';
import ConfigManagement from './ConfigManagement';
import FlavorManagement from './flavors/FlavorManagement';
import BoloGeladoManagement from './bolos/BoloGeladoManagement';
import AdditionalsManagement from './additionals/AdditionalsManagement';

// Define the proper type for the ColorManagement component
interface ColorManagementProps {
  tabType: 'ribbon' | 'package';
}

const AdminSection: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel de Administração</h1>
      
      <Tabs defaultValue="flavors" className="animate-fade-in">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl rounded-xl p-1">
            <TabsTrigger value="flavors" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Sabores
            </TabsTrigger>
            <TabsTrigger value="ribbons" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Fitas
            </TabsTrigger>
            <TabsTrigger value="packages" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Embalagens
            </TabsTrigger>
            <TabsTrigger value="bolo-gelado" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Bolo Gelado
            </TabsTrigger>
            <TabsTrigger value="additionals" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Adicionais
            </TabsTrigger>
            <TabsTrigger value="config" className="rounded-full data-[state=active]:bg-[#eb6824] data-[state=active]:text-white transition-all duration-300">
              Config.
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="flavors" className="transition-all duration-300">
          <FlavorManagement />
        </TabsContent>
        
        <TabsContent value="ribbons" className="transition-all duration-300">
          <ColorManagement tabType="ribbon" />
        </TabsContent>
        
        <TabsContent value="packages" className="transition-all duration-300">
          <ColorManagement tabType="package" />
        </TabsContent>
        
        <TabsContent value="bolo-gelado" className="transition-all duration-300">
          <BoloGeladoManagement />
        </TabsContent>
        
        <TabsContent value="additionals" className="transition-all duration-300">
          <AdditionalsManagement />
        </TabsContent>
        
        <TabsContent value="config" className="transition-all duration-300">
          <ConfigManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSection;
