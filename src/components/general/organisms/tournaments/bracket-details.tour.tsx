'use client';
// import SingleEliminationBracket from '@/bracket-single/single-elim-bracket';
import SingleTeamEliminationBracket from '@/bracket-single/single-team-elim-bracket';
import Match from '@/components/match';
import TeamMatch from '@/components/team-match';
import { getParticipantListAPI } from '@/services/detail-tour';
// import { simpleBracket, teamBrackets } from '@/mock-data/simple-data';
import {
  getBracketsOfTournamentEventAPI,
  getMatchesOfTournamentEventAPI,
  getTournamentEventDetailAPI,
} from '@/services/tournament';
import { EVENT_ENUM, TYPE_OF_FORMAT_ENUM } from '@/utils/enum';
import React, { useEffect, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

const BracketDetailsTour = ({
  mainColor,
  bracket,
  eventId,
  tournamentId,
}: {
  mainColor: string;
  bracket: any;
  eventId: string;
  tournamentId: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null); // Ensure it can be null initially
  const { events } = useDraggable(ref as React.MutableRefObject<HTMLElement>);
  const color = mainColor || '#FF8243';
  const [eventDetail, setEventDetail] = useState<any>();
  const [brackets, setBrackets] = useState([]);
  const eventName = eventId.split('-')[0];
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);

  // console.log('Check event', eventUUID);

  const getMatchesOfTournamentEvent = async () => {
    try {
      const res = await getBracketsOfTournamentEventAPI(eventUUID);
      // console.log('Cgheck res', res);
      const allMacthes = res?.data?.data;
      // allMacthes.shift();

      // console.log("Check", allMacthes);

      setBrackets(allMacthes);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const fetchParticipantList = async () => {
    try {
      const res = await getParticipantListAPI(eventUUID);
      if (res.statusCode === 200 || res.statusCode === 201) {
        setNumberOfParticipants(res?.data?.numberOfParticipants);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const fetchGetTournamentEventDetailAPI = async () => {
    try {
      const res = await getTournamentEventDetailAPI(tournamentId);
      // console.log("Check res", res.data);
      // console.log("eventUUID", (res?.data.find((event: any) => event.id === eventUUID)));

      setEventDetail(res?.data.find((event: any) => event.id === eventUUID));
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchParticipantList();
    fetchGetTournamentEventDetailAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventUUID]);
  // console.log('Check eventDetail', eventDetail);
  useEffect(() => {
    getMatchesOfTournamentEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  // console.log('Check bracket', brackets);
  return (
    <div className="w-full h-max p-5">
      <div className="w-full h-max min-h-56 flex flex-col gap-6">
        {/* <h3 className='w-max text-4xl font-extrabold '>
                    Battle&apos;s Bracket
                    <div className={`w-1/2 h-1 rounded-full ${bgColor} mt-1`}/>
                </h3> */}

        <div
          style={{ borderColor: `${color}` }}
          className={`w-1/2 flex gap-10 text-base text-white p-5 bg-[#2c2c2c] rounded-r-lg border-b-4 `}
        >
          <div className="text-start flex flex-col gap-3">
            <li>Range age:</li>
            <li>Format:</li>
            <li>Number of Participants:</li>
            <li>Event:</li>
          </div>

          <div className="text-start flex flex-col gap-3">
            <li className="font-bold">{`From ${eventDetail?.fromAge} - ${eventDetail?.toAge} years old`}</li>
            <li>
              {
                TYPE_OF_FORMAT_ENUM[
                  eventDetail?.typeOfFormat as keyof typeof TYPE_OF_FORMAT_ENUM
                ]
              }
            </li>
            <li>{numberOfParticipants}</li>
            <li>{EVENT_ENUM[eventName as keyof typeof EVENT_ENUM]}</li>
          </div>
        </div>

        <div
          style={{ borderColor: `${color}` }}
          className={`w-1/2 flex gap-10 text-base text-white p-5 bg-[#2c2c2c] rounded-r-lg border-b-4 `}
        >
          <div className="text-start flex flex-col gap-3">
            <li>Number of Games:</li>
            <li>Winning Point:</li>
            <li>Last Point:</li>
          </div>

          <div className="text-start flex flex-col gap-3">
            <li>{eventDetail?.numberOfGames}</li>
            <li>{eventDetail?.winningPoint}</li>
            <li>{eventDetail?.lastPoint}</li>
          </div>
        </div>
        <div
          style={{ borderColor: `${color}` }}
          className={`w-2/3 flex flex-col gap-2 text-base text-white p-4 bg-[#2c2c2c] rounded-r-lg border-b-4 `}
        >
          <span className="font-bold text-lg">Rule of Event</span>
          <p>{eventDetail?.ruleOfEventExtension}</p>
        </div>

        <div
          className="w-[1000px] max-h-[2500px] bg-[#e2e2e2] rounded-lg overflow-x-auto overflow-y-auto cursor-grab"
          {...events}
          ref={ref}
        >
          {/* <div className='w-[5000px] h-[3000px] bg-red-600'/> */}
          <SingleTeamEliminationBracket
            matches={brackets}
            matchComponent={eventName.includes('DOUBLE') ? TeamMatch : Match}
          />
        </div>
      </div>
    </div>
  );
};

export default BracketDetailsTour;
