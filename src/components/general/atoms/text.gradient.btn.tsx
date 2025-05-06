"use client";

import React from "react";
import { Button } from "../../ui/button";

const TextGradientBtn = ({
  textColor,
  children,
  size,
  onClick,
}: TextGradientBtnProps) => {
  const sizeValue = size === "sm" ? "sm" : size === "lg" ? "lg" : "default";
  return (
    <div>
      <Button
        onClick={onClick}
        variant={"outline"}
        colorBtn={"whiteBtn"}
        size={sizeValue}
        className={`border border-solid transition duration-300 ${textColor === "orange"
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
