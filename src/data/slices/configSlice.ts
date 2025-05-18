
import { StateCreator } from 'zustand';
import { ConfigState } from '../types';
import { RootState } from '../store';

export interface ConfigSlice {
  headerImageUrl: string | null;
  whatsappNumber: string;
  setHeaderImageUrl: (url: string) => void;
  setWhatsappNumber: (number: string) => void;
}

export const createConfigSlice: StateCreator<
  RootState,
  [],
  [],
  ConfigSlice
> = (set) => ({
  headerImageUrl: null,
  whatsappNumber: "5565992000000", // Default WhatsApp number
  
  setHeaderImageUrl: (url: string) => set({ headerImageUrl: url }),
  setWhatsappNumber: (number: string) => set({ whatsappNumber: number }),
});
