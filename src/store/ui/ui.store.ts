import { create } from "zustand";

interface BearState {
  setInputValue: (value: string) => void;
  search: string;
  setInputValueMenu: (value: number | null) => void;
  valueMenu: number | null;
}

export const useBearStore = create<BearState>()((set) => ({
  setInputValue: (value: string) => set({ search: value }),
  search: "",
  setInputValueMenu: (value: number | null) => set({ valueMenu: value }),
  valueMenu: null,
}));
