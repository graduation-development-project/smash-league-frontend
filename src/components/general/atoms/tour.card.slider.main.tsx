"use client";

import React from "react";
import { sliderImages } from "@/assets/data"; // Ensure sliderImages is correctly imported

import { useHomeContext } from "@/context/home.context";
import { Image } from "antd";


const TourCardSliderMain = (
  {
    backgroundImage,
  }: {
    backgroundImage: string;
  }
) => {
  const { activeSlide } = useHomeContext(); // Ensure useHomeContext is correctly used

  if (!sliderImages || sliderImages.length === 0) {
    console.error("sliderImages is not defined or empty.");
    return <div>No images available</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 bg-transparent">
      <div className="w-full h-full">
        <img
          src="https://as1.ftcdn.net/v2/jpg/00/96/81/48/1000_F_96814823_4YZrsofbvFRuX7Uve3VB46aKln2BJOjD.jpg"
          // src={backgroundImage}
          alt="Featured Tournament"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default TourCardSliderMain;
