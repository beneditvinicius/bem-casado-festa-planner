
import { FormData, FlavorSelection, AdditionalSelection, ProductType } from './types';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { createWhatsAppMessage } from './useWhatsAppMessageCreator';

interface UseFormSubmissionProps {
  formData: FormData;
  flavorSelections: FlavorSelection[];
  boloGeladoSelections: FlavorSelection[];
  additionalSelections: AdditionalSelection[];
  flavors: Flavor[];
  boloGeladoFlavors: BoloGeladoFlavor[];
  ribbonColors: RibbonColor[];
  packageColors: PackageColor[];
  additionals: Additional[];
  whatsappNumber: string;
  validateForm: () => boolean;
}

export const useFormSubmission = ({
  formData,
  flavorSelections,
  boloGeladoSelections,
  additionalSelections,
  flavors,
  boloGeladoFlavors,
  ribbonColors,
  packageColors,
  additionals,
  whatsappNumber,
  validateForm
}: UseFormSubmissionProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Extra validation check for minimum quantity
      const currentSelections = formData.productType === 'bem-casado' ? flavorSelections : boloGeladoSelections;
      const totalQuantity = currentSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
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
        boloGeladoSelections,
        additionalSelections,
        flavors, 
        boloGeladoFlavors,
        ribbonColors, 
        packageColors, 
        additionals,
        whatsappNumber
      );
      
      // Show success message
      toast({
        title: "Pedido gerado com sucesso!",
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
