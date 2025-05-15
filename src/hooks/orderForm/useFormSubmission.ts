
import { FormData, FlavorSelection } from './types';
import { Flavor, RibbonColor, PackageColor } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { createWhatsAppMessage } from './useWhatsAppMessageCreator';

interface UseFormSubmissionProps {
  formData: FormData;
  flavorSelections: FlavorSelection[];
  flavors: Flavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  whatsappNumber: string;
  validateForm: () => boolean;
}

export const useFormSubmission = ({
  formData,
  flavorSelections,
  flavors,
  ribbonColors,
  packageColors,
  whatsappNumber,
  validateForm
}: UseFormSubmissionProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Extra validation check for minimum quantity
      const totalQuantity = flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      if (totalQuantity < 20) {
        toast({
          title: "Pedido mínimo",
          description: "O pedido mínimo é de 20 unidades.",
          variant: "destructive"
        });
        return;
      }
      
      const whatsappUrl = createWhatsAppMessage(
        formData, 
        flavorSelections, 
        flavors, 
        ribbonColors, 
        packageColors, 
        whatsappNumber
      );
      
      // Show success message
      toast({
        title: "Orçamento gerado com sucesso!",
        description: "Você será redirecionado para o WhatsApp.",
      });
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    } else {
      // Show error message if validation fails
      toast({
        title: "Erro no formulário",
        description: "Por favor, verifique os campos destacados.",
        variant: "destructive"
      });
    }
  };
  
  return { handleSubmit };
};
