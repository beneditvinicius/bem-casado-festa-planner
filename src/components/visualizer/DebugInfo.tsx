
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

const DebugInfo: React.FC<DebugInfoProps> = ({
  ribbonId,
  ribbonCode,
  packageId,
  packageCode,
  ribbonImagePath,
  ribbonImageExists,
  packageImagePath,
  packageImageExists,
  fallbackCombinationImage
}) => {
  return (
    <div className="mt-3 bg-gray-100 p-3 rounded-md text-xs text-gray-700">
      <p>Debug info:</p>
      <ul className="list-disc pl-5">
        <li>Ribbon ID: {ribbonId} / Code: {ribbonCode || 'N/A'}</li>
        <li>Package ID: {packageId} / Code: {packageCode || 'N/A'}</li>
        <li>Ribbon image: {ribbonImagePath} ({ribbonImageExists ? 'Found' : 'Not found'})</li>
        <li>Package image: {packageImagePath} ({packageImageExists ? 'Found' : 'Not found'})</li>
        <li>Fallback image: {fallbackCombinationImage ? fallbackCombinationImage : 'None available'}</li>
      </ul>
    </div>
  );
};

export default DebugInfo;
