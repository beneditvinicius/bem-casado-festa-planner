
export interface Flavor {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  isNew?: boolean;
  imageUrl?: string;
}

export interface BoloGeladoFlavor {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
  imageUrl?: string;
}

export interface Additional {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface RibbonColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
  imageUrl?: string;
}

export interface PackageColor {
  id: string;
  name: string;
  code: string;
  color: string;
  isNew?: boolean;
  imageUrl?: string;
}

export interface ConfigState {
  headerImageUrl: string | null;
  bannerText: string | null;
  whatsappNumber: string;
  setHeaderImageUrl: (url: string) => void;
  setBannerText: (text: string) => void;
  setWhatsappNumber: (number: string) => void;
}
