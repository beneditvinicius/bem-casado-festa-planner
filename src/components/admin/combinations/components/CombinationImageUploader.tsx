
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface CombinationImageUploaderProps {
  previewImage: string | null;
  imageUrl: string;
  setPreviewImage: (image: string | null) => void;
  setImageUrl: (url: string) => void;
}

const CombinationImageUploader: React.FC<CombinationImageUploaderProps> = ({
  previewImage,
  imageUrl,
  setPreviewImage,
  setImageUrl
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Imagem da Combinação (Opcional)</Label>
      <div className="flex flex-col space-y-2">
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <Label 
          htmlFor="image-upload" 
          className="flex items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Clique para selecionar uma imagem</span>
          </div>
        </Label>
        {previewImage && (
          <div className="relative h-32 w-full rounded-md overflow-hidden">
            <img 
              src={previewImage} 
              alt="Prévia" 
              className="h-full w-full object-contain" 
            />
            <Button 
              size="sm" 
              variant="destructive" 
              className="absolute top-1 right-1"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Ou forneça uma URL de imagem:
      </p>
      <Input 
        type="text" 
        placeholder="https://exemplo.com/imagem.jpg" 
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </div>
  );
};

export default CombinationImageUploader;
