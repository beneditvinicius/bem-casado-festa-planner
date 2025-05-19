
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
    const { name, cpf, phone, eventDate, cep, street, number, complement, neighborhood, city, state, productType, ribbonId, packageId, observations } = formData;
    
    // Get ribbon and package info if product type is bem-casado
    const ribbonColor = ribbonColors.find(r => r.id === ribbonId);
    const packageColor = packageColors.find(p => p.id === packageId);
    
    // Build message sections
    const customerInfo = `*NOVO PEDIDO*\n\n*Dados do Cliente*\nNome: ${name}\nCPF: ${cpf}\nTelefone: ${phone}\nData do Evento: ${eventDate ? eventDate.toLocaleDateString() : 'Não informada'}\n\n`;
    
    const addressInfo = `*Endereço de Entrega*\nCEP: ${cep}\nRua: ${street}\nNúmero: ${number}\nComplemento: ${complement || 'Não informado'}\nBairro: ${neighborhood}\nCidade: ${city}\nEstado: ${state}\n\n`;
    
    // Build product info based on product type
    let productInfo = '';
    
    if (productType === 'bem-casado') {
      const totalQuantity = flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      productInfo = `*Pedido - Bem Casado*\nQuantidade Total: ${totalQuantity}\n\n*Sabores Selecionados*\n`;
      
      flavorSelections.forEach(selection => {
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
    } else {
      const totalQuantity = boloGeladoSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      productInfo = `*Pedido - Bolo Gelado*\nQuantidade Total: ${totalQuantity}\n\n*Sabores Selecionados*\n`;
      
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
