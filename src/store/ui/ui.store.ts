import { create } from "zustand";

interface BearState {
  setInputValue: (value: string) => void;
  search: string;
}

export const useBearStore = create<BearState>()((set) => ({
  setInputValue: (value: string) => set({ search: value }),
  search: "",
}));
