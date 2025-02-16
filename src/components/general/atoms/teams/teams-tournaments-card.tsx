"use client";

import images from "@/assets/images";
import { Avatar, Popover } from "antd";
import { CalendarDays, MapPin, UsersRound } from "lucide-react";
import Image from "next/image";
import React from "react";

const TeamsTournamentsCard = () => {
  const membersRelated = (
    <div className="flex gap-2">
      <Avatar style={{ backgroundColor: "green" }}>S</Avatar>
      <Avatar style={{ backgroundColor: "blue" }}>M</Avatar>
    </div>
  );

  return (
    <div className="relative w-full h-full rounded-[15px] cursor-pointer">
      <div className="absolute w-full h-full rounded-[15px]">
        <Image
          src={images.backgroundImage}
          alt="Teams Tournaments Card"
          fill
          quality={100}
          priority
          className="rounded-[15px] object-cover"
        />

        <div className="w-full h-full absolute inset-0 bg-slate-500 bg-opacity-50 rounded-[15px]" />
      </div>
      <div className="relative z-20 flex flex-col justify-center p-5 w-full h-full gap-7 ">
        <h1 className="text-white text-[24px] font-bold flex items-center max-w-[350px] break-words">
          Smash Masters Championship Flight of the Feather
        </h1>
        <div className="flex justify-between items-center w-[80%] text-white font-semibold">
          <p className="flex justify-between items-center gap-2 group">
            <CalendarDays className="group-hover:text-primaryColor group-hover:animate-around transition-all duration-300" />
            16/02/2025
          </p>
          <Popover content={membersRelated} trigger="hover" title ="Members Related">
            <p className="flex justify-between items-center gap-2 group">
              <UsersRound className="group-hover:text-primaryColor group-hover:animate-around transition-all duration-300" />
              50 Participants
            </p>
          </Popover>
          <p className="flex justify-between items-center gap-2 group">
            <MapPin className="group-hover:text-primaryColor group-hover:animate-around transition-all duration-300" />
            Ho Chi Minh
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
