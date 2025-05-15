
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ModalDialog({
  title,
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "Salvar",
  cancelText = "Cancelar",
  isLoading = false
}: ModalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle>{title}</DialogTitle>
          <Button 
            variant="ghost" 
            className="absolute right-4 top-4 rounded-full p-2 h-auto" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogHeader>
        
        <div className="py-4">
          {children}
        </div>
        
        <DialogFooter className="flex justify-center sm:justify-center gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="rounded-full"
          >
            {cancelText}
          </Button>
          <Button 
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
