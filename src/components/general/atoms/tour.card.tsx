'use client';

import Image from 'next/image';
import React from 'react';
import images from '@/assets/images';
import { Button } from '../../ui/button';
import TextGradientBtn from './text.gradient.btn';
import { useRouter } from 'next/navigation';

const TourCard = (
  {
    tour
  }: {
    tour: any;
  }
) => {
  
  const router = useRouter();

  return (
    <div className="w-full h-full flex justify-between gap-5">
      <div className="relative w-full flex justify-center items-center rounded-lg">
        {/* Image Background */}
        <div className="absolute w-[366px] h-[140px] z-0 rounded-md">
          <img
            // src={tour?.backgroundTournament}
            src="https://as1.ftcdn.net/v2/jpg/00/96/81/48/1000_F_96814823_4YZrsofbvFRuX7Uve3VB46aKln2BJOjD.jpg"
            alt="FeaturedTournament"
            className="rounded-md object-cover w-full h-full"
          />
        </div>

        {/* Name of the tournament */}
        <div className="relative z-10 flex flex-col justify-center items-center py-10 gap-3 text-[18px] text-white font-bold leading-normal">
          <h1 className="">
            Smash Masters Championship:
            <br />
            Flight of the Feather
          </h1>
        </div>

        {/* Tags  */}
        <div className="text-white text-right text-[12px] font-semibold absolute z-10 top-0 left-0 bg-primaryColor px-2 py-[2px]  rounded-tl-md rounded-br-md">
          Ho Chi Minh
        </div>

        <div className="text-white text-right text-[12px] font-semibold absolute z-10 top-0 right-0 bg-primaryColor px-2 py-[2px] rounded-tr-md rounded-bl-md">
          22-25 Dec
        </div>
        {/* Sponsor Tag */}
        <div className="absolute z-10 bottom-1 right-1 w-10 h-10">
          <Image src={images.sponsorImage} alt="Sponsor" fill />
        </div>
      </div>
      {/* Button Details */}
      <div className="flex flex-col gap-5 min-w-max ">
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-semibold text-[16px] ">
            Stage: Group Stage
          </h2>
          {/* Line */}
          <div className="w-full h-2 bg-gradient-to-r from-primaryColor from-50% to-slate-400 to-50%  outline-none rounded "></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <TextGradientBtn textColor="orange" size="sm"
              onClick={() => {
                router.push(`/tournaments/${tour?.id}`);
              }}>
              More Details
            </TextGradientBtn>
          </div>
          <Button size={'sm'}>Watch Live</Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
