
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OrderForm from '@/components/OrderForm';
import Visualizer from '@/components/Visualizer';
import Faq from '@/components/Faq';
import AdminPanel from '@/components/AdminPanel';
import CatalogSection from '@/components/CatalogSection';
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AnimatedWeddingDivider from '@/components/AnimatedWeddingDivider';

const Index: React.FC = () => {
  const { toast } = useToast();
  const [adminMode, setAdminMode] = useState(false);
  const { isAdmin, user } = useAdminAuth();
  
  const handleAdminToggle = () => {
    if (adminMode) {
      setAdminMode(false);
      toast({
        title: "Modo administrador desativado"
      });
    } else if (isAdmin) {
      setAdminMode(true);
      toast({
        title: "Modo administrador ativado"
      });
    } else {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar o painel administrativo.",
        variant: "destructive"
      });
    }
  };
  
  const sections = [
    {
      id: 'catalogos',
      title: null, 
      component: <CatalogSection />,
      description: null
    },
    {
      id: 'pedido',
      title: null, 
      component: <OrderForm />,
      description: null
    },
    {
      id: 'visualizer',
      title: 'Teste de Bem Casado',
      component: <Visualizer />,
      description: 'Veja como ficará a combinação de cores que você escolher.'
    },
    {
      id: 'faq',
      title: 'Dúvidas Frequentes',
      component: <Faq />,
      description: 'Encontre respostas para as perguntas mais comuns.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pb-12">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <section id={section.id} className="section-container">
              <div className="mb-6 text-center">
                {section.title && <h2 className="text-xl sm:text-2xl font-semibold mb-3">{section.title}</h2>}
                {section.description && <p className="mb-4 text-center">{section.description}</p>}
                {section.component}
              </div>
            </section>
            {/* Add divider between pedido and visualizer sections only */}
            {index === 1 && <AnimatedWeddingDivider />}
          </React.Fragment>
        ))}
        
        {adminMode && (
          <section id="admin" className="section-container">
            <div className="mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Administração</h2>
              <AdminPanel />
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-[#eb6824] py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} La Badiane Bem Casados. Todos os direitos reservados.
            </p>
            {user && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-[#d25618] rounded-full" 
                onClick={handleAdminToggle}
              >
                {adminMode ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                {adminMode ? 'Sair do Modo Admin' : 'Área Admin'}
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
