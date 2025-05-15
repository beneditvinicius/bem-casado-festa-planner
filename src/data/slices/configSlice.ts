
import { StateCreator } from 'zustand';
import { ConfigState } from '../types';

export const configSlice: StateCreator<ConfigState> = (set) => ({
  bannerUrl: null,
  bannerText: null,
  
  setBannerUrl: (url: string) => set({ bannerUrl: url }),
  setBannerText: (text: string) => set({ bannerText: text }),
});
