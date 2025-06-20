
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseSupabaseImagesResult {
  ribbonUrl: string | null;
  packageUrl: string | null;
  loading: boolean;
}

export const useSupabaseImages = (ribbonCode?: string, packageCode?: string): UseSupabaseImagesResult => {
  const [ribbonUrl, setRibbonUrl] = useState<string | null>(null);
  const [packageUrl, setPackageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      if (!ribbonCode && !packageCode) {
        setRibbonUrl(null);
        setPackageUrl(null);
        return;
      }

      setLoading(true);

      try {
        // Load ribbon image
        if (ribbonCode) {
          const { data: ribbonData } = supabase
            .storage
            .from('ribbons')
            .getPublicUrl(`fita_${ribbonCode.toLowerCase()}.png`);
          
          // Verify image exists by trying to load it
          const ribbonExists = await checkImageExists(ribbonData.publicUrl);
          setRibbonUrl(ribbonExists ? ribbonData.publicUrl : null);
        } else {
          setRibbonUrl(null);
        }

        // Load package image
        if (packageCode) {
          const { data: packageData } = supabase
            .storage
            .from('packages')
            .getPublicUrl(`embalagem_${packageCode.toLowerCase()}.png`);
          
          // Verify image exists by trying to load it
          const packageExists = await checkImageExists(packageData.publicUrl);
          setPackageUrl(packageExists ? packageData.publicUrl : null);
        } else {
          setPackageUrl(null);
        }
      } catch (error) {
        console.error('Error loading images from Supabase:', error);
        setRibbonUrl(null);
        setPackageUrl(null);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [ribbonCode, packageCode]);

  return { ribbonUrl, packageUrl, loading };
};

// Helper function to check if image exists
const checkImageExists = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
