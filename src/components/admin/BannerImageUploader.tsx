
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image, X } from "lucide-react";

interface BannerImageUploaderProps {
  imageUrl: string;
  onChange: (newUrl: string) => void;
}

const BannerImageUploader: React.FC<BannerImageUploaderProps> = ({ imageUrl, onChange }) => {
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert file to data URL
        const result = reader.result as string;
        onChange(result);
        toast({
          title: "Imagem do banner atualizada",
        });
      };
      reader.readAsDataURL(file);
    }
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

      <div className="flex justify-center">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50">
            <Image className="mr-2 h-4 w-4" />
            {imageUrl ? "Alterar imagem do banner" : "Adicionar imagem do banner"}
          </div>
        </label>
      </div>
    </div>
  );
};

export default BannerImageUploader;
