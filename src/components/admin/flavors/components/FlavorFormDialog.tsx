
import React from 'react';
import { Flavor } from '@/data/types';
import ItemFormModal from '../../colors/components/ItemFormModal';

interface FlavorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Flavor>) => void;
  initialValues?: Flavor;
}

const FlavorFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
}: FlavorFormDialogProps) => {
  return (
    <ItemFormModal
      open={open}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      onSubmit={onSubmit}
      itemType="flavor"
      title={initialValues ? "Editar Sabor" : "Novo Sabor"}
    />
  );
};

export default FlavorFormDialog;
