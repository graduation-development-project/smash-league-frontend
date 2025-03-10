'use client';
import React, { useEffect, useState } from 'react';
import SearchTeamBar from '../../atoms/teams/search-teams-bar';
import TeamCard from '../../atoms/teams/team-card';
import TeamsBanner from '../../molecules/teams/teams-banner';
import PaginationCard from '../../atoms/pagination/pagination-card';
import { searchTeamsAPI } from '@/services/team';
import Spinner from '../../atoms/loaders/spinner';
import { useTeamsContext } from '@/library/teams.context';

const AllTeams = (props: any) => {
  const { session } = props;
  const { teamsList, setTeamsList } = useTeamsContext();
  const { isLoading, setIsLoading } = useTeamsContext();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPerPage, setTotalPerPage] = useState<number>(6);
  const getTeams = async () => {
    setIsLoading(true);
    try {
      const res = await searchTeamsAPI(currentPage, totalPerPage);
      setTeamsList(res?.data?.data || []);
      setTotal(res?.data?.meta?.total);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = async (page: number) => {
    try {
      const res = await searchTeamsAPI(page, totalPerPage);
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
        <SearchTeamBar />

        {/* Centering Grid Items */}
        {teamsList.length > 0 ? (
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
