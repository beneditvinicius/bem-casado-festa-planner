
import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Gift, MapPin, Cake, Star } from "lucide-react";

const AnimatedWeddingDivider = () => {
  // Collection of wedding-themed icons
  const icons = [
    { icon: Heart, label: 'Coração' },
    { icon: Gift, label: 'Presente' },
    { icon: Calendar, label: 'Calendário' },
    { icon: Cake, label: 'Bolo' },
    { icon: Star, label: 'Estrela' },
    { icon: MapPin, label: 'Localização' },
  ];
  
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  useEffect(() => {
    // Change icon every 3 seconds
    const interval = setInterval(() => {
      setCurrentIconIndex(current => {
        // Move to next icon or back to first
        return (current + 1) % icons.length;
      });
    }, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  const CurrentIcon = icons[currentIconIndex].icon;
  
  return (
    <div className="py-12 flex justify-center overflow-hidden">
      <CurrentIcon 
        className="text-[#eb6824] animate-pulse" 
        strokeWidth={1.5} 
        size={32} 
      />
    </div>
  );
};

export default AnimatedWeddingDivider;
