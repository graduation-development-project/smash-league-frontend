import React from "react";
import OrganizerCard from "../../atoms/organizer.zone.card";

const OrganizerZoneCard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 px-8">
      <header className="w-full flex items-start px-[20px] py-[10px] bg-secondColor text-white text-[20px] font-bold self-stretch rounded-tl-[10px] rounded-tr-[10px]">
        Upcoming Oppotunities
      </header>
      <div className="flex flex-col gap-4 ">
        <OrganizerCard />
        <OrganizerCard />
        <OrganizerCard />
      </div>
      <div className="h-[1px] w-full bg-slate-500 shadow-shadowComp bg-opacity-30"></div>
    </div>
  );
};

export default OrganizerZoneCard;
