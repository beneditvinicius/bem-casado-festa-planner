
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConfigStore } from '@/data/products';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const { headerImageUrl } = useConfigStore();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  const backgroundStyle = {
    backgroundImage: headerImageUrl ? `url(${headerImageUrl})` : 'linear-gradient(to right, #eb6824, #d25618)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  return (
    <header className="sticky top-0 z-50 py-6 sm:py-8" style={backgroundStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <img 
          src="/lovable-uploads/f59e834a-effd-4659-a7d2-ac466e9aa740.png" 
          alt="La Badiane Bem Casados" 
          className="h-[80px] sm:h-[100px] mb-6 sm:mb-8 brightness-0 invert" // White logo effect
        />
        
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <button 
            onClick={() => scrollToSection('calculator')} 
            className="text-white hover:text-gray-200 transition-colors text-base sm:text-lg"
          >
            Calculadora
          </button>
          <button 
            onClick={() => scrollToSection('orcamento')} 
            className="text-white hover:text-gray-200 transition-colors text-base sm:text-lg"
          >
            Orçamento
          </button>
          <button 
            onClick={() => scrollToSection('visualizer')} 
            className="text-white hover:text-gray-200 transition-colors text-base sm:text-lg"
          >
            Teste de Bem Casado
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="text-white hover:text-gray-200 transition-colors text-base sm:text-lg"
          >
            Dúvidas
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
