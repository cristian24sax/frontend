"use client";
import { useBearStore } from "@/store/ui";
import React from "react";
import { TbSearch } from "react-icons/tb";

const SearchComponent = () => {
  const { setInputValue, setInputValueMenu, search } = useBearStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue === "") setInputValueMenu(null);
  };

  return (
    <section className="flex justify-center items-center gap-3">
      <div>{React.createElement(TbSearch, { size: "20" })}</div> <input type="text" value={search} onChange={handleChange} placeholder="Buscar curso" className="bg-transparent border-none focus:border-none focus:outline-none" />
    </section>
  );
};

export default SearchComponent;
