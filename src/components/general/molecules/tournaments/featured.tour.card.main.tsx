"use client";

import React, { useEffect, useState } from "react";
import {
  TrophyIcon,
  CanlendarIcon,
  ClockIcon,
  LocationIcon,
} from "@/assets/icons";

import { useHomeContext } from "@/context/home.context";
import { sliderImages } from "@/assets/data";
import TourCardSliderMain from "../../atoms/tour.card.slider.main";
import { Button } from "@/components/ui/button";
import TextGradientBtn from "../../atoms/text.gradient.btn";

const FeaturedTourCardMain = () => {
  const { activeSlide, setActiveSlide } = useHomeContext();
  const slide = sliderImages.find((item) => item.id === activeSlide);
  const [fadeInBottom, setFadeInBottom] = useState<boolean>(false);

  useEffect(() => {
    setFadeInBottom(true);
  }, [activeSlide]);


  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    setFadeInBottom(false);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full h-full flex flex-col">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px]">
          <TourCardSliderMain />
          <div className="w-[90%] flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-3">
              {sliderImages.map((item) => {
                const isActive = activeSlide === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSlideChange(item.id)}
                    className={`relative h-full w-full rounded-full shadow-md transition-all duration-300 flex justify-center items-center ${
                      isActive
                        ? "border border-primaryColor scale-100"
                        : "border border-gray-300 bg-gray-300"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inline-flex h-full w-full rounded-full border border-primaryColor animate-ping"></span>
                    )}
                    {/* Inner circle */}
                    <p
                      className={`rounded-full w-[8px] h-[8px] outline-none border-none ${
                        isActive ? "bg-primaryColor scale-95" : "bg-gray-300"
                      }`}
                    ></p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={`relative z-10 flex flex-col p-10 gap-3 transition-opacity duration-500 ${
            fadeInBottom ? "opacity-100 animate-fadeInBottom" : "opacity-0"
          }`}
        >
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
            {slide?.details.map((item) => {
              return (
                <li key={item.id} className="flex items-center gap-2 ">
                  <item.icon className="hover:text-orange-400 hover:animate-around transition-all duration-300 cursor-pointer" />{" "}
                  {item.content}
                </li>
              );
            })}
          </ul>
          <div className="flex gap-5 mt-10">
            <Button size={"lg"}>Participate now</Button>
            <TextGradientBtn textColor="orange" size="lg">Read more</TextGradientBtn>
          </div>
        </div>
        <div
          className={`text-white text-right text-[16px] font-semibold absolute z-10 top-0 right-0 bg-primaryColor px-[15px] py-[5px] rounded-tr-[3px] rounded-bl-[10px] ${
            fadeInBottom ? "opacity-100 animate-fadeInBottom" : "opacity-0"
          }`}
        >
          Featured Tournament
        </div>
      </div>
    </div>
  );
};

export default FeaturedTourCardMain;
