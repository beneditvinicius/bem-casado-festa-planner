import { format } from 'date-fns';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/types';
import { FormData, FlavorSelection, AdditionalSelection } from './types';

export const useWhatsappMessageCreator = () => {
  const createWhatsAppMessage = (
    formData: FormData,
    flavorSelections: FlavorSelection[],
    boloGeladoSelections: FlavorSelection[],
    additionalSelections: AdditionalSelection[],
    flavors: Flavor[],
    boloGeladoFlavors: BoloGeladoFlavor[],
    ribbonColors: RibbonColor[],
    packageColors: PackageColor[],
    additionals: Additional[]
  ): string => {
    // Format date to Brazilian format dd/mm/yyyy if it exists
    const formattedDate = formData.eventDate 
      ? format(formData.eventDate, 'dd/MM/yyyy')
      : 'Não informada';

    // Get selected ribbon and package colors
    const selectedRibbon = ribbonColors.find(r => r.id === formData.ribbonId);
    const selectedPackage = packageColors.find(p => p.id === formData.packageId);
    
    // Build message
    let message = `*Aqui está meu pedido feito pelo site da La Badiane*%0A%0A`;
    message += `*Informações Pessoais:*%0A`;
    message += `Nome: ${formData.name}%0A`;
    message += `CPF: ${formData.cpf}%0A`;
    message += `Telefone: ${formData.phone}%0A%0A`;
    
    message += `*Endereço:*%0A`;
    message += `${formData.street}, ${formData.number}`;
    if (formData.complement) message += `, ${formData.complement}`;
    message += `%0A${formData.neighborhood}, ${formData.city} - ${formData.state}%0A`;
    message += `CEP: ${formData.cep}%0A%0A`;
    
    message += `*Informações do Evento:*%0A`;
    message += `Tipo: ${formData.eventType}%0A`;
    message += `Data: ${formattedDate}%0A`;
    if (formData.eventLocation) message += `Local: ${formData.eventLocation}%0A%0A`;
    
    message += `*Detalhes do Pedido:*%0A`;
    message += `Produto: ${formData.productType === 'bem-casado' ? 'Bem-casado' : 'Bolo Gelado'}%0A%0A`;
    
    // Add flavor selections based on product type
    if (formData.productType === 'bem-casado') {
      message += `*Sabores escolhidos:*%0A`;
      flavorSelections.forEach(selection => {
        const flavor = flavors.find(f => f.id === selection.flavorId);
        if (flavor && selection.quantity && selection.quantity > 0) {
          message += `- ${flavor.name}: ${selection.quantity} unidades%0A`;
        }
      });
      
      message += `%0A*Cores escolhidas:*%0A`;
      message += `Fita: ${selectedRibbon ? selectedRibbon.name : 'Não selecionada'}%0A`;
      message += `Embalagem: ${selectedPackage ? selectedPackage.name : 'Não selecionada'}%0A%0A`;
      
      // Add additionals if any
      const selectedAdditionals = additionalSelections.filter(a => a.selected);
      if (selectedAdditionals.length > 0) {
        message += `*Adicionais:*%0A`;
        selectedAdditionals.forEach(selection => {
          const additional = additionals.find(a => a.id === selection.id);
          if (additional) {
            message += `- ${additional.name}: R$ ${additional.price.toFixed(2)}%0A`;
          }
        });
        message += `%0A`;
      }
    } else {
      message += `*Sabores de bolo gelado escolhidos:*%0A`;
      boloGeladoSelections.forEach(selection => {
        const flavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
        if (flavor && selection.quantity && selection.quantity > 0) {
          message += `- ${flavor.name}: ${selection.quantity} unidades%0A`;
        }
      });
      message += `%0A`;
    }
    
    // Add observations if any
    if (formData.observations) {
      message += `*Observações:*%0A${formData.observations.replace(/\n/g, '%0A')}%0A%0A`;
    }
    
    return message;
  };

  return { createWhatsAppMessage };
};
