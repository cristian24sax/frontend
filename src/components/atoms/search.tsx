import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

const SearchComponent: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {
  const [childData, setChildData] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setChildData(newValue);
    sendDataToParent(newValue);
  };

  return (
    <section className="flex justify-center items-center gap-3">
      <div>{React.createElement(TbSearch, { size: "20" })}</div> <input type="text" value={childData} onChange={handleChange} placeholder="Buscar curso" className="bg-transparent border-none focus:border-none focus:outline-none" />
    </section>
  );
};

export default SearchComponent;
