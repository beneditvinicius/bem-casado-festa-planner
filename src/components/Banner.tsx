
import React from 'react';
import { useConfigStore } from '@/data/products';

const Banner: React.FC = () => {
  const { bannerText } = useConfigStore();
  
  if (!bannerText) return null;
  
  return (
    <div className="bg-[#fef2e6] p-2 text-center">
      <p className="text-sm text-[#eb6824]">
        {bannerText}
      </p>
    </div>
  );
};

export default Banner;
