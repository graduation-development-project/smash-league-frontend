'use client';

import React, { useEffect, useState } from 'react';
import FeaturedTourCardMain from '../molecules/tournaments/featured.tour.card.main';
import FeaturedTourCard from '../molecules/tournaments/featured.tour.card';
import { getFeaturedTourAPI } from '@/services/home-page';
import EmptyCard from '../molecules/empty/empty.card';

const FeaturedTournamentMain = () => {
  const [isLoafing, setIsLoading] = useState<boolean>(true);
  const [slider, setSlider] = useState<any>([]);

  const fetchFeaturedTourMain = async () => {
    try {
      setIsLoading(true);
      const response = await getFeaturedTourAPI();
      // const tourList = [response?.data[0]];
      // console.log('response', response?.data);
      setSlider(response?.data);
      1;
      // setActiveSlide(response?.data[0].id);
      // setSlider(response?.data);
      // return response.data;
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedTourMain();
  }, []);

  return (
    <main className="w-3/4 h-max flex flex-col gap-[20px] bg-white rounded-[15px] p-[30px] shrink-0 items-start shadow-shadowComp ">
      <div className="flex flex-col gap-2 items-start">
        <h1 className="text-[32px] text-center font-bold leading-normal text-black">
          Battlefied of <span className="text-primaryColor">Champions</span>
        </h1>
        <p className="text-[16px] text-[#6A6A6A] font-semibold leading-3">
          Step onto the global stage where badminton&apos;s finest players
          compete for glory.
        </p>
      </div>
      <div className="flex w-full h-full justify-between items-start gap-5">
        {slider.length > 0 ? (
          <>
            <FeaturedTourCardMain />
            <FeaturedTourCard />
          </>
        ) : (
          <EmptyCard
            description="No tournaments for you yet."
            image="https://cdn-icons-png.flaticon.com/512/313/313738.png"
          />
        )}
      </div>
    </main>
  );
};

export default FeaturedTournamentMain;
