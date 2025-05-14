
import React from 'react';
import { useProductsStore } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddCombinationDialog from './combinations/AddCombinationDialog';
import CombinationsList from './combinations/CombinationsList';
import { useToast } from "@/hooks/use-toast";

const CombinationsManagement: React.FC = () => {
  const { 
    ribbonColors, 
    packageColors, 
    combinations,
    addCombination,
    removeCombination
  } = useProductsStore();
  
  const { toast } = useToast();
  
  const handleRemoveCombination = (ribbonId: string, packageId: string) => {
    removeCombination(ribbonId, packageId);
    
    toast({
      title: "Combinação removida",
      description: "A combinação foi removida com sucesso."
    });
  };
  
  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Gerenciamento de Combinações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Combinações Disponíveis</h3>
            <AddCombinationDialog 
              ribbonColors={ribbonColors}
              packageColors={packageColors}
              combinations={combinations}
              addCombination={addCombination}
            />
          </div>
          
          <CombinationsList 
            combinations={combinations}
            ribbonColors={ribbonColors}
            packageColors={packageColors}
            onRemoveCombination={handleRemoveCombination}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CombinationsManagement;
