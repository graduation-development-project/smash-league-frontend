import { Button } from "@/components/ui/button";
import React from "react";
import TextGradientBtn from "./text.gradient.btn";
import Image from "next/image";
import images from "@/assets/images";

const NewsCard = () => {
  return (
    <div className="flex flex-row gap-4 bg-white w-full h-40 p-4 rounded-lg shadow-shadowBtn">
      <div className="w-52 h-full rounded-lg">
        <Image
          className="w-full h-full object-cover rounded-lg"
          src={images.badmintonDoubleImage}
          alt="Badminton Doubles"
        />
      </div>
      <div className="flex flex-col justify-between ">
        <div className="">
          <h4 className="font-semibold ">India Triumphs on the Global Stage</h4>
        </div>
        <span className="">
          History made! Team India celebrates a monumental victory in the Thomas
          Cup...
        </span>
        <TextGradientBtn textColor="orange" size="sm">
          Read More
        </TextGradientBtn>
      </div>
    </div>
  );
};

export default NewsCard;
