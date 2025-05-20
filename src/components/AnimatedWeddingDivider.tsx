
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
      <div className="flex items-center">
        <div className="h-[1px] bg-gray-200 w-20 sm:w-32"></div>
        <CurrentIcon 
          className="mx-6 text-[#eb6824] animate-pulse" 
          strokeWidth={1.5} 
          size={32} 
        />
        <div className="h-[1px] bg-gray-200 w-20 sm:w-32"></div>
      </div>
    </div>
  );
};

export default AnimatedWeddingDivider;
