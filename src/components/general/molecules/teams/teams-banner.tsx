import images from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const TeamsBanner = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute z-0 w-full h-full rounded">
        <Image
          src={images.heroImage}
          alt="Hero Background"
          fill
          quality={100}
          priority
          className="object-cover"
        />
      </div>
      <div className="relative z-10 flex justify-between w-full h-full p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-[24px] font-quicksand font-bold">
            Struggling to Find Your Perfect Team?
          </h1>
          <p className="text-[14px] text-[#E8E8E8] font-quicksand max-w-[500px] break-words">
            Build your dream team today and embark on your journey to success!
            Assemble players who share your vision and style, and take your game
            to the next level.
          </p>
          <Button className="w-max px-4 flex justify-center items-center">Create Your Team</Button>
        </div>
        <div className="">
          <Image
            src={images.heroBadmintonImage}
            alt="Hero Badminton"
            width={400}
            height={400}
            className="ml-[-20px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default TeamsBanner;
