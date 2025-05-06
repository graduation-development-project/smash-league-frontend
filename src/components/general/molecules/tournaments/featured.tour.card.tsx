"use client";

import React, { useEffect, useState } from "react";
import TourCard from "../../atoms/tour.card";
import { getFeaturedTourAPI } from "@/services/home-page";


const FeaturedTourCard = () => {

  const [tour, setTour] = useState<any>();
  // const [tourList, setTourList] = useState([]);

  const fetchFeaturedTour = async () => {
    const response = await getFeaturedTourAPI();
    const tourList = [response?.data[0], response?.data[0]];
    setTour(tourList);
    // setTour(response.data);
  }
  useEffect(() => {
    fetchFeaturedTour();
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <header className="w-full flex items-start px-[20px] py-[10px] bg-primaryColor text-white text-[20px] font-bold self-stretch rounded-tl-[10px] rounded-tr-[10px]">
        Featured Tournaments
      </header>
      <div className="flex flex-col gap-8">
        {
          tour?.map((item: any) => (
            <TourCard key={item?.id} tour={item} />
          ))
        }

      </div>
      <div className="h-[1px] w-full bg-slate-500 shadow-shadowComp bg-opacity-30"></div>
    </div>
  );
};

export default FeaturedTourCard;
