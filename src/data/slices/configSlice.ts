
import { StateCreator } from 'zustand';
import { RootState } from '../store';

export interface ConfigSlice {
  headerImageUrl: string | null;
  bannerText: string | null;
  whatsappNumber: string;
  setHeaderImageUrl: (url: string) => void;
  setBannerText: (text: string) => void;
  setWhatsappNumber: (number: string) => void;
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
  whatsappNumber: "5566999580591", // Updated default WhatsApp number
  adminPassword: "libertines2", // Added admin password
  
  setHeaderImageUrl: (url: string) => set({ headerImageUrl: url }),
  setBannerText: (text: string) => set({ bannerText: text }),
  setWhatsappNumber: (number: string) => set({ whatsappNumber: number }),
  setAdminPassword: (password: string) => set({ adminPassword: password }),
});
