import React from "react";
import TextGradientBtn from "../atoms/text.gradient.btn";
import Image from "next/image";
import images from "@/assets/images";

const FeaturedNewsCardMain = () => {
  return (
    <div className="w-1/2 h-fit flex flex-col text-right gap-3">
      <span className="bg-gradient-orange bg-clip-text text-transparent font-bold text-[20px]">
        View More
      </span>
      <div className="w-full aspect-[3/2] bg-white flex flex-col gap-5 p-5 rounded-lg shadow-shadowBtn text-left">
        <div className="w-full aspect-video">
          <Image
            className="w-full h-full object-cover rounded-lg"
            src={images.badmintonDoubleImage}
            alt="Badminton Doubles"
          />
        </div>
        <div className="flex flex-col justify-between gap-3">
          <h4 className="font-semibold ">India Triumphs on the Global Stage</h4>
          <span className="">
            History made! Team India celebrates a monumental victory in the
            Thomas Cup, Thomas Cup, showcasing skill, determination, and
            showcasing skill, determination, and...
          </span>
          <TextGradientBtn textColor="orange" size="sm">
            Read More
          </TextGradientBtn>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewsCardMain;
