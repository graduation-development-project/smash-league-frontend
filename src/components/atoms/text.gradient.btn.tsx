import React from "react";
import { Button } from "../ui/button";

const TextGradientBtn = ({ textColor, children }: TextGradientBtnProps) => {
  return (
    <div>
      <Button variant={"outline"} colorBtn={"whiteBtn"} size={"lg"}>
        <span
          className={`bg-gradient-${textColor} bg-clip-text text-transparent font-black`}
        >
          {children}
        </span>
      </Button>
    </div>
  );
};

export default TextGradientBtn;
