import { Country } from "@/interfaces/dataCountry";
import React, { useState, useEffect } from "react";

interface CountrySelectProps {
  dataCountry: Country | undefined;
  selectedCode: string;
  setSelectedCode: (code: string) => void;
  idCountry: number | undefined;
  setIdCountry: (id: number | undefined) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ dataCountry, selectedCode, setSelectedCode, idCountry, setIdCountry, phoneNumber, setPhoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxDigits, setMaxDigits] = useState<number | undefined>();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (code: string, id: number, digits: string) => {
    setSelectedCode(code);
    setIdCountry(id);
    setMaxDigits(parseInt(digits, 10));
    setPhoneNumber("");
    toggleDropdown();
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!maxDigits || value.length <= maxDigits) {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    if (selectedCode) {
      const country = dataCountry?.data.find((country) => country.code_number === selectedCode);
      if (country) {
        setMaxDigits(parseInt(country.number_digits, 10));
      }
    }
  }, [selectedCode, dataCountry?.data]);

  const selectedCountry = dataCountry?.data.find((country) => country.code_number === selectedCode);

  return (
    <div className="flex justify-content items-center flex-grow-1 xl:w-[235px] relative">
      <div className="relative">
        <button type="button" className="p-2 border h-[35px] w-[65px] text-sm text-gray-700 flex items-center justify-between bg-white" onClick={toggleDropdown}>
          <span className="flex items-center  text-[10px]">
            {selectedCountry && <img src={`/flags/${selectedCountry.name.toLowerCase()}.svg`} alt={selectedCountry.name} className="w-4 h-4 mr-2" />}
            {selectedCode}
          </span>
          {!selectedCode && (
            <svg className={`w-4 h-4 transition-transform transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[150px] overflow-y-auto w-[100px] text-[10px]">
            {dataCountry?.data.map((item, index) => (
              <li key={index} className="cursor-pointer p-2 flex items-center hover:bg-gray-100" onClick={() => handleOptionClick(item.code_number, item.id, item.number_digits)}>
                <img src={`/flags/${item.name.toLowerCase()}.svg`} alt={item.name} className="w-4 h-4 mr-2" />
                {item.code_number}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} className="p-2 border h-[35px] !border-l-0 w-full text-sm hover:ring text-gray-700 placeholder:text-gray-400 flex-grow" />
    </div>
  );
};

export default CountrySelect;
