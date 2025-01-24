import images from "@/assets/images";
import Image from "next/image";
import React from "react";
import {
  TrophyIcon,
  CanlendarIcon,
  ClockIcon,
  LocationIcon,
} from "@/assets/icons";
import { Button } from "../ui/button";
import TextGradientBtn from "../atoms/text.gradient.btn";

const FeaturedTourCardMain = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-col">
        <div className="absolute w-full h-[95%] z-0 shadow-shadowComp rounded-[15px]">
          <Image
            src={images.featuredTourCardMain}
            alt="FeaturedTournamentMain"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="rounded"
          />
        </div>
        <div className="relative z-10 flex flex-col p-10 gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[24px] text-white leading-[20px]">
              All Star Season 2025
            </h1>
            <h4 className="text-[16px] text-white leading-[20px]">
              The Shuttlecock Masters Championship
            </h4>
          </div>
          <div className="flex py-[5px] px-[15px] items-center rounded-[20px] gap-2 bg-[#FFFFFF] bg-opacity-30 w-max">
            <span className="font-bold text-[16px] text-white leading-[32px] flex justify-center items-center gap-2">
              <TrophyIcon />
              Total Prize Pool: $50,000
            </span>
          </div>
          <ul className="flex flex-col gap-2 text-[16px] text-white leading-[16px]">
            <li className="flex items-center gap-2">
              <CanlendarIcon /> March 15-20, 2024
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon /> Registration Deadline: March 1st, 2024
            </li>
            <li className="flex items-center gap-2">
              <LocationIcon /> International Sports Arena, Singapore
            </li>
          </ul>
          <div className="flex gap-5 mt-10">
            <Button size={"lg"}>Participate now</Button>
            <TextGradientBtn textColor="orange">Read more</TextGradientBtn>
          </div>
        </div>
        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 right-0 bg-primaryColor px-[15px] py-[5px] rounded-tr-[3px] rounded-bl-[10px]">
          Featured Tournament
        </div>
      </div>
    </div>
  );
};

export default FeaturedTourCardMain;
