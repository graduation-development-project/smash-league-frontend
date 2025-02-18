import images from "@/assets/images";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const StandingCard = () => {
  const iconText = ({ icon, title }: IconTextProps) => {
    return (
      <div className="flex items-center gap-2 ">
        {icon}
        <b className="text-[12px] text-textColor">{title}</b>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-52 h-max shadow-shadowBtn rounded-xl p-2 gap-1">
      <div className="h-1/2 aspect-square ">
        <Image
          className="w-full h-full object-cover rounded-lg border border-primaryColor"
          src={images.badmintonChampionShip}
          alt="Badminton ChampionShip"
        />
      </div>
      <b className="text-[14px] text-textColor">
        The Shuttlecock Masters Championship
      </b>

      <span className="text-[10px] font-medium text-textColor2">
        {iconText({ icon: <MapPin size={16} />, title: "Ho Chi Minh" })}
      </span>
      <span className="text-[10px] font-medium text-textColor2">
        {iconText({
          icon: <CalendarDays size={16} />,
          title: "21 Nov - 10 Dec",
        })}
      </span>
    </div>
  );
};

export default StandingCard;
