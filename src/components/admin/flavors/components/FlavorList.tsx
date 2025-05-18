
import React from 'react';
import { Flavor } from '@/data/types';
import FlavorItem from './FlavorItem';

interface FlavorListProps {
  flavors: Flavor[];
  onEditFlavor: (flavor: Flavor) => void;
  onDeleteFlavor: (id: string) => void;
}

const FlavorList: React.FC<FlavorListProps> = ({ 
  flavors, 
  onEditFlavor, 
  onDeleteFlavor 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-3 pl-4 text-left font-medium">Nome</th>
            <th className="p-3 text-right font-medium">Preço</th>
            <th className="p-3 text-center font-medium w-12">Ações</th>
          </tr>
        </thead>
        <tbody>
          {flavors.map(flavor => (
            <FlavorItem 
              key={flavor.id} 
              flavor={flavor} 
              onEdit={onEditFlavor}
              onDelete={onDeleteFlavor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlavorList;
