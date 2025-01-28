"use client";

import React from "react";
import OrganizerZoneCardMain from "../molecules/organizer.zone.card.main";
import OrganizerZoneCard from "../molecules/organizer.zone.card";

const OrganizerZone = () => {
  return (
    <div>
      <main className="w-full h-max flex flex-col gap-[20px] bg-white rounded-[15px] p-[40px] shrink-0 items-start shadow-shadowComp mt-10">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-[32px] text-center font-bold leading-normal text-black">
            <span className="text-secondColor">Organizer</span> Zone
          </h1>
          <p className="text-[16px] text-[#6A6A6A] font-semibold leading-3">
            Become the Official Gamekeeper of Smash League Tournaments
          </p>
        </div>
        <div className="flex w-full justify-between gap-5">
          <div className="flex-grow-[2] max-w-[50%]">
            <OrganizerZoneCardMain />
          </div>
          <div className="flex-grow max-w-[50%]">
            <OrganizerZoneCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizerZone;
