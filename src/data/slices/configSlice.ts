
import { StateCreator } from 'zustand';
import { RootState } from '../store';

export interface ConfigSlice {
  headerImageUrl: string | null;
  bannerText: string | null;
  whatsappNumber: string;
  catalogBemCasadosUrl: string | null;
  catalogBolosGeladosUrl: string | null;
  setHeaderImageUrl: (url: string) => void;
  setBannerText: (text: string) => void;
  setWhatsappNumber: (number: string) => void;
  setCatalogBemCasadosUrl: (url: string) => void;
  setCatalogBolosGeladosUrl: (url: string) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
}

export const createConfigSlice: StateCreator<
  RootState,
  [],
  [],
  ConfigSlice
> = (set) => ({
  headerImageUrl: null,
  bannerText: null,
  whatsappNumber: "5566999580591", // Default WhatsApp number
  catalogBemCasadosUrl: null,
  catalogBolosGeladosUrl: null,
  adminPassword: "libertines2",
  
  setHeaderImageUrl: (url: string) => set({ headerImageUrl: url }),
  setBannerText: (text: string) => set({ bannerText: text }),
  setWhatsappNumber: (number: string) => set({ whatsappNumber: number }),
  setCatalogBemCasadosUrl: (url: string) => set({ catalogBemCasadosUrl: url }),
  setCatalogBolosGeladosUrl: (url: string) => set({ catalogBolosGeladosUrl: url }),
  setAdminPassword: (password: string) => set({ adminPassword: password }),
});
