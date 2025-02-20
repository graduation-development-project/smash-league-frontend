"use client";

import React, { useState } from "react";
import TeamsTournamentsCard from "../../atoms/teams/teams-tournaments-card";
import PaginationCard from "../../atoms/pagination/pagination-card";
import SearchTeamsParticipatedTournaments from "../../atoms/teams/search-teams-participated-tournaments";
import EmptyCard from "../../molecules/empty/empty.card";

const TournamentsTeamsDetails = () => {
  const [isTournaments, setIsTournaments] = useState(true);
  return (
    <>
      {isTournaments ? (
        <div className="w-full h-full flex flex-col gap-5 py-5 px-8">
          <div>
            <SearchTeamsParticipatedTournaments />
          </div>
          <div className="flex flex-col gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <TeamsTournamentsCard />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            {" "}
            <PaginationCard />
          </div>
        </div>
      ) : (
        <EmptyCard
          description="No tournaments found"
          image="https://cdn-icons-png.flaticon.com/512/313/313738.png"
        />
      )}
    </>
  );
};

export default TournamentsTeamsDetails;
