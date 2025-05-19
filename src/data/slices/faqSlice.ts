
import { StateCreator } from 'zustand';
import { RootState } from '../store';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSlice {
  faqItems: FaqItem[];
  setFaqItems: (items: FaqItem[]) => void;
  updateFaqItem: (index: number, item: FaqItem) => void;
}

export const defaultFaqItems: FaqItem[] = [
  {
    question: "Qual o pedido mínimo?",
    answer: "Nosso pedido mínimo é de 20 unidades por sabor."
  },
  {
    question: "Vocês fazem entrega?",
    answer: "Sim! Trabalhamos com entregas em Sinop e região. Consulte a taxa conforme o local do evento ou retirada."
  },
  {
    question: "Posso escolher mais de um sabor?",
    answer: "Claro! Você pode selecionar os sabores que quiser dentro da sua quantidade total, respeitando o pedido mínimo de 20 unidades por sabor."
  },
  {
    question: "Quanto tempo antes do meu evento preciso fazer o pedido?",
    answer: "Recomendamos fechar com mínimo de 30 dias de antecedência, especialmente para datas de alta demanda como dezembro, maio e setembro."
  },
  {
    question: "Posso fazer um pedido de última hora?",
    answer: "Dependendo da data, conseguimos sim! Pedimos pelo menos 7 dias de antecedência mediante nossa disponibilidade de agenda, mas se tivermos disponibilidade será um prazer te atender! Consulte a disponibilidade com a gente pelo WhatsApp."
  },
  {
    question: "Qual a validade dos bem-casados?",
    answer: "Cada sabor tem uma validade diferente, mas todos eles podem ser refrigerados por até 15 dias. Sempre orientamos o melhor modo de conservação no momento da entrega."
  },
  {
    question: "Vocês parcelam?",
    answer: "Sim! Parcelamos em até 2x sem juros. Para isso, é necessário pagar 20% na assinatura do contrato e o restante até 3 dias antes da retirada ou entrega."
  },
  {
    question: "Posso retirar meu pedido pessoalmente?",
    answer: "Sim, claro! Estamos localizados em Sinop. Após agendamento, você pode retirar no horário combinado."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Você pode pagar com Pix, dinheiro, transferência bancária ou até mesmo cartão.\n\nPara garantir a produção do seu pedido, solicitamos um sinal de 20% no ato da encomenda.\nO valor restante deverá ser quitado até 3 dias antes da retirada ou envio dos bem-casados.\n\nEm caso de pagamento parcelado, o parcelamento é feito em até 2x sem juros no cartão."
  }
];

export const createFaqSlice: StateCreator<
  RootState,
  [],
  [],
  FaqSlice
> = (set) => ({
  faqItems: defaultFaqItems,
  
  setFaqItems: (items) => set({ faqItems: items }),
  
  updateFaqItem: (index, item) => set((state) => ({
    faqItems: state.faqItems.map((faq, i) => 
      i === index ? item : faq
    )
  })),
});
