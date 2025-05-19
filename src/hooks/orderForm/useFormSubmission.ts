
import { FormData, FlavorSelection, AdditionalSelection, ProductType } from './types';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/products';
import { useWhatsappMessageCreator } from './useWhatsAppMessageCreator';
import { useFormValidationHelpers } from './useFormValidationHelpers';
import { useWhatsAppRedirect } from './useWhatsAppRedirect';

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
  const { validateMinimumQuantity, showValidationError, showSuccessMessage } = useFormValidationHelpers();
  const { redirectToWhatsApp } = useWhatsAppRedirect();
  const { createWhatsAppMessage } = useWhatsappMessageCreator();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Get current selections based on product type
      const currentSelections = formData.productType === 'bem-casado' ? flavorSelections : boloGeladoSelections;
      
      // Validate minimum quantity
      if (!validateMinimumQuantity(currentSelections)) {
        return;
      }
      
      // Create WhatsApp message
      const message = createWhatsAppMessage(
        formData, 
        flavorSelections, 
        boloGeladoSelections,
        additionalSelections,
        flavors, 
        boloGeladoFlavors,
        ribbonColors, 
        packageColors, 
        additionals
      );
      
      // Show success message
      showSuccessMessage();
      
      // Redirect to WhatsApp
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
      redirectToWhatsApp(whatsappUrl);
    } else {
      // Show error message if validation fails
      showValidationError();
    }
  };
  
  return { handleSubmit };
};
