import { ethers } from "ethers";
import { useState } from "react";

interface HexValueProp {
  value?: string;
}
const HexValue = ({ value }: HexValueProp) => {
  const [converted, setConverted] = useState(false);
  if (!value) return null;
  const isHex = RegExp(/^0x[0-9a-fA-F]+$/).test(value!);
  const convertedValue = isHex ? ethers.BigNumber.from(value).toString() : value;

  return (
    <>
      <span>{converted ? convertedValue : value}</span>
      {isHex && (
        <button
          className="bg-white/50 px-2 rounded-lg hover:bg-gray-500 inline ml-2"
          onClick={(e) => {
            e.preventDefault();
            setConverted(!converted);
          }}
        >
          {converted ? "hex" : "dec"}
        </button>
      )}
    </>
  );
};

export default HexValue;
