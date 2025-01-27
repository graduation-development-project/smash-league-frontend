"use client";

import React from "react";
import { Button } from "../../ui/button";

const TextGradientBtn = ({ textColor, children }: TextGradientBtnProps) => {
  return (
    <div>
      <Button
        variant={"outline"}
        colorBtn={"whiteBtn"}
        size={"lg"}
      className={`border border-solid transition duration-300 ${
          textColor === "orange"
            ? "hover:border-primaryColor border-transparent border-2"
            : "hover:border-secondColor border-transparent border-2"
        }`}
      >
        <span
          className={`bg-gradient-${textColor} bg-clip-text text-transparent font-black `}
        >
          {children}
        </span>
      </Button>
    </div>
  );
};

export default TextGradientBtn;
