
export interface Flavor {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
}

export interface RibbonColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
  imageUrl?: string;     // URL da imagem da fita
}

export interface PackageColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
  imageUrl?: string;     // URL da imagem da embalagem
}

export interface Combination {
  ribbonId: string;
  packageId: string;
  imageUrl: string;
}
