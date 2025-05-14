
import React, { useState, useEffect } from 'react';

interface FallbackImageViewProps {
  imageUrl: string;
}

const FallbackImageView: React.FC<FallbackImageViewProps> = ({ imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when imageUrl changes
    setImageLoaded(false);
    setError(false);
  }, [imageUrl]);

  const handleImageLoad = () => {
    console.log("Imagem carregada com sucesso:", imageUrl);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.log("Erro ao carregar imagem:", imageUrl);
    setError(true);
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-white">
      {!imageLoaded && !error && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Carregando imagem...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-500">
          <p>Não foi possível carregar a imagem</p>
          <p className="text-xs mt-1">{imageUrl}</p>
        </div>
      )}
      
      <img 
        src={imageUrl} 
        alt="Visualização da combinação" 
        className={`max-w-full max-h-full object-contain ${imageLoaded ? 'block' : 'hidden'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default FallbackImageView;
