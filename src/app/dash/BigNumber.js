// BigNumber.jsx
import React from "react";

const BigNumber = ({ num }) => {
  return (
    <div className="flex justify-center items-center">
      <span
        className="text-8xl font-bold text-[#431407] leading-none"
        style={{ lineHeight: 0.8 }}
      >
        {num}
      </span>
    </div>
  );
};

export default BigNumber;
