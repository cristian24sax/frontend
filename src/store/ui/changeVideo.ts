import { create } from "zustand";

interface videoState {
  setValue: (value: number) => void;
  value: number | null;
  setCurrentTime: (currentTime: number) => void;
  currentTime: number;
  hasBeenPlayedMap: { [key: number]: boolean };
  setHasBeenPlayed: (id: number, hasBeenPlayed: boolean) => void;
}

export const useVideoStore = create<videoState>()((set) => ({
  setValue: (value: number) => set({ value: value }),
  value: null,
  setCurrentTime: (currentTime: number) => set({ currentTime: currentTime }),
  currentTime: 0,
  hasBeenPlayedMap: {},
  setHasBeenPlayed: (id, hasBeenPlayed) =>
    set((state) => ({
      hasBeenPlayedMap: { ...state.hasBeenPlayedMap, [id]: hasBeenPlayed },
    })),
}));
