
import React from 'react';
import { useProductsStore } from '@/data/products';
import { Button } from './ui/button';
import { Cake, Gift } from 'lucide-react';

const CatalogsSection: React.FC = () => {
  const catalogBemCasadosUrl = useProductsStore(state => state.catalogBemCasadosUrl);
  const catalogBolosGeladosUrl = useProductsStore(state => state.catalogBolosGeladosUrl);

  const handleOpenCatalog = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Don't render if both catalog URLs are empty
  if (!catalogBemCasadosUrl && !catalogBolosGeladosUrl) {
    return null;
  }

  return (
    <section className="section-container bg-white py-12">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Já viu nossos catálogos?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {catalogBemCasadosUrl && (
            <Button 
              onClick={() => handleOpenCatalog(catalogBemCasadosUrl)}
              className="rounded-full px-6 py-3 h-auto bg-[#eb6824] hover:bg-[#d25618] text-white w-full sm:w-auto"
            >
              <Gift className="mr-2 h-5 w-5" /> Bem-Casados
            </Button>
          )}
          
          {catalogBolosGeladosUrl && (
            <Button 
              onClick={() => handleOpenCatalog(catalogBolosGeladosUrl)}
              className="rounded-full px-6 py-3 h-auto bg-[#eb6824] hover:bg-[#d25618] text-white w-full sm:w-auto"
            >
              <Cake className="mr-2 h-5 w-5" /> Bolos Gelados
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogsSection;
