
import { FormData, FlavorSelection, AdditionalSelection } from './types';
import { Flavor, BoloGeladoFlavor, RibbonColor, PackageColor, Additional } from '@/data/products';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const createWhatsAppMessage = (
  formData: FormData, 
  flavorSelections: FlavorSelection[],
  boloGeladoSelections: FlavorSelection[],
  additionalSelections: AdditionalSelection[],
  flavors: Flavor[], 
  boloGeladoFlavors: BoloGeladoFlavor[],
  ribbonColors: RibbonColor[], 
  packageColors: PackageColor[],
  additionals: Additional[],
  whatsappNumber: string
): string => {
  // Novo título da mensagem
  const messageTitle = "*Aqui está meu pedido feito pelo site da La Badiane*\n\n";
  
  // Format personal information
  const personalInfo = `*DADOS PESSOAIS*\n${formData.name}\nCPF: ${formData.cpf}\nTelefone: ${formData.phone}`;
  
  // Format address
  const address = `*ENDEREÇO*\nCEP: ${formData.cep}\n${formData.street}, ${formData.number}${formData.complement ? `, ${formData.complement}` : ''}\n${formData.neighborhood} - ${formData.city}/${formData.state}`;
  
  // Format event information
  const eventDate = formData.eventDate ? format(formData.eventDate, 'dd/MM/yyyy', { locale: ptBR }) : 'Não informado';
  const eventInfo = `*EVENTO*\nTipo: ${formData.eventType}\nData: ${eventDate}\nLocal: ${formData.eventLocation || 'Não informado'}`;
  
  // Initialize order details based on product type
  let orderDetails = '';
  let total = 0;
  
  if (formData.productType === 'bem-casado') {
    // Format bem-casado order
    orderDetails = `*PEDIDO - BEM CASADO*`;
    
    // Calculate additionals price per unit
    const additionalsPricePerUnit = additionalSelections
      .filter(a => a.selected)
      .reduce((sum, a) => {
        const additional = additionals.find(add => add.id === a.id);
        return sum + (additional ? additional.price : 0);
      }, 0);
    
    // Format flavors
    const flavorsList = flavorSelections
      .filter(item => item.flavorId && item.quantity && item.quantity > 0)
      .map(item => {
        const flavor = flavors.find(f => f.id === item.flavorId);
        if (flavor) {
          const subtotal = (flavor.price + additionalsPricePerUnit) * item.quantity;
          total += subtotal;
          return `${flavor.name} - ${item.quantity} unids - R$ ${subtotal.toFixed(2)}`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
    
    // Format ribbon and package
    const ribbon = ribbonColors.find(r => r.id === formData.ribbonId);
    const packageColor = packageColors.find(p => p.id === formData.packageId);
    
    // Format additionals
    const additionalsList = additionals
      .filter(add => {
        const selection = additionalSelections.find(s => s.id === add.id);
        return selection && selection.selected;
      })
      .map(add => `${add.name} - + R$ ${add.price.toFixed(2)} por unid`)
      .join('\n');
    
    orderDetails = `*PEDIDO - BEM CASADO*\n\n*Sabores:*\n${flavorsList}\n\n*Fita:* ${ribbon?.name || 'Não selecionada'}\n*Embalagem:* ${packageColor?.name || 'Não selecionada'}`;
    
    if (additionalsList) {
      orderDetails += `\n\n*Adicionais:*\n${additionalsList}`;
    }
  } else {
    // Format bolo gelado order
    orderDetails = `*PEDIDO - BOLO GELADO*`;
    
    // Format flavors
    const flavorsList = boloGeladoSelections
      .filter(item => item.flavorId && item.quantity && item.quantity > 0)
      .map(item => {
        const flavor = boloGeladoFlavors.find(f => f.id === item.flavorId);
        if (flavor) {
          const subtotal = flavor.price * item.quantity;
          total += subtotal;
          return `${flavor.name} - ${item.quantity} unids - R$ ${subtotal.toFixed(2)}`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
    
    orderDetails = `*PEDIDO - BOLO GELADO*\n\n*Sabores:*\n${flavorsList}`;
  }
  
  // Add total
  orderDetails += `\n\n*TOTAL: R$ ${total.toFixed(2)}*`;
  
  // Add observations if any
  if (formData.observations) {
    orderDetails += `\n\n*Observações:*\n${formData.observations}`;
  }
  
  // Combine all information with the new title
  const message = [messageTitle, personalInfo, address, eventInfo, orderDetails].join('\n\n');
  
  // Create WhatsApp URL with the message
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
};
