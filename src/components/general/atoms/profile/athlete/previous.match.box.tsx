'use client';
import React, { useState } from 'react';

const PreviousMatchBox = ({ match }: { match: any }) => {
  const [isWinner, setIsWinner] = useState<boolean>(true);
  const [isWinner1, setIsWinner1] = useState<boolean>(false);

  console.log('Check match previous', match);

  return (
    <div className="w-full h-[230px] flex flex-col justify-center rounded-[10px] shadow-shadowBtn gap-3 p-5">
      <h1 className="text-[16px] font-bold text-[#2c2c2c]">
        {match?.tournamentEvent?.tournament?.name}
      </h1>

      <div className="flex flex-col gap-3">
        {/* Player */}
        <div
          className={`flex justify-between items-center ${
            isWinner ? 'font-bold' : ''
          }`}
        >
          {match?.leftCompetitor ? (
            <div className="flex flex-col gap-1">
              <h1>{match?.leftCompetitor?.user?.name}</h1>
              <h1>
                {match?.leftCompetitor?.partner?.name
                  ? match?.leftCompetitor?.partner?.name
                  : 'No Partner'}
              </h1>
            </div>
          ) : (
            <div>TBD</div>
          )}
          <div className="flex justify-center items-center gap-3">
            {/* <div
              className={`w-2 h-2 rounded-full bg-primaryColor ${
                isWinner ? 'block' : 'hidden'
              }`}
            /> */}
            <div className="flex gap-2">
              <span>{match?.games[0]?.leftCompetitorPoint}</span>
              <span>{match?.games[1]?.leftCompetitorPoint}</span>
              <span>{match?.games[2]?.leftCompetitorPoint}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200" />

        {/* Player */}
        <div
          className={`flex justify-between items-center ${
            isWinner1 ? 'font-bold' : ''
          }`}
        >
          {match?.leftCompetitor ? (
            <div className="flex flex-col gap-1">
              <h1>{match?.leftCompetitor?.user?.name}</h1>
              <h1>
                {match?.leftCompetitor?.partner?.name
                  ? match?.leftCompetitor?.partner?.name
                  : 'No Partner'}
              </h1>
            </div>
          ) : (
            <div>TBD</div>
          )}
          <div className="flex justify-center items-center gap-3">
            {/* <div
              className={`w-2 h-2 rounded-full bg-primaryColor ${
                isWinner1 ? 'block' : 'hidden'
              }`}
            /> */}
            <div className="flex gap-2">
              <span>{match?.games[0]?.rightCompetitorPoint}</span>
              <span>{match?.games[1]?.rightCompetitorPoint}</span>
              <span>{match?.games[2]?.rightCompetitorPoint}</span>
            </div>
          </div>
        </div>
        {/* Round */}
      </div>
      <h1 className="text-[16px] font-bold text-[#2c2c2c]">
        {match?.stage?.stageName}
      </h1>
    </div>
  );
};

export default PreviousMatchBox;
