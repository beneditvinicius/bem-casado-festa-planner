

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
  /** URL da imagem da fita (PNG transparente sobre fundo branco) */
  imageUrl?: string;
}

export interface PackageColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
  /** URL da imagem da embalagem (PNG transparente sobre fundo branco) */
  imageUrl?: string;
}

// export interface Combination { /* removido */ }

