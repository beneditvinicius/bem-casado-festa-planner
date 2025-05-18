
import React from 'react';
import { Flavor } from '@/data/types';
import FlavorItem from './FlavorItem';

interface FlavorListProps {
  flavors: Flavor[];
  onEditFlavor: (flavor: Flavor) => void;
  onDeleteFlavor: (id: string) => void;
}

const FlavorList = ({ flavors, onEditFlavor, onDeleteFlavor }: FlavorListProps) => {
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
