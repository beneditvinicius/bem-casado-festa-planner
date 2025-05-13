
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator';
import OrderForm from '@/components/OrderForm';
import Visualizer from '@/components/Visualizer';
import Faq from '@/components/Faq';
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const ADMIN_PASSWORD = "libertines12";
  
  const handleAdminAccess = () => {
    setShowPasswordPrompt(true);
  };
  
  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setShowPasswordPrompt(false);
      setPassword('');
      window.location.href = '/painel-controle';
    } else {
      toast({
        title: "Senha incorreta",
        variant: "destructive"
      });
    }
  };
  
  const sections = [
    {
      id: 'calculator',
      title: 'Calculadora de Bem-Casados',
      component: <Calculator />
    }, 
    {
      id: 'order',
      title: 'Faça seu orçamento detalhado',
      component: <OrderForm />,
      bg: 'bg-[#fef2e6]'
    }, 
    {
      id: 'visualizer',
      title: 'Visualize seu Bem-Casado',
      component: <Visualizer />
    }, 
    {
      id: 'faq',
      title: 'Dúvidas Frequentes',
      component: <Faq />,
      bg: 'bg-[#fef2e6]'
    }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pb-16">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className={`section-container ${section.bg || 'bg-white'}`}>
            <h2 className="section-title">{section.title}</h2>
            {section.component}
            {index < sections.length - 1 && <div className="section-divider" />}
          </section>
        ))}
      </main>
      
      <footer className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} La Badiane Bem Casados. Todos os direitos reservados.
            </p>
            <Button variant="ghost" size="sm" className="text-gray-600" onClick={handleAdminAccess}>
              <Lock className="h-4 w-4 mr-2" />
              Painel de Controle
            </Button>
          </div>
        </div>
      </footer>
      
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Área Restrita</h3>
            <p className="mb-4">Digite a senha para acessar o painel de controle.</p>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-2 border rounded mb-4" 
              placeholder="Digite a senha" 
              onKeyDown={e => { if (e.key === 'Enter') handlePasswordSubmit(); }} 
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPasswordPrompt(false)}>
                Cancelar
              </Button>
              <Button onClick={handlePasswordSubmit}>
                Entrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
