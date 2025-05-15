
import React from 'react';
import { useConfigStore } from '@/data/products';

const Banner: React.FC = () => {
  const { bannerUrl, bannerText } = useConfigStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 relative rounded-3xl overflow-hidden">
      {bannerUrl ? (
        <div className="relative w-full h-48 sm:h-64 md:h-80">
          <img 
            src={bannerUrl} 
            alt={bannerText || "La Badiane Bem-Casados"} 
            className="w-full h-full object-cover rounded-3xl"
          />
          {bannerText && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold px-4 py-2 text-center">
                {bannerText}
              </h2>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-48 sm:h-64 md:h-80 bg-[#fef2e6] flex items-center justify-center rounded-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#eb6824] font-semibold px-4 py-2 text-center">
            {bannerText || "La Badiane Bem-Casados"}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Banner;
