
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FormData } from './types';

interface UseCepSearchReturn {
  isLoadingCep: boolean;
  searchCep: () => Promise<void>;
}

export const useCepSearch = (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
): UseCepSearchReturn => {
  const { toast } = useToast();
  const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false);

  const searchCep = async () => {
    if (!formData.cep || formData.cep.replace(/\D/g, '').length < 8) {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido para buscar o endereço.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoadingCep(true);
      const cleanCep = formData.cep.replace(/\D/g, '');
      
      // Fix: Use HTTPS instead of HTTP for the ViaCEP API
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      if (!response.ok) {
        throw new Error('Falha na comunicação com o serviço de CEP');
      }
      
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive",
        });
        return;
      }

      // Update form data with address information
      setFormData({
        ...formData,
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
      });

      toast({
        title: "Endereço encontrado",
        description: "Os dados de endereço foram preenchidos automaticamente.",
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível buscar o endereço. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  return { isLoadingCep, searchCep };
};
