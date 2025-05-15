
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Image, Save, X } from "lucide-react";

interface BannerImageUploaderProps {
  imageUrl: string;
  onChange: (newUrl: string) => void;
}

const BannerImageUploader: React.FC<BannerImageUploaderProps> = ({ imageUrl, onChange }) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState(imageUrl);
  const { toast } = useToast();

  const handleConfirmUrl = () => {
    onChange(tempUrl);
    setShowUrlInput(false);
    toast({
      title: "URL da imagem atualizada",
    });
  };

  const handleCancel = () => {
    setTempUrl(imageUrl);
    setShowUrlInput(false);
  };

  const handleRemove = () => {
    onChange("");
    toast({
      title: "Imagem removida",
    });
  };

  return (
    <div className="space-y-4">
      {imageUrl && (
        <div className="relative w-full h-40 border rounded-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt="Imagem do banner"
            className="w-full h-full object-cover"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 rounded-full opacity-90"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!showUrlInput ? (
        <Button 
          variant="outline" 
          className="w-full rounded-full"
          onClick={() => setShowUrlInput(true)}
        >
          <Image className="mr-2 h-4 w-4" />
          {imageUrl ? "Alterar imagem do banner" : "Adicionar imagem do banner"}
        </Button>
      ) : (
        <div className="space-y-2">
          <Input
            placeholder="Cole a URL da imagem aqui"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
          />
          <div className="flex gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full"
              onClick={handleCancel}
            >
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button 
              size="sm"
              className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
              onClick={handleConfirmUrl}
            >
              <Save className="mr-2 h-4 w-4" /> Salvar URL
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerImageUploader;
