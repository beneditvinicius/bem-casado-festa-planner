
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <img 
          src="/lovable-uploads/f59e834a-effd-4659-a7d2-ac466e9aa740.png" 
          alt="La Badiane Bem Casados" 
          className="h-[60px] sm:h-[70px] mb-4 sm:mb-5" 
        />
        
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button 
            onClick={() => scrollToSection('calculator')} 
            className="text-center text-gray-600 hover:text-[#eb6824] bg-[#FED7C3] hover:bg-[#f8c3a7] px-4 py-2 rounded-full transition-colors"
          >
            Calculadora
          </button>
          <button 
            onClick={() => scrollToSection('orcamento')} 
            className="text-center text-gray-600 hover:text-[#eb6824] bg-[#FED7C3] hover:bg-[#f8c3a7] px-4 py-2 rounded-full transition-colors"
          >
            Orçamento
          </button>
          <button 
            onClick={() => scrollToSection('visualizer')} 
            className="text-center text-gray-600 hover:text-[#eb6824] bg-[#FED7C3] hover:bg-[#f8c3a7] px-4 py-2 rounded-full transition-colors"
          >
            Visualizador
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="text-center text-gray-600 hover:text-[#eb6824] bg-[#FED7C3] hover:bg-[#f8c3a7] px-4 py-2 rounded-full transition-colors"
          >
            Dúvidas
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
