
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useProductsStore } from '@/data/store';

const defaultFaqItems = [
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

const Faq: React.FC = () => {
  const { faqItems } = useProductsStore();
  
  // Use store faqItems if available, otherwise use default
  const displayItems = faqItems && faqItems.length > 0 ? faqItems : defaultFaqItems;
  
  return (
    <Card className="w-full bg-white">
      <CardContent className="pt-6 px-3 sm:px-6">
        <Accordion type="single" collapsible className="w-full">
          {displayItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-base sm:text-lg font-medium py-3 sm:py-4 text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base whitespace-pre-line pb-3 sm:pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Faq;
