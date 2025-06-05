
import React from 'react';
import { Button } from "@/components/ui/button";
import { useProductsStore } from '@/data/products';

const CatalogSection: React.FC = () => {
  const catalogoBemCasadosLink = useProductsStore(state => state.catalogoBemCasadosLink);
  const catalogoBolosGeladosLink = useProductsStore(state => state.catalogoBolosGeladosLink);

  const handleBemCasadosClick = () => {
    if (catalogoBemCasadosLink) {
      window.open(catalogoBemCasadosLink, '_blank');
    }
  };

  const handleBolosGeladosClick = () => {
    if (catalogoBolosGeladosLink) {
      window.open(catalogoBolosGeladosLink, '_blank');
    }
  };

  // Only show the section if at least one link is configured
  if (!catalogoBemCasadosLink && !catalogoBolosGeladosLink) {
    return null;
  }

  return (
    <section className="section-container pt-8 sm:pt-20 mb-2 sm:mb-4">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Já viu nossos catálogos?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {catalogoBemCasadosLink && (
            <Button 
              onClick={handleBemCasadosClick}
              className="bg-[#eb6824] hover:bg-[#d25618] text-white px-4 py-2 rounded-full text-sm"
            >
              Bem-Casados
            </Button>
          )}
          
          {catalogoBolosGeladosLink && (
            <Button 
              onClick={handleBolosGeladosClick}
              className="bg-[#eb6824] hover:bg-[#d25618] text-white px-4 py-2 rounded-full text-sm"
            >
              Bolos Gelados
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
