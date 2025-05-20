
import React from 'react';
import { Heart } from "lucide-react";

const AnimatedWeddingDivider = () => {
  return (
    <div className="py-8 flex justify-center relative">
      <div className="relative">
        <Heart 
          className="text-[#eb6824] animate-pulse" 
          strokeWidth={1.5} 
          size={36} 
        />
      </div>
    </div>
  );
};

export default AnimatedWeddingDivider;
