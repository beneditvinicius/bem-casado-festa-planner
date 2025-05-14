
import { StateCreator } from 'zustand';
import { RootState } from '../store';

export interface ConfigSlice {
  whatsappNumber: string;
  setWhatsappNumber: (number: string) => void;
}

export const createConfigSlice: StateCreator<
  RootState,
  [],
  [],
  ConfigSlice
> = (set) => ({
  whatsappNumber: '5566999580591',
  
  setWhatsappNumber: (number) => set({ whatsappNumber: number }),
});
