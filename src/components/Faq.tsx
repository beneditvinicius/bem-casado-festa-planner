
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Qual o pedido mínimo?",
    answer: "Nosso pedido mínimo é de 20 unidades de bem-casados."
  },
  {
    question: "Vocês fazem entrega?",
    answer: "Sim! Trabalhamos com entregas em Sinop e região. Consulte a taxa conforme o local do evento ou retirada."
  },
  {
    question: "Posso escolher mais de um sabor?",
    answer: "Claro! Você pode selecionar os sabores que quiser dentro da sua quantidade total. O ideal é informar isso com antecedência para que possamos organizar o preparo."
  },
  {
    question: "Quanto tempo antes do meu evento preciso fazer o pedido?",
    answer: "Recomendamos fechar com mínimo de 30 dias de antecedência, especialmente para datas de alta demanda como dezembro, maio e setembro."
  },
  {
    question: "Posso fazer um pedido de última hora?",
    answer: "Dependendo da data, conseguimos sim! Consulte a disponibilidade com a gente pelo WhatsApp."
  },
  {
    question: "Qual a validade dos bem-casados?",
    answer: "Nossa validade padrão é de 10 dias em temperatura ambiente e 15 dias refrigerados. Sempre orientamos o melhor modo de conservação no momento da entrega."
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
    answer: "Você pode pagar com Pix, transferência bancária ou até mesmo cartão.\n\nPara garantir a produção do seu pedido, solicitamos um sinal de 20% no ato da assinatura do contrato.\nO valor restante deverá ser quitado até 3 dias antes da retirada ou envio dos bem-casados.\n\nEm caso de pagamento parcelado, o parcelamento é feito em até 2x sem juros, desde que o contrato seja assinado com antecedência suficiente para programarmos sua produção com tranquilidade."
  }
];

const Faq: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-base whitespace-pre-line">
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
