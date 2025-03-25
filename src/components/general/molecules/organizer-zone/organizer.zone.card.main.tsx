import Image from 'next/image';
import React from 'react';
import { organizerImage } from '@/assets/data';
import TextGradientBtn from '../../atoms/text.gradient.btn';
import { Button } from '@/components/ui/button';

const OrganizerZoneCardMain = () => {
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="relative w-full h-[85%] flex flex-col">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px] overflow-hidden">
          <Image
            src={organizerImage.url}
            alt="OrganizersZoneCard"
            fill
            quality={100}
            priority
            className="rounded object-cover"
          />
          {/* Overlay image to darken image */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col p-10 gap-3 w-[85%] leading-9 ">
          <div className="flex flex-col gap-6">
            <h1 className="font-semibold text-[28px] text-white leading-6">
              {organizerImage?.title}
            </h1>
            <h4 className="text-[16px] text-white leading-[24px] font-semibold">
              {organizerImage?.description}
            </h4>
          </div>
          <ul className="flex flex-col gap-5 text-[18px] text-white leading-[16px] mt-3">
            {organizerImage.details.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-2 font-semibold truncate "
                >
                  <item.icon className=" hover:text-green-400 hover:animate-around transition-all duration-300 cursor-pointer" />{' '}
                  {item.content}
                </li>
              );
            })}
          </ul>
          <div className="flex gap-5 mt-10">
            <Button size={'lg'} colorBtn={'gradientGreenBtn'}>
              Participate now
            </Button>
            <TextGradientBtn textColor="green" size="lg">
              Read more
            </TextGradientBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerZoneCardMain;
