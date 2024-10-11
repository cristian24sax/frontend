"use client";
import { useBearStore } from "@/store/ui";
import React from "react";
import { TbSearch } from "react-icons/tb";

// SearchComponent.jsx
const SearchComponent = () => {
  const { setInputValue, setInputValueMenu, search } = useBearStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue === "") setInputValueMenu(null);
  };

  return (
    <section className="flex justify-center items-center gap-3 flex-1"> {/* Agrega flex-1 para que ocupe el espacio disponible */}
      <div>{React.createElement(TbSearch, { size: "20" })}</div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Buscar curso"
        className="bg-transparent border-none focus:border-none focus:outline-none w-full sm:w-60" // Cambia el ancho según sea necesario
      />
    </section>
  );
};


export default SearchComponent;
