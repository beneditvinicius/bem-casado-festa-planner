
import React from 'react';

interface FallbackImageViewProps {
  imageUrl: string;
}

const FallbackImageView: React.FC<FallbackImageViewProps> = ({ imageUrl }) => {
  return (
    <img 
      src={imageUrl} 
      alt="Visualização da combinação" 
      className="w-full h-full object-contain" 
    />
  );
};

export default FallbackImageView;
