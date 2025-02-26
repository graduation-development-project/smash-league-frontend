import React from "react";
import SearchTeamBar from "../../atoms/teams/search-teams-bar";
import TeamCard from "../../atoms/teams/team-card";
import { ConfigProvider, Pagination } from "antd";
import TeamsBanner from "../../molecules/teams/teams-banner";
import PaginationCard from "../../atoms/pagination/pagination-card";

const AllTeams = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-20">
      <SearchTeamBar />

      {/* Centering Grid Items */}
      <div className="w-[90%] grid grid-cols-3 gap-x-1 gap-y-6 place-items-center justify-items-center px-5 py-8 bg-white shadow-shadowBtn rounded-[15px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <TeamCard />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center  w-max py-3 px-6 ">
        <PaginationCard />
      </div>

      <TeamsBanner />
    </div>
  );
};

export default AllTeams;
