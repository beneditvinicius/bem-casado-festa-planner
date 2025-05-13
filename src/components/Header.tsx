import React from 'react';
const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <img src="/lovable-uploads/f59e834a-effd-4659-a7d2-ac466e9aa740.png" alt="La Badiane Bem Casados" className="h-16 mb-4" />
        
        <nav className="flex space-x-6">
          <button onClick={() => scrollToSection('calculator')} className="text-gray-600 hover:text-[#eb6824] transition-colors">
            Calculadora
          </button>
          <button onClick={() => scrollToSection('order')} className="text-gray-600 hover:text-[#eb6824] transition-colors">
            Orçamento
          </button>
          <button onClick={() => scrollToSection('visualizer')} className="text-gray-600 hover:text-[#eb6824] transition-colors">
            Visualizador
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-[#eb6824] transition-colors">
            Dúvidas
          </button>
        </nav>
      </div>
    </header>;
};
export default Header;