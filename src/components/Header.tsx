
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConfigStore } from '@/data/products';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const { headerImageUrl } = useConfigStore();
  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down - any movement
        setCollapsed(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - any movement
        setCollapsed(false);
      }
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  // Use the uploaded image as a demo background
  const headerStyle = {
    backgroundImage: headerImageUrl 
      ? `url(${headerImageUrl})` 
      : `url('/lovable-uploads/89d3444b-7495-4381-81c8-40dccbfb6016.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Adicionando um pequeno offset para evitar que o conteúdo fique abaixo do header
      const offset = 20; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <header 
      className={`py-6 sm:py-8 fixed top-0 left-0 w-full z-50 header ${collapsed ? 'header--collapsed' : ''}`} 
      style={headerStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <img 
          src="/lovable-uploads/f59e834a-effd-4659-a7d2-ac466e9aa740.png" 
          alt="La Badiane Bem Casados" 
          className="h-[80px] sm:h-[100px] mb-6 sm:mb-8 filter brightness-0 invert" 
        />
        
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <button 
            onClick={() => scrollToSection('calculator')} 
            className="text-white hover:text-[#FED7C3] transition-colors px-1 sm:px-2"
          >
            Calculadora
          </button>
          <button 
            onClick={() => scrollToSection('order')} 
            className="text-white hover:text-[#FED7C3] transition-colors px-1 sm:px-2"
          >
            Orçamento
          </button>
          <button 
            onClick={() => scrollToSection('visualizer')} 
            className="text-white hover:text-[#FED7C3] transition-colors px-1 sm:px-2"
          >
            {isMobile ? 'Visualizador' : 'Teste de Bem Casado'}
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="text-white hover:text-[#FED7C3] transition-colors px-1 sm:px-2"
          >
            Dúvidas
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
