
import React from 'react';

interface CombinationToastNotifierProps {
  ribbonCode?: string;
  packageCode?: string;
  ribbonName?: string;
  packageName?: string;
}

// We're completely removing the notification functionality as requested
const CombinationToastNotifier: React.FC<CombinationToastNotifierProps> = () => {
  // This component doesn't do anything anymore, as requested
  return null;
};

export default CombinationToastNotifier;
