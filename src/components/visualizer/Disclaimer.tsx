
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 p-3 sm:p-4 rounded-md border border-amber-200">
      <p className="text-sm text-amber-800">
        As cores exibidas na tela podem variar ligeiramente das cores reais dos produtos devido às configurações do seu dispositivo.
        Para uma visualização mais precisa, recomendamos solicitar amostras físicas.
      </p>
    </div>
  );
};

export default Disclaimer;
