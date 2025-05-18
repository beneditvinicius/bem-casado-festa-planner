
import React from 'react';
import { RibbonColor } from '@/data/types';
import ItemFormModal from './ItemFormModal';

interface RibbonColorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<RibbonColor>) => void;
  initialValues?: RibbonColor;
}

const RibbonColorFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
}: RibbonColorFormDialogProps) => {
  return (
    <ItemFormModal
      open={open}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      onSubmit={onSubmit}
      itemType="ribbon"
      title={initialValues ? "Editar Cor de Fita" : "Nova Cor de Fita"}
    />
  );
};

export default RibbonColorFormDialog;
