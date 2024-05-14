import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  type = "button",
  onClick,
  children,
  className,
  iconName,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` text-blue-500 hover:text-blue-700 font-bold p-2 rounded-full cursor-pointer flex gap-2 items-center ${className} ${
        children ? "justify-between" : "justify-center"
      }`}
    >
      {iconName && <FontAwesomeIcon icon={iconName} className="" />}
      {children}
    </button>
  );
};

export default Button;
