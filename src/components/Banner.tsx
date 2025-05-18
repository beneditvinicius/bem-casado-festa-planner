
import React from 'react';
import { useConfigStore } from '@/data/products';

const Banner: React.FC = () => {
  // Use headerImageUrl instead of bannerUrl since that's what's available in the store now
  const { headerImageUrl } = useConfigStore();
  
  if (!headerImageUrl) return null;
  
  return (
    <div className="bg-[#fef2e6] p-2 text-center">
      <p className="text-sm text-[#eb6824]">
        {headerImageUrl}
      </p>
    </div>
  );
};

export default Banner;
