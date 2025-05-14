
import React from 'react';
import { Image } from "lucide-react";
import CombinationItem from './CombinationItem';
import { RibbonColor, PackageColor, Combination } from '@/data/products';

interface CombinationsListProps {
  combinations: Combination[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  onRemoveCombination: (ribbonId: string, packageId: string) => void;
}

const CombinationsList: React.FC<CombinationsListProps> = ({
  combinations,
  ribbonColors,
  packageColors,
  onRemoveCombination
}) => {
  if (combinations.length === 0) {
    return (
      <div className="text-center py-10">
        <Image className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma combinação adicionada</h3>
        <p className="mt-1 text-sm text-gray-500">
          Adicione combinações para mostrar aos clientes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {combinations.map((combination) => {
        const ribbon = ribbonColors.find(r => r.id === combination.ribbonId);
        const pkg = packageColors.find(p => p.id === combination.packageId);
        
        return (
          <CombinationItem 
            key={`${combination.ribbonId}-${combination.packageId}`}
            ribbonId={combination.ribbonId}
            packageId={combination.packageId}
            imageUrl={combination.imageUrl}
            ribbon={ribbon}
            pkg={pkg}
            onRemove={onRemoveCombination}
          />
        );
      })}
    </div>
  );
};

export default CombinationsList;
