"use client";

import React from "react";
import {
  TrophyIcon,
  CanlendarIcon,
  ClockIcon,
  LocationIcon,
} from "@/assets/icons";
import { Button } from "../../ui/button";
import TextGradientBtn from "../atoms/text.gradient.btn";
import TourCardSliderMain from "../atoms/tour.card.slider.main";
import { useHomeContext } from "@/library/home.context";
import { sliderImages } from "@/assets/images";

const FeaturedTourCardMain = () => {
  const { activeSlide } = useHomeContext();
  const slide = sliderImages.find((item) => item.id === activeSlide);

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full h-full flex flex-col">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px]">
          <TourCardSliderMain />
        </div>
        <div className="relative z-10 flex flex-col p-10 gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[24px] text-white leading-[20px]">
              {slide?.title}
            </h1>
            <h4 className="text-[16px] text-white leading-[20px]">
              {slide?.description}
            </h4>
          </div>
          <div className="flex py-[5px] px-[15px] items-center rounded-[20px] gap-2 bg-[#FFFFFF] bg-opacity-30 w-max">
            <span className="font-bold text-[16px] text-white leading-[32px] flex justify-center items-center gap-2">
              <TrophyIcon />
              Total Prize Pool: ${slide?.prize}
            </span>
          </div>
          <ul className="flex flex-col gap-2 text-[16px] text-white leading-[16px]">
            <li className="flex items-center gap-2">
              <CanlendarIcon /> {slide?.date}
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon /> Registration Deadline: {slide?.registerDeadline}
            </li>
            <li className="flex items-center gap-2">
              <LocationIcon /> {slide?.location}
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
