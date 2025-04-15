'use client';

import PaginationCard from '@/components/general/atoms/pagination/pagination-card';
import SearchTournamentsOrganizersProfile from '@/components/general/atoms/profile/organizer/search-tournaments.organizer.profile';
import TeamsTournamentsCard from '@/components/general/atoms/teams/teams-tournaments-card';
import { Button } from '@/components/ui/button';
import { getAllTournamentsByUserAPI } from '@/services/tournament';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TournamentsOrganizerProfile = ({
  isOrganizer,
  tournamentList,
  setTournamentList,
}: {
  isOrganizer: boolean;
  tournamentList: any[];
  setTournamentList: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  // const [tournamentList, setTournamentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllTournamentByUser = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await getAllTournamentsByUserAPI(user?.access_token);
      setTournamentList(response?.data?.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllTournamentByUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // console.log('Check tournaments', tournamentList);

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center py-5 px-8">
      <div className="w-full flex justify-between items-center">
        <div className="w-[80%]">
          <SearchTournamentsOrganizersProfile />
        </div>
        {isOrganizer && (
          <Button
            className="rounded-[5px]"
            onClick={() => {
              router.push('/tournaments/create');
            }}
          >
            {' '}
            + Create Tournament
          </Button>
        )}
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        {tournamentList.map((tour: any) => (
          <div key={tour.id} className="w-full h-full">
            <TeamsTournamentsCard tour={tour} />
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
