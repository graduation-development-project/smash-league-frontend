"use client";

import React from "react";
import TourCard from "../atoms/tour.card";

const FeaturedTourCard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <header className="w-full flex items-start px-[20px] py-[10px] bg-primaryColor text-white text-[20px] font-bold self-stretch rounded-tl-[10px] rounded-tr-[10px]">
        Featured Tournaments
      </header>
      <div className="flex flex-col gap-8">
        <TourCard />
        <TourCard />
      </div>
      <div className="h-[1px] w-full bg-slate-500 shadow-shadowComp bg-opacity-30"></div>
    </div>
  );
};

export default FeaturedTourCard;
