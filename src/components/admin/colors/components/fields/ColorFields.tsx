
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorImageUploader from '../../ColorImageUploader';

interface ColorFieldsProps {
  code: string | undefined;
  color: string | undefined;
  imageUrl: string | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (url: string | null) => void;
  colorType: 'ribbon' | 'package';
}

const ColorFields: React.FC<ColorFieldsProps> = ({
  code,
  color,
  imageUrl,
  onChange,
  onImageChange,
  colorType
}) => {
  return (
    <>
      <div className="space-y-2 text-center">
        <Label htmlFor="code" className="text-center">Código</Label>
        <Input
          id="code"
          name="code"
          placeholder="Ex: 310"
          value={code}
          onChange={onChange}
          className="rounded-full text-center"
        />
      </div>

      <div className="space-y-2 text-center">
        <Label htmlFor="color" className="text-center">Cor Hexadecimal</Label>
        <div className="flex items-center justify-center gap-2">
          <Input
            id="color"
            name="color"
            type="color"
            value={color}
            onChange={onChange}
            className="w-12 h-10 p-1 rounded-full"
          />
          <Input
            value={color}
            onChange={onChange}
            name="color"
            className="flex-1 rounded-full text-center"
          />
        </div>
      </div>

      <div className="space-y-2 text-center">
        <Label className="text-center">Imagem (opcional)</Label>
        <ColorImageUploader
          imageUrl={imageUrl}
          onChange={onImageChange}
          colorType={colorType}
        />
        <p className="text-xs text-muted-foreground text-center">
          Upload de imagem (PNG com transparência recomendado)
        </p>
      </div>
    </>
  );
};

export default ColorFields;
