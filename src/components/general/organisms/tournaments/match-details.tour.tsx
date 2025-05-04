import React, { useEffect, useState } from 'react';
import MatchCard from '../../atoms/tournaments/match.card';
import { match } from 'assert';
import { getMatchesOfTournamentEventAPI } from '@/services/tournament';

const MatchDetailsTour = ({
  mainColor,
  matchList,
  eventId,
  tournamentId,
  isOrganizer,
  tour
}: {
  mainColor: string;
  matchList: any;
  eventId: string;
  tournamentId: string | string[];
  isOrganizer: boolean;
  tour: any;
}) => {
  const linearBgColor = `bg-[linear-gradient(180deg,_${mainColor}_0%,_#2c2c2c_50%)]`;
  const matchCourt = [
    {
      court: 'Court 1',
      match: [1, 2, 3, , 4, 5],
    },
    {
      court: 'Court 1',
      match: [1, 2, 3, , 4, 5],
    },
    {
      court: 'Court 1',
      match: [1, 2, 3, , 4, 5],
    },
    {
      court: 'Court 1',
      match: [1, 2, 3, , 4, 5],
    },
  ];

  const [matches, setMatches] = useState([]);

  const eventName = eventId.split('-')[0];
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);

  const getMatchesOfTournamentEvent = async () => {
    try {
      const response = await getMatchesOfTournamentEventAPI(eventUUID);
      // console.log('Check res', response.data);
      setMatches(response.data.data.reverse());
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMatchesOfTournamentEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);
  console.log('matches', matches);

  return (
    <div className="w-full h-max">
      <div className={`w-full h-max flex flex-col items-center`}>
        <div className="w-3/4 h-max flex flex-col gap-5">
          {/* {matchCourt.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full h-max flex flex-col gap-20 items-center"
              >
                <h2 className="text-3xl font-bold text-textColor2">
                  {item.court}
                </h2>
                <div className="w-full h-max flex flex-col justify-between items-center gap-16">
                  {matches.map((match: any) => {
                    return (
                      <div key={match.id} className="w-full h-max">
                        <MatchCard match={match} tournamentId={tournamentId}/>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })} */}

          <div className="w-full h-max flex flex-col justify-between items-center gap-16">
            {matches.map((match: any) => {
              return (
                <div key={match.id} className="w-full h-max">
                  <MatchCard
                    match={match}
                    tournamentId={tournamentId}
                    tournamentEventId={eventUUID}
                    isOrganizer={isOrganizer}
                    tour={tour}
                    getMatchesOfTournamentEvent = {getMatchesOfTournamentEvent}
                  />
                </div>
              );
            })}
          </div>
          {/* <MatchCard match={}/> */}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsTour;
