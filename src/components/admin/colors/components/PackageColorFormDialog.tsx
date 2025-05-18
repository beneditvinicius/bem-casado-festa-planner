
import React from 'react';
import { PackageColor } from '@/data/types';
import ItemFormModal from './ItemFormModal';

interface PackageColorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<PackageColor>) => void;
  initialValues?: PackageColor;
}

const PackageColorFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
}: PackageColorFormDialogProps) => {
  return (
    <ItemFormModal
      open={open}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      onSubmit={onSubmit}
      itemType="package"
      title={initialValues ? "Editar Cor de Embalagem" : "Nova Cor de Embalagem"}
    />
  );
};

export default PackageColorFormDialog;
