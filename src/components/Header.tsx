
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-bem">
            Bem-Casados
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
