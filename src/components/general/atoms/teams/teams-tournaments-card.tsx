/* eslint-disable @next/next/no-img-element */
'use client';
import images from '@/assets/images';
import { formatDate } from '@/utils/format';
import { Avatar, Image, Popover } from 'antd';
import { CalendarDays, MapPin, UsersRound } from 'lucide-react';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import React from 'react';
import { formatMoney } from '../../../../utils/format';

const TeamsTournamentsCard = ({ tour }: { tour?: any }) => {
  const router = useRouter();
  // console.log('Check tour', tour);
  const membersRelated = (
    <div className="flex gap-2">
      <Avatar style={{ backgroundColor: 'green' }}>S</Avatar>
      <Avatar style={{ backgroundColor: 'blue' }}>M</Avatar>
    </div>
  );

  return (
    <div
      className="relative w-full h-full rounded-[15px] cursor-pointer"
      onClick={() => router.push(`/tournaments/details/${tour.id}`)}
    >
      <div className="absolute w-full h-full rounded-[15px]">
        <img
          className="w-full h-full object-cover rounded-[15px]"
          src={tour.backgroundTournament}
          alt="Background Tournament"
        />

        <div className="w-full h-full absolute inset-0 bg-gray-500 hover:bg-gray-700 bg-opacity-50 rounded-[15px]" />
      </div>
      <div className="relative z-20 flex flex-col justify-center p-5 w-full h-full gap-7 ">
        <h1 className="text-white text-[24px] font-bold flex items-center max-w-[500px] break-words">
          {tour.name}
        </h1>
        <div className="flex justify-between items-center w-[80%] text-white font-semibold">
          <p className="flex justify-between items-center gap-2 group">
            <CalendarDays className="group-hover:text-primaryColor group-hover:animate-around transition-all duration-300" />
            {formatDate(tour.startDate)}
          </p>
          {/* <Popover
            content={membersRelated}
            trigger="hover"
            title="Members Related"
          > */}
            <p className="flex justify-between items-center gap-2 group">
              <FaMoneyBillTrendUp size={18} className="group-hover:text-primaryColor group-hover:animate-around transition-all duration-300" />
              {formatMoney(tour.prizePool)}
            </p>
          {/* </Popover> */}
          <p className="flex justify-between items-center gap-2 group">
            <MapPin className="group-hover:text-primaryColor group-hover:animate-around transition-all duration-300" />
            {tour.location}
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 text-white text-[16px] font-semibold bg-primaryColor px-[15px] py-[5px] rounded-tr-[10px] rounded-tl-[3px]  rounded-br-[5px] rounded-bl-[3px]">
        On-going
      </div>
    </div>
  );
};

export default TeamsTournamentsCard;
