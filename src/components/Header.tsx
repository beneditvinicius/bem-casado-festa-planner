
import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-bem">
            La Badiane Bem Casados
          </h1>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection('calculator')}
              className="text-gray-600 hover:text-bem transition-colors"
            >
              Calculadora
            </button>
            <button 
              onClick={() => scrollToSection('order')}
              className="text-gray-600 hover:text-bem transition-colors"
            >
              Orçamento
            </button>
            <button 
              onClick={() => scrollToSection('visualizer')}
              className="text-gray-600 hover:text-bem transition-colors"
            >
              Visualizador
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
