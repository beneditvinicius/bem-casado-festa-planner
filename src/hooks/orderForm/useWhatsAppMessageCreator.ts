
import { FormData, FlavorSelection, AdditionalSelection } from './types';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/types';

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
  ) => {
    const { name, cpf, phone, eventDate, cep, street, number, complement, neighborhood, city, state, ribbonId, packageId, observations } = formData;
    
    // Get ribbon and package info
    const ribbonColor = ribbonColors.find(r => r.id === ribbonId);
    const packageColor = packageColors.find(p => p.id === packageId);
    
    // Build message sections
    const customerInfo = `*NOVO PEDIDO*\n\n*Dados do Cliente*\nNome: ${name}\nCPF: ${cpf}\nTelefone: ${phone}\nData do Evento: ${eventDate ? eventDate.toLocaleDateString() : 'Não informada'}\n\n`;
    
    const addressInfo = `*Endereço de Entrega*\nCEP: ${cep}\nRua: ${street}\nNúmero: ${number}\nComplemento: ${complement || 'Não informado'}\nBairro: ${neighborhood}\nCidade: ${city}\nEstado: ${state}\n\n`;
    
    let productInfo = `*Pedido*\n`;
    
    const bemCasadoSelections = flavorSelections.filter(selection => 
      selection.productType === 'bem-casado' && selection.quantity && selection.quantity > 0
    );
    
    const boloGeladoSelections = flavorSelections.filter(selection => 
      selection.productType === 'bolo-gelado' && selection.quantity && selection.quantity > 0
    );
    
    // Only include bem-casado section if there are bem-casado selections
    if (bemCasadoSelections.length > 0) {
      const totalBemCasadoQuantity = bemCasadoSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      productInfo += `\n*Bem-Casados*\nQuantidade Total: ${totalBemCasadoQuantity}\n\n*Sabores Selecionados*\n`;
      
      bemCasadoSelections.forEach(selection => {
        if (selection.quantity && selection.quantity > 0) {
          const flavor = flavors.find(f => f.id === selection.flavorId);
          if (flavor) {
            productInfo += `- ${flavor.name}: ${selection.quantity} unidade(s)\n`;
          }
        }
      });
      
      if (ribbonColor) {
        productInfo += `\n*Fita Selecionada*\n- ${ribbonColor.name}\n`;
      }
      
      if (packageColor) {
        productInfo += `\n*Embalagem Selecionada*\n- ${packageColor.name}\n`;
      }
      
      // Add additionals if any
      const selectedAdditionals = additionalSelections.filter(a => a.selected);
      if (selectedAdditionals.length > 0) {
        productInfo += `\n*Adicionais Selecionados*\n`;
        selectedAdditionals.forEach(additional => {
          const additionalInfo = additionals.find(a => a.id === additional.id);
          if (additionalInfo) {
            productInfo += `- ${additionalInfo.name}\n`;
          }
        });
      }
    }
    
    // Only include bolo gelado section if there are bolo gelado selections
    if (boloGeladoSelections.length > 0) {
      const totalBoloGeladoQuantity = boloGeladoSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      productInfo += `\n*Bolos Gelados*\nQuantidade Total: ${totalBoloGeladoQuantity}\n\n*Sabores Selecionados*\n`;
      
      boloGeladoSelections.forEach(selection => {
        if (selection.quantity && selection.quantity > 0) {
          const flavor = boloGeladoFlavors.find(f => f.id === selection.flavorId);
          if (flavor) {
            productInfo += `- ${flavor.name}: ${selection.quantity} unidade(s)\n`;
          }
        }
      });
    }
    
    const observationsSection = observations 
      ? `\n*Observações*\n${observations}\n` 
      : '';
    
    // Combine all sections
    const message = `${customerInfo}${addressInfo}${productInfo}${observationsSection}`;
    
    // Encode the message for WhatsApp URL
    return encodeURIComponent(message);
  };
  
  return { createWhatsAppMessage };
};
