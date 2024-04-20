import React from "react";

interface Props {
  type: string;
  placeholder: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
export const InputComponent = ({ type, placeholder, name, value, onChange, className }: Props) => {
  return <input type={type} placeholder={placeholder} name={name} className="p-2 rounded-md text-sm hover:ring text-gray-700 placeholder:text-gray-400 flex-grow  " value={value} onChange={onChange} />;
};
