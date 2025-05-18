
import { FormData, FlavorSelection } from './types';
import { Flavor, RibbonColor, PackageColor } from '@/data/products';

export const createWhatsAppMessage = (
  formData: FormData,
  flavorSelections: FlavorSelection[],
  flavors: Flavor[],
  ribbonColors: RibbonColor[],
  packageColors: PackageColor[],
  whatsappNumber: string
): string => {
  // Calculate total quantity
  const totalQuantity = flavorSelections.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  // Find selected items
  const selectedRibbon = ribbonColors.find(r => r.id === formData.ribbonId);
  const selectedPackage = packageColors.find(p => p.id === formData.packageId);
  
  // Build flavors details
  const flavorDetails = flavorSelections
    .filter(selection => selection.quantity > 0)
    .map(selection => {
      const flavor = flavors.find(f => f.id === selection.flavorId);
      return `- ${selection.quantity} unidades de ${flavor?.name || ''} (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(flavor?.price || 0)}/un)`;
    })
    .join('\n');
  
  // Calculate total price
  let totalPrice = 0;
  flavorSelections.forEach(selection => {
    const flavor = flavors.find(f => f.id === selection.flavorId);
    if (flavor && selection.quantity > 0) {
      totalPrice += flavor.price * selection.quantity;
    }
  });
  
  // Build WhatsApp message
  const message = `
🎉 Novo Pedido de Orçamento (Site) 🎉

Cliente: ${formData.name}
CPF: ${formData.cpf}
Telefone: ${formData.phone}

Detalhes do Evento:
Data: ${formData.eventDate ? new Intl.DateTimeFormat('pt-BR').format(formData.eventDate) : ''}
Local: ${formData.eventLocation}

Endereço de Entrega:
${formData.street}, ${formData.number}${formData.complement ? `, ${formData.complement}` : ''}
${formData.neighborhood}, ${formData.city} - ${formData.state}
CEP: ${formData.cep}

Pedido de Bem-Casados:
Quantidade Total: ${totalQuantity} unidades
${flavorDetails}

Cor da Fita: ${selectedRibbon?.name || ''}
Cor da Embalagem: ${selectedPackage?.name || ''}

Valor Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
${formData.observations ? `\nObservações: ${formData.observations}` : ''}

Aguardando contato para finalização.
  `.trim();

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};
