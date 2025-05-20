
import React from 'react';
import { Heart, Calendar, Gift, MapPin, Cake, Star, User, Ring } from "lucide-react";

const AnimatedWeddingDivider = () => {
  // Collection of wedding-themed icons
  const icons = [
    { icon: Heart, label: 'Coração' },
    { icon: Gift, label: 'Presente' },
    { icon: Calendar, label: 'Calendário' },
    { icon: Cake, label: 'Bolo' },
    { icon: Star, label: 'Estrela' },
    { icon: MapPin, label: 'Localização' },
    { icon: Heart, label: 'Coração' },
    { icon: Gift, label: 'Presente' },
    { icon: Calendar, label: 'Calendário' },
    { icon: Cake, label: 'Bolo' },
    { icon: Star, label: 'Estrela' },
    { icon: MapPin, label: 'Localização' },
  ];
  
  return (
    <div className="py-8 overflow-hidden relative">
      <div className="flex animate-marquee">
        {icons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="mx-6">
              <IconComponent 
                className="text-[#eb6824]" 
                strokeWidth={1.5} 
                size={24} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedWeddingDivider;
