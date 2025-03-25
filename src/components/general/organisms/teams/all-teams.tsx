'use client';
import React, { useEffect, useState } from 'react';
import SearchTeamBar from '../../atoms/teams/search-teams-bar';
import TeamCard from '../../atoms/teams/team-card';
import TeamsBanner from '../../molecules/teams/teams-banner';
import PaginationCard from '../../atoms/pagination/pagination-card';
import { searchTeamsAPI } from '@/services/team';
import Spinner from '../../atoms/loaders/spinner';

import { useDebounce } from '@/hooks/use-debounce';
import { useTeamContext } from '@/context/team.context';

const AllTeams = (props: any) => {
  const { session } = props;
  const {
    teamsList,
    setTeamsList,
    isLoading,
    setIsLoading,
    getTeams,
    total,
    setTotal,
    currentPage,
    setCurrentPage,
    totalPerPage,
    setTotalPerPage,
  } = useTeamContext();
  const [searchTerms, setSearchTerms] = useState<string>('');

  const debounceValue = useDebounce(searchTerms, 1000);

  // console.log("Check debounce", debounceValue);

  useEffect(() => {
    getTeams(currentPage, totalPerPage, debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, currentPage, totalPerPage]);

  const handlePageChange = async (page: number) => {
    try {
      const res = await searchTeamsAPI(page, totalPerPage, debounceValue);
      setCurrentPage(page);
      setTeamsList(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  if (isLoading && teamsList.length === 0)
    return <Spinner isLoading={isLoading} />;

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-20">
        <SearchTeamBar
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          isLoading={isLoading}
        />

        {/* Centering Grid Items */}
        {isLoading === false && teamsList.length > 0 ? (
          <div className="w-[90%] grid grid-cols-3 gap-x-1 gap-y-6 place-items-center justify-items-center px-5 py-8 bg-white shadow-shadowBtn rounded-[15px]">
            {teamsList.map((team: any, index) => (
              <div key={index}>
                <TeamCard team={team} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-[90%] h-full flex justify-center items-center px-5 py-8 bg-white shadow-shadowBtn rounded-[15px] text-gray-400 ">
            No Teams Found
          </div>
        )}

        {teamsList.length > 0 && (
          <div className="flex justify-center items-center w-max py-3 px-6 ">
            <PaginationCard
              total={total}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setTotalPerPage={setTotalPerPage}
              totalPerPage={totalPerPage}
              onChange={handlePageChange}
            />
          </div>
        )}

        <TeamsBanner session={session} />
      </div>
    </>
  );
};

export default AllTeams;
