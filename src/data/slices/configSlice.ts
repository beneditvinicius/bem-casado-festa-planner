
import { StateCreator } from 'zustand';
import { ConfigState } from '../types';
import { RootState } from '../store';

export interface ConfigSlice {
  bannerUrl: string | null;
  bannerText: string | null;
  whatsappNumber: string;
  setBannerUrl: (url: string) => void;
  setBannerText: (text: string) => void;
  setWhatsappNumber: (number: string) => void;
}

export const createConfigSlice: StateCreator<
  RootState,
  [],
  [],
  ConfigSlice
> = (set) => ({
  bannerUrl: null,
  bannerText: null,
  whatsappNumber: "5565992000000", // Default WhatsApp number
  
  setBannerUrl: (url: string) => set({ bannerUrl: url }),
  setBannerText: (text: string) => set({ bannerText: text }),
  setWhatsappNumber: (number: string) => set({ whatsappNumber: number }),
});
