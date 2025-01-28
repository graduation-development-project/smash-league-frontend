import images from "@/assets/images";
import Image from "next/image";
import React from "react";

const OrganizerCard = () => {
  return (
    <div className="w-full h-full flex justify-between gap-5">
      <div className="relative w-full flex items-center rounded-[15px]">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px]">
          <Image
            src={images.featuredTourCard}
            alt="FeaturedTournamentMain"
            fill
            quality={100}
            priority
            className="rounded object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col p-10 gap-3 text-[18px] text-white font-bold leading-normal mt-4">
          <h1 className="w-[50%]">
            BWF World Badminton Championships: Autumn Doubles Cup
          </h1>
        </div>

        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 left-0 bg-secondColor px-[15px] py-[5px] rounded-tr-[3px] rounded-tl-[5px] rounded-br-[10px]">
          8 slots available
        </div>

        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 right-0 bg-secondColor px-[15px] py-[5px] rounded-tr-[3px] rounded-bl-[10px]">
          22 - 25 Dec
        </div>

        
      </div>
    </div>
  );
};

export default OrganizerCard;
