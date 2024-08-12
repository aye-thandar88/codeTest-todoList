import React from "react";
import Button from "./Button";
import { status } from "../../constants";

const Footer = ({ handleStatus }) => {
  return (
    <div className="flex mt-5 bg-gray-200 px-8 py-4 rounded-lg justify-between">
      {status?.map((sta, index) => {
        return (
          <Button key={index} onClick={() => handleStatus(sta)}>
            {sta}
          </Button>
        );
      })}
    </div>
  );
};

export default Footer;
