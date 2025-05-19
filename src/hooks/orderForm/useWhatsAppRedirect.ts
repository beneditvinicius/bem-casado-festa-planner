
export const useWhatsAppRedirect = () => {
  const redirectToWhatsApp = (whatsappUrl: string) => {
    window.open(whatsappUrl, '_blank');
  };
  
  return { redirectToWhatsApp };
};
