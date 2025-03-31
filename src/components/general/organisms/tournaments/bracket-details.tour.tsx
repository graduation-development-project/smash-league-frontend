'use client';
// import SingleEliminationBracket from '@/bracket-single/single-elim-bracket';
import SingleTeamEliminationBracket from '@/bracket-single/single-team-elim-bracket';
import Match from '@/components/match';
import TeamMatch from '@/components/team-match';
// import { simpleBracket, teamBrackets } from '@/mock-data/simple-data';
import { getMatchesOfTournamentEventAPI } from '@/services/tournament';
import React, { useEffect, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

const BracketDetailsTour = ({
  mainColor,
  bracket,
  eventId,
}: {
  mainColor: string;
  bracket: any;
  eventId: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null); // Ensure it can be null initially
  const { events } = useDraggable(ref as React.MutableRefObject<HTMLElement>);
  const color = mainColor || '#FF8243';

  const [brackets, setBrackets] = useState([]);

  const eventName = eventId.split('-')[0];
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);

  console.log('Check event', eventUUID);

  const getMatchesOfTournamentEvent = async () => {
    try {
      const res = await getMatchesOfTournamentEventAPI(eventUUID);
      console.log('Cgheck res', res);
      setBrackets(res?.data?.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMatchesOfTournamentEvent();
  }, []);

  console.log('Check brackets', brackets);

  return (
    <div className="w-full h-max p-5">
      <div className="w-full h-max min-h-56 flex flex-col gap-8">
        {/* <h3 className='w-max text-4xl font-extrabold '>
                    Battle&apos;s Bracket
                    <div className={`w-1/2 h-1 rounded-full ${bgColor} mt-1`}/>
                </h3> */}

        <div
          style={{ borderColor: `${color}` }}
          className={`w-1/2 flex gap-10 text-base text-white p-5 bg-[#2c2c2c] rounded-r-lg border-b-4 `}
        >
          <th className="text-start flex flex-col gap-3">
            <li>Players:</li>
            <li>Format:</li>
            <li>Game:</li>
            <li>Start Time:</li>
          </th>

          <td className="text-start flex flex-col gap-3">
            <li>20</li>
            <li>Single Elimination</li>
            <li>Knockout</li>
            <li>March 2rd, 2025 at 2:30 PM</li>
          </td>
        </div>

        <div
          className="w-[1200px] h-max bg-[#e2e2e2] rounded-lg overflow-x-auto overflow-y-auto cursor-grab"
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
