"use client"

import React from "react";
import OrganizersZoneInfoCard from "../../atoms/organizers/organizers.zone.info.card";
import SearchOrganizersZoneBar from "../../atoms/organizers/search.organizers.zone.bar";
import PaginationCard from "../../atoms/pagination/pagination-card";

const AllOrganizers = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 px-20 py-4">
      <div className="w-full h-full">
        {" "}
        <SearchOrganizersZoneBar />
      </div>
      <div className="w-full grid grid-cols-4 gap-y-6 place-items-center justify-items-center px-5 py-8 bg-white shadow-shadowBtn rounded-[15px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-max h-max">
            <OrganizersZoneInfoCard />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-max h-max bg-white shadow-shadowBtn rounded-[10px]">
        <PaginationCard />
      </div>
      ``
    </div>
  );
};

export default AllOrganizers;
