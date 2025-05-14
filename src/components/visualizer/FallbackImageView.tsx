
import React from 'react';

interface FallbackImageViewProps {
  imageUrl: string;
}

const FallbackImageView: React.FC<FallbackImageViewProps> = ({ imageUrl }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white">
      <img 
        src={imageUrl} 
        alt="Visualização da combinação" 
        className="max-w-full max-h-full object-contain" 
      />
    </div>
  );
};

export default FallbackImageView;
