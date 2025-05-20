
import React from 'react';
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "lucide-react";
import { useProductsStore } from '@/data/store';

interface MiniVisualizerProps {
  onExpandClick: () => void;
}

const MiniVisualizer: React.FC<MiniVisualizerProps> = ({ onExpandClick }) => {
  return (
    <div className="w-full py-4 border-t border-b border-gray-100 my-6">
      <Button 
        variant="outline" 
        onClick={onExpandClick} 
        className="w-full flex items-center justify-center gap-2 py-2 rounded-full"
      >
        <ColorSwatch className="h-4 w-4" />
        Teste as cores do seu bem-casado
      </Button>
    </div>
  );
};

export default MiniVisualizer;
