
import React from 'react';
import { Info } from "lucide-react";

interface SimpleRepresentationProps {
  packageColor?: string;
  ribbonColor?: string;
}

const SimpleRepresentation: React.FC<SimpleRepresentationProps> = ({
  packageColor,
  ribbonColor
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="w-48 sm:w-56 h-28 sm:h-32 mx-auto relative bg-white rounded shadow-md border">
        {/* Representação visual simples quando não há imagem */}
        <div 
          className="absolute inset-0 m-4 border" 
          style={{
            backgroundColor: packageColor || '#FFFFFF'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1.5" 
          style={{
            backgroundColor: ribbonColor || '#000000'
          }}
        ></div>
      </div>
      <div className="flex items-start mt-4 justify-center">
        <Info className="h-5 w-5 text-amber-800 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-left text-sm text-amber-800">
          Esta combinação de cores não possui uma imagem disponível no momento.<br />
          Acesse o painel administrativo para adicionar mais imagens de combinações.
        </p>
      </div>
    </div>
  );
};

export default SimpleRepresentation;
