import { create } from "zustand";

interface videoState {
  setValue: (value: number) => void;
  value: number;
  setCurrentTime: (currentTime: number) => void;
  currentTime: number;
}

export const useVideoStore = create<videoState>()((set) => ({
  setValue: (value: number) => set({ value: value }),
  value: 0,
  setCurrentTime: (currentTime: number) => set({ currentTime: currentTime }),
  currentTime: 0,
}));
