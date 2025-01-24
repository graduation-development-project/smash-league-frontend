import Image from "next/image";
import React from "react";
import images from "@/assets/images";
import { Button } from "../ui/button";
import TextGradientBtn from "./text.gradient.btn";

const TourCard = () => {
  return (
    <div className="w-full h-full flex justify-between items-center gap-5">
      <div className="relative w-full flex">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px]">
          <Image
            src={images.featuredTourCard}
            alt="FeaturedTournamentMain"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="rounded"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center p-10 gap-3 text-[18px] text-white font-bold leading-normal">
          <h1 className="">
            Smash Masters Championship:
            <br />
            Flight of the Feather
          </h1>
        </div>

        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 left-0 bg-primaryColor px-[15px] py-[5px] rounded-tr-[3px] rounded-br-[10px]">
          Ho Chi Minh
        </div>

        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 right-0 bg-primaryColor px-[15px] py-[5px] rounded-tr-[3px] rounded-bl-[10px]">
          22-25 Dec
        </div>
      </div>
      <div className="flex flex-col gap-5 min-w-max ">
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-semibold text-[16px] ">
            Stage: Group Stage
          </h2>
          <div className="w-full h-2 bg-gradient-to-r from-primaryColor from-50% to-slate-400 to-50%  outline-none rounded "></div>
        </div>
        <div className="flex flex-col gap-2">
          <TextGradientBtn textColor="orange">More Details</TextGradientBtn>
          <Button size={"sm"}>Watch Live</Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
