
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
    if (!formData.cep || formData.cep.length < 8) {
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
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive",
        });
        return;
      }

      setFormData({
        ...formData,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      });

      toast({
        title: "Endereço encontrado",
        description: "Os dados de endereço foram preenchidos automaticamente.",
      });
    } catch (error) {
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
