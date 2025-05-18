
import React from 'react';
import { Flavor } from '@/data/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/utils/formatter';

interface FlavorItemProps {
  flavor: Flavor;
  onEdit: (flavor: Flavor) => void;
  onDelete: (id: string) => void;
}

const FlavorItem: React.FC<FlavorItemProps> = ({ flavor, onEdit, onDelete }) => {
  return (
    <tr key={flavor.id} className="border-b hover:bg-muted/50 transition-colors">
      <td className="p-3 pl-4 text-left">
        <span className="font-medium">{flavor.name}</span>
        {flavor.isNew && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Novo
          </span>
        )}
      </td>
      <td className="p-3 text-right">{formatCurrency(flavor.price)}</td>
      <td className="p-3 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(flavor)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600" 
              onClick={() => onDelete(flavor.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default FlavorItem;
