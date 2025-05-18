
import { StateCreator } from 'zustand';
import { RootState } from '../store';

export interface ConfigSlice {
  headerImageUrl: string | null;
  bannerText: string | null;
  whatsappNumber: string;
  setHeaderImageUrl: (url: string) => void;
  setBannerText: (text: string) => void;
  setWhatsappNumber: (number: string) => void;
}

export const createConfigSlice: StateCreator<
  RootState,
  [],
  [],
  ConfigSlice
> = (set) => ({
  headerImageUrl: null,
  bannerText: null,
  whatsappNumber: "5565992000000", // Default WhatsApp number
  
  setHeaderImageUrl: (url: string) => set({ headerImageUrl: url }),
  setBannerText: (text: string) => set({ bannerText: text }),
  setWhatsappNumber: (number: string) => set({ whatsappNumber: number }),
});
