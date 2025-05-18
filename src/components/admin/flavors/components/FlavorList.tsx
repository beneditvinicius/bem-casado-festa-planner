
import React from 'react';
import { Flavor } from '@/data/types';
import FlavorItem from './FlavorItem';

interface FlavorListProps {
  flavors: Flavor[];
  onEditFlavor: (flavor: Flavor) => void;
  onDeleteFlavor: (id: string) => void;
  isLoading?: boolean;
}

const FlavorList = ({ flavors, onEditFlavor, onDeleteFlavor, isLoading = false }: FlavorListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (flavors.length === 0) {
    return <div className="text-center py-6">Nenhum sabor encontrado. Adicione um novo sabor.</div>;
  }

  return (
    <div className="space-y-4">
      {flavors.map((flavor) => (
        <FlavorItem
          key={flavor.id}
          flavor={flavor}
          onEdit={() => onEditFlavor(flavor)}
          onDelete={() => onDeleteFlavor(flavor.id)}
        />
      ))}
    </div>
  );
};

export default FlavorList;
