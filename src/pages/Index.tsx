
import React, { useState } from 'react';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator';
import OrderForm from '@/components/OrderForm';
import Visualizer from '@/components/Visualizer';
import Faq from '@/components/Faq';
import AdminPanel from '@/components/AdminPanel';
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const { toast } = useToast();
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const ADMIN_PASSWORD = "libertines12";
  
  const handleAdminToggle = () => {
    if (adminMode) {
      setAdminMode(false);
      toast({
        title: "Modo administrador desativado"
      });
    } else {
      setShowPasswordPrompt(true);
    }
  };
  
  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setAdminMode(true);
      setShowPasswordPrompt(false);
      setPassword('');
      toast({
        title: "Modo administrador ativado"
      });
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
      component: <Calculator />,
      description: ''
    },
    {
      id: 'order',
      title: 'Faça seu Orçamento Detalhado',
      component: <OrderForm />,
      description: ''
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
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            <section id={section.id} className="section-container">
              <div className="bg-white rounded-3xl shadow-md p-6 mb-6 text-center">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">{section.title}</h2>
                {section.description && <p className="mb-4 text-center">{section.description}</p>}
                {section.component}
              </div>
            </section>
          </React.Fragment>
        ))}
        
        {adminMode && (
          <section id="admin" className="section-container">
            <div className="bg-white rounded-3xl shadow-md p-6 mb-6 text-center">
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-[#d25618] rounded-full" 
              onClick={handleAdminToggle}
            >
              {adminMode ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
              {adminMode ? 'Sair do Modo Admin' : 'Área Admin'}
            </Button>
          </div>
        </div>
      </footer>
      
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
            <h3 className="text-xl font-bold mb-4">Área Restrita</h3>
            <p className="mb-4">Digite a senha para acessar o painel de administração.</p>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-2 border rounded-full text-center mb-4" 
              placeholder="Digite a senha" 
              onKeyDown={e => {
                if (e.key === 'Enter') handlePasswordSubmit();
              }}
            />
            <div className="flex justify-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPasswordPrompt(false)}
                className="rounded-full"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handlePasswordSubmit}
                className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
              >
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
