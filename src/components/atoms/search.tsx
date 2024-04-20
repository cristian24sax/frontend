import React from "react";
import { TbReportSearch, TbSearch } from "react-icons/tb";

export default function SearchComponent() {
  return (
    //   const icon = TbReportSearch
    <section className="flex justify-center items-center gap-3">
      <div>{React.createElement(TbSearch, { size: "20" })}</div>
      <input type="text" placeholder="Buscar curso" className="bg-transparent border-none focus:border-none focus:outline-none" />
    </section>
  );
}
