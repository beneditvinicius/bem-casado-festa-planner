
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RibbonColorManagement from './colors/RibbonColorManagement';
import PackageColorManagement from './colors/PackageColorManagement';

const ColorManagement: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Cores</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ribbons">
          <TabsList className="mb-4">
            <TabsTrigger value="ribbons">Cores de Fitas</TabsTrigger>
            <TabsTrigger value="packages">Cores de Embalagens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ribbons">
            <RibbonColorManagement />
          </TabsContent>
          
          <TabsContent value="packages">
            <PackageColorManagement />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ColorManagement;
