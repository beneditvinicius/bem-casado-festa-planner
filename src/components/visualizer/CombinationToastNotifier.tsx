
import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface CombinationToastNotifierProps {
  ribbonCode?: string;
  packageCode?: string;
  ribbonName?: string;
  packageName?: string;
}

const CombinationToastNotifier: React.FC<CombinationToastNotifierProps> = ({
  ribbonCode,
  packageCode,
  ribbonName,
  packageName
}) => {
  // State to track when combination changes
  const [lastCombination, setLastCombination] = useState<string>('');
  
  useEffect(() => {
    // Generate combination key
    const combinationKey = `${ribbonCode || ''}-${packageCode || ''}`;
    
    // Show toast for new combination
    if (combinationKey !== lastCombination && lastCombination !== '' && ribbonName && packageName) {
      toast({
        title: "Combinação atualizada",
        description: `${ribbonName} + ${packageName}`,
        duration: 2000,
      });
    }
    
    // Update last combination
    setLastCombination(combinationKey);
  }, [ribbonCode, packageCode, ribbonName, packageName, lastCombination]);
  
  // This is a utility component that doesn't render anything visible
  return null;
};

export default CombinationToastNotifier;
