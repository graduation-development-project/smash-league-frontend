"use client";

import React from "react";
import { sliderImages } from "@/assets/images"; // Ensure sliderImages is correctly imported
import Image from "next/image";
import { useHomeContext } from "@/library/home.context";

const TourCardSliderMain = () => {
  const { activeSlide, setActiveSlide } = useHomeContext(); // Ensure useHomeContext is correctly used

  if (!sliderImages || sliderImages.length === 0) {
    console.error("sliderImages is not defined or empty.");
    return <div>No images available</div>;
  }

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {sliderImages.map((item) => (
        <div
          key={item.id}
          className={`${
            activeSlide === item.id ? "block" : "hidden"
          } w-full h-full rounded-[0.5rem]`}
        >
          <Image
            src={item.url}
            alt={`Featured Tournament ${item.id}`}
            quality={100}
            priority
            className="rounded shadow-lg w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="w-[90%] flex items-center justify-center gap-2 mt-4">
        <div>
          {sliderImages.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSlideChange(item.id)}
              className={`h-2 w-2 ml-2 rounded-full ${
                activeSlide === item.id ? "bg-primaryColor" : "bg-gray-300"
              } border-none outline-none shadow-md transition-all duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourCardSliderMain;
