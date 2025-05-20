
import React, { useState, useEffect } from 'react';
import { CircleDashed, Heart, Gift, Calendar, Star, CircleDot } from "lucide-react";

const AnimatedWeddingDivider = () => {
  const icons = [CircleDashed, Heart, Gift, Calendar, Star, CircleDot];
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
  
  const CurrentIcon = icons[currentIconIndex];
  
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
