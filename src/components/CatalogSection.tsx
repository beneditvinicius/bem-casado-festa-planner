
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
    <section className="section-container bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Já viu nossos catálogos?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {catalogoBemCasadosLink && (
            <Button 
              onClick={handleBemCasadosClick}
              className="bg-[#eb6824] hover:bg-[#d25618] text-white px-6 py-3 rounded-full text-base"
            >
              Bem-Casados
            </Button>
          )}
          
          {catalogoBolosGeladosLink && (
            <Button 
              onClick={handleBolosGeladosClick}
              className="bg-[#eb6824] hover:bg-[#d25618] text-white px-6 py-3 rounded-full text-base"
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
