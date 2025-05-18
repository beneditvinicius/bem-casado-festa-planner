
import React from 'react';
import { Flavor } from '@/data/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash } from 'lucide-react';

interface FlavorItemProps {
  flavor: Flavor;
  onEdit: () => void;
  onDelete: () => void;
}

const FlavorItem = ({ flavor, onEdit, onDelete }: FlavorItemProps) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(flavor.price);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{flavor.name}</h3>
            {flavor.isNew && <Badge className="bg-[#eb6824]">Novidade</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{formattedPrice}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlavorItem;
