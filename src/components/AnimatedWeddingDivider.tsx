
import React from 'react';
import { Ring, Heart, Gift, CalendarHeart, Stars, Cake } from "lucide-react";

const AnimatedWeddingDivider = () => {
  const icons = [Ring, Heart, Gift, CalendarHeart, Stars, Cake];
  
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
