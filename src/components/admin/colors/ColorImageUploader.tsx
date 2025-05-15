
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ColorImageUploaderProps {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
  colorType: 'ribbon' | 'package';
}

const ColorImageUploader: React.FC<ColorImageUploaderProps> = ({
  imageUrl,
  onChange,
  colorType
}) => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(imageUrl);

  React.useEffect(() => {
    setPreviewImage(imageUrl);
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewImage(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url || null);
  };
  
  const handleRemoveImage = () => {
    setPreviewImage(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
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
          className="flex items-center justify-center p-4 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Clique para selecionar uma imagem</span>
          </div>
        </Label>
        {previewImage && (
          <div className="relative h-32 w-full rounded-2xl overflow-hidden">
            <img 
              src={previewImage} 
              alt={`Prévia de ${colorType}`} 
              className="h-full w-full object-contain" 
            />
            <Button 
              size="sm" 
              variant="destructive" 
              className="absolute top-1 right-1 rounded-full"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 text-center">
        Ou forneça uma URL de imagem:
      </p>
      <Input 
        type="text" 
        placeholder="https://exemplo.com/imagem.jpg" 
        value={imageUrl || ''}
        onChange={handleUrlChange}
        className="rounded-full text-center"
      />
    </div>
  );
};

export default ColorImageUploader;
