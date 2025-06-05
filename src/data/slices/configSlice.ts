
import { StateCreator } from 'zustand';
import { RootState } from '../store';

export interface ConfigSlice {
  headerImageUrl: string | null;
  bannerText: string | null;
  whatsappNumber: string;
  catalogoBemCasadosLink: string;
  catalogoBolosGeladosLink: string;
  setHeaderImageUrl: (url: string) => void;
  setBannerText: (text: string) => void;
  setWhatsappNumber: (number: string) => void;
  setCatalogoBemCasadosLink: (link: string) => void;
  setCatalogoBolosGeladosLink: (link: string) => void;
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
  catalogoBemCasadosLink: "",
  catalogoBolosGeladosLink: "",
  adminPassword: "libertines2",
  
  setHeaderImageUrl: (url: string) => set({ headerImageUrl: url }),
  setBannerText: (text: string) => set({ bannerText: text }),
  setWhatsappNumber: (number: string) => set({ whatsappNumber: number }),
  setCatalogoBemCasadosLink: (link: string) => set({ catalogoBemCasadosLink: link }),
  setCatalogoBolosGeladosLink: (link: string) => set({ catalogoBolosGeladosLink: link }),
  setAdminPassword: (password: string) => set({ adminPassword: password }),
});
