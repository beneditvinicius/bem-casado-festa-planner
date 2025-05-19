
import { FormData, FlavorSelection } from './types';
import { useToast } from "@/hooks/use-toast";

export const useFormValidationHelpers = () => {
  const { toast } = useToast();
  
  const validateMinimumQuantity = (
    currentSelections: FlavorSelection[]
  ): boolean => {
    const totalQuantity = currentSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
    if (totalQuantity < 20) {
      toast({
        title: "Pedido mínimo",
        description: "O pedido mínimo é de 20 unidades.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const showValidationError = () => {
    toast({
      title: "Erro no formulário",
      description: "Por favor, verifique os campos destacados.",
      variant: "destructive"
    });
  };
  
  const showSuccessMessage = () => {
    toast({
      title: "Pedido gerado com sucesso!",
      description: "Você será redirecionado para o WhatsApp.",
    });
  };
  
  return {
    validateMinimumQuantity,
    showValidationError,
    showSuccessMessage
  };
};
