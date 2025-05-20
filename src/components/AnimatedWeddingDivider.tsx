
import React from 'react';
import { CircleDashed, Heart, Gift, Calendar, Star, CircleDot } from "lucide-react";

const AnimatedWeddingDivider = () => {
  const icons = [CircleDashed, Heart, Gift, Calendar, Star, CircleDot];
  
  return (
    <div className="py-8 flex justify-center overflow-hidden">
      <div className="flex animate-slideIcons">
        {icons.map((Icon, index) => (
          <Icon 
            key={index} 
            className="mx-4 text-[#eb6824] animate-pulse" 
            strokeWidth={1.5} 
            size={24} 
          />
        ))}
        {/* Duplicate icons for seamless looping */}
        {icons.map((Icon, index) => (
          <Icon 
            key={`dup-${index}`} 
            className="mx-4 text-[#eb6824] animate-pulse" 
            strokeWidth={1.5} 
            size={24} 
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedWeddingDivider;
