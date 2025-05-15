
import React from 'react';

interface DebugInfoProps {
  ribbonId: string;
  ribbonCode?: string;
  packageId: string;
  packageCode?: string;
  ribbonImagePath: string;
  ribbonImageExists: boolean;
  packageImagePath: string;
  packageImageExists: boolean;
  fallbackCombinationImage: string;
}

// This component will now return nothing, effectively removing the debug info
const DebugInfo: React.FC<DebugInfoProps> = () => {
  // Return null to render nothing
  return null;
};

export default DebugInfo;
