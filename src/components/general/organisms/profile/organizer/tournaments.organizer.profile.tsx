'use client';

import PaginationCard from '@/components/general/atoms/pagination/pagination-card';
import SearchTournamentsOrganizersProfile from '@/components/general/atoms/profile/organizer/search-tournaments.organizer.profile';
import TeamsTournamentsCard from '@/components/general/atoms/teams/teams-tournaments-card';
import EmptyCard from '@/components/general/molecules/empty/empty.card';
import { Button } from '@/components/ui/button';
import { useProfileContext } from '@/context/profile.context';
import {
  getAllTournamentsByUserAPI,
  getTournamentsOfOrganizerIdAPI,
} from '@/services/tournament';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
  const { setActiveKey, organizerId } = useProfileContext();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getTournamentsOfOrganizerId = async () => {
    if (!user) return;
    try {
      const response = await getTournamentsOfOrganizerIdAPI(
        user.access_token,
        organizerId,
        page,
        perPage,
      );
      console.log('Check tournament per page', response.data.data.data);
      setTournamentList(response.data.data.data);
      setTotal(response.data.data.meta.total);
      setPage(response.data.data.meta.currentPage);
      setPerPage(response.data.data.meta.totalPerPage);
    } catch (error: any) {
      console.error('Error fetching tournaments:', error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getTournamentsOfOrganizerId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // console.log('Check tournaments', tournamentList);

  const handlePageChange = async (page: number) => {
    try {
      const res = await getTournamentsOfOrganizerIdAPI(
        user.access_token,
        organizerId,
        page,
        perPage,
      );
      setTournamentList(res.data.data.data);
      setPage(res.data.data.meta.currentPage);
      setPerPage(res.data.data.meta.totalPerPage);
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  console.log('Check user', user);

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
              if (user && user?.UserBankAccount.length <= 0) {
                toast.warning(
                  'Please add a bank account in your profile before creating a tournament',
                );
              } else {
                router.push('/tournaments/create');
              }
            }}
          >
            {' '}
            + Create Tournament
          </Button>
        )}
      </div>
      {tournamentList.length > 0 ? (
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            {tournamentList.map((tour: any) => (
              <div key={tour.id} className="w-full h-full">
                <TeamsTournamentsCard tour={tour} />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <PaginationCard
              total={total}
              currentPage={page}
              setCurrentPage={setPage}
              totalPerPage={perPage}
              setTotalPerPage={setPerPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <EmptyCard
          description="No tournaments found"
          image="https://cdn-icons-png.flaticon.com/512/313/313738.png"
        />
      )}
    </div>
  );
};

export default TournamentsOrganizerProfile;
