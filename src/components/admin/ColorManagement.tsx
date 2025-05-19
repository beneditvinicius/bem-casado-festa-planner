
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RibbonColorManagement from './colors/RibbonColorManagement';
import PackageColorManagement from './colors/PackageColorManagement';

// Add the proper type definition for the props
interface ColorManagementProps {
  tabType: 'ribbon' | 'package';
}

// Update the component to receive and use the props
const ColorManagement: React.FC<ColorManagementProps> = ({ tabType }) => {
  // Set the default tab value based on the tabType prop
  const defaultTab = tabType === 'ribbon' ? 'ribbons' : 'packages';

  return (
    <div className="w-full p-1">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="flex justify-center mb-6 w-full">
          <TabsTrigger value="ribbons" className="rounded-full px-6">Fitas</TabsTrigger>
          <TabsTrigger value="packages" className="rounded-full px-6">Embalagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ribbons" className="flex justify-center">
          <div className="max-w-3xl w-full">
            <RibbonColorManagement />
          </div>
        </TabsContent>
        
        <TabsContent value="packages" className="flex justify-center">
          <div className="max-w-3xl w-full">
            <PackageColorManagement />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColorManagement;
