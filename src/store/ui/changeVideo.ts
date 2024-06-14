import { create } from "zustand";

interface videoState {
  setValue: (value: number) => void;
  value: number;
}

export const useVideoStore = create<videoState>()((set) => ({
  setValue: (value: number) => set({ value: value }),
  value: 0,
}));
