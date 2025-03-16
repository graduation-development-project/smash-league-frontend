"use client";

import React from "react";
import { sliderImages } from "@/assets/data"; // Ensure sliderImages is correctly imported
import Image from "next/image";
import { useHomeContext } from "@/context/home.context";

const TourCardSliderMain = () => {
  const { activeSlide } = useHomeContext(); // Ensure useHomeContext is correctly used

  if (!sliderImages || sliderImages.length === 0) {
    console.error("sliderImages is not defined or empty.");
    return <div>No images available</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 bg-transparent">
      <div className="w-full h-full">
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
              className="rounded shadow-lg w-full h-full object-cover animate-fadeInRight"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCardSliderMain;
