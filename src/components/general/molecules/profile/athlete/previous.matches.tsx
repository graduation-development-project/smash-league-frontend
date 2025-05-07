'use client';

import PreviousMatchBox from '@/components/general/atoms/profile/athlete/previous.match.box';
import { getLatestMatchesAPIByAthleteAPI } from '@/services/user';
import React, { useEffect, useState } from 'react';

const PreviousMatches = ({ info }: { info: any }) => {
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);
  const getMatches = async () => {
    const response = await getLatestMatchesAPIByAthleteAPI(
      user?.access_token,
      info?.id,
    );
    // console.log('response athlete', response);
    setMatches(response?.data?.data);
  };

  useEffect(() => {
    getMatches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, info?.id]);

  return (
    <div className="w-full h-full flex flex-col justify-center  gap-2 shadow-shadowBtn rounded-[10px] p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline border-primaryColor w-full h-full text-center">
        PREVIOUS MATCHES
      </h2>
      <div className="w-full h-full flex justify-between items-center gap-2">
        {matches.length > 0 &&
          matches?.map((match: any) => (
            <div className='w-full h-full' key={match?.id}>
              <PreviousMatchBox match={match} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviousMatches;
