import SearchTournamentsAthleteProfile from "@/components/general/atoms/profile/athlete/search-tournaments.athlete.profile";
import TournamentBar from "@/components/general/atoms/profile/athlete/tournament.bar";
import React from "react";

const TournamentsAthleteProfile = ({profile, setProfile}: {profile: any, setProfile: React.Dispatch<any>}) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-5">
      <SearchTournamentsAthleteProfile />
      <div className="w-full h-full flex flex-col gap-3 shadow-shadowBtn p-6 rounded-[10px]">
        <h1 className="text-[32px] font-semibold text-primaryColor underline text-center ">
          Tournament Results
        </h1>
        <div className="w-full h-full flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              {" "}
              <TournamentBar />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentsAthleteProfile;
