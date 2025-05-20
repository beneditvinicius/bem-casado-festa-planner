
import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Gift, MapPin, Cake, Star } from "lucide-react";

const AnimatedWeddingDivider = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  // Collection of wedding-themed icons
  const icons = [
    { Icon: Heart, label: 'Coração' },
    { Icon: Gift, label: 'Presente' },
    { Icon: Calendar, label: 'Calendário' },
    { Icon: Cake, label: 'Bolo' },
    { Icon: Star, label: 'Estrela' },
    { Icon: MapPin, label: 'Localização' },
  ];
  
  // Change icon every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const CurrentIcon = icons[currentIconIndex].Icon;
  
  return (
    <div className="py-8 flex justify-center relative">
      <div className="relative">
        <CurrentIcon 
          className="text-[#eb6824] animate-pulse" 
          strokeWidth={1.5} 
          size={36} 
        />
      </div>
    </div>
  );
};

export default AnimatedWeddingDivider;
