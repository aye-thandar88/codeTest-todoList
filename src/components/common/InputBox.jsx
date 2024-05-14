import React from "react";

const InputBox = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-gray-200  focus:outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5 {className}`}
    />
  );
};

export default InputBox;
