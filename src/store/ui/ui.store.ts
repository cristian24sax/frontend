import { create } from "zustand";

interface BearState {
  setInputValue: (value: string) => void;
  search: string;

  setInputValueMenu: (value: number | null) => void;
  valueMenu: number | null;

  setNameMenu: (name: string | null) => void; // Nuevo método para establecer nombre
  nameMenu: string | null; // Nueva propiedad para almacenar el nombre
}

export const useBearStore = create<BearState>()((set) => ({
  setInputValue: (value: string) => set({ search: value }),
  search: "",

  setInputValueMenu: (value: number | null) => set({ valueMenu: value }),
  valueMenu: null,

  setNameMenu: (name: string | null) => set({ nameMenu: name }), // Implementación del método para establecer nombre
  nameMenu: null, // Valor inicial de nombre
}));