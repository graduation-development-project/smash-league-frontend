/* eslint-disable @next/next/no-img-element */
import images from "@/assets/images";
import { formatLocation, formatOccurDate } from "@/utils/format";
import { Image } from "antd";
import { CalendarDays, MapPin } from "lucide-react";

import React from "react";

const StandingCard = (
  {
    tour,
  }: {
    tour: any;
  }
) => {
  const iconText = ({ icon, title }: IconTextProps) => {
    return (
      <div className="flex items-center gap-2 ">
        {icon}
        <b className="text-[12px] text-textColor">{title}</b>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-[300px] h-max shadow-shadowBtn rounded-lg p-2 gap-1">
      <div className="h-[160px] w-[284px] ">
        <img
          src={tour?.backgroundTournament}
          alt={tour?.name}
          className="w-full h-full object-cover border border-primaryColor rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <b className="text-base font-bold text-textColor">
          {tour?.name}
        </b>
        <span className="flex text-base items-center gap-1 text-textColor2 ">
          <MapPin size={18} /> {formatLocation(tour?.location)}
        </span>
        <span className="flex  text-base items-center gap-1 text-textColor2">
          <CalendarDays size={18} /> {formatOccurDate(tour?.startDate, tour?.endDate)}
        </span>
      </div>

    </div>
  );
};

export default StandingCard;
