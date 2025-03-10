import PaginationCard from '@/components/general/atoms/pagination/pagination-card';
import SearchTournamentsOrganizersProfile from '@/components/general/atoms/profile/organizer/search-tournaments.organizer.profile';
import TeamsTournamentsCard from '@/components/general/atoms/teams/teams-tournaments-card';
import React from 'react';

const TournamentsOrganizerProfile = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 items-center py-5 px-8">
      <SearchTournamentsOrganizersProfile />
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-full h-full">
            <TeamsTournamentsCard />
          </div>
        ))}
      </div>

      <PaginationCard
        total={12}
        currentPage={1}
        totalPerPage={6}
        onChange={() => {}}
      />
    </div>
  );
};

export default TournamentsOrganizerProfile;
