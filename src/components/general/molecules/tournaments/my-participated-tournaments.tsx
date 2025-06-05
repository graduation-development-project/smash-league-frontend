'use client';
import { getParticipatedTournamentByAthleteAPI } from '@/services/tournament';
import React, { useEffect, useState } from 'react';
import Spinner from '../../atoms/loaders/spinner';
import TournamentCard from '../../atoms/tournaments/tournament.card';

const MyParticipatedTournaments = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getParticipatedTournamentByAthlete = async () => {
    setIsLoading(true);
    const response = await getParticipatedTournamentByAthleteAPI(
      user.access_token,
    );
    console.log('response', response.data.data.data);
    setTournaments(response?.data?.data?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getParticipatedTournamentByAthlete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <div className="w-full h-max flex flex-col p-5 gap-5">
          <div className="grid grid-cols-4 gap-x-8 gap-y-8 w-full place-items-center justify-items-center ">
            {tournaments.map((tour, index) => (
              <div key={index}>
                <TournamentCard tour={tour?.tournament} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyParticipatedTournaments;
