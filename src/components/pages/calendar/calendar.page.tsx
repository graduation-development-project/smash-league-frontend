'use client';
import React, { useEffect, useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Popover } from 'antd';
import type { Dayjs } from 'dayjs';
import { getAllAssignedMatchesAPI } from '../../../services/tournament';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface TournamentEvent {
  id: string;
  tournamentEvent: string; // e.g., "MENS_SINGLE"
  tournamentEventStatus: string; // e.g., "CREATED"
  tournamentId: string; // e.g., "european-badminton-masters-2025"
  championshipId: string | null;
  championshipPrize: string; // e.g., "Gold Medal, 8,000 USD"
  runnerUpId: string | null;
  runnerUpPrize: string; // e.g., "Silver Medal 4,000 USD"
  thirdPlaceId: string | null;
  thirdPlacePrize: string; // e.g., "Bronze Medal, 2,000 USD"
  jointThirdPlaceId: string | null;
  jointThirdPlacePrize: string; // e.g., "Consolation Prize, 1,000 USD"
  fromAge: number;
  toAge: number;
  winningPoint: number;
  lastPoint: number;
  minimumAthlete: number;
  maximumAthlete: number;
  numberOfGames: number;
  typeOfFormat: string; // e.g., "SINGLE_ELIMINATION"
  ruleOfEventExtension: string; // e.g., "Players must reach 2 winning sets to advance."
}
interface Match {
  courtId: string | null;
  forfeitCompetitorId: string | null;
  id: string;
  isByeMatch: boolean;
  leftCompetitorAttendance: boolean;
  leftCompetitorId: string | null;
  matchNumber: number;
  matchStatus: string;
  matchWonByCompetitorId: string | null;
  nextMatchId: string | null;
  rightCompetitorAttendance: boolean;
  rightCompetitorId: string | null;
  stageId: string | null;
  startedWhen?: string;
  tournamentEvent: TournamentEvent;
  tournamentEventId: string;
  umpireId: string | null;
  // Add more fields as needed
  // e.g., '2025-04-27 00:00:00'
  // Add more fields as needed
}

export default function CalendarPage({ profileRole }: { profileRole: string }) {
  const [scheduleList, setScheduleList] = useState<Match[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const getAllAssignedMatches = async () => {
    if (!user) return;
    try {
      const response = await getAllAssignedMatchesAPI(user.access_token);
      const matches = response?.data?.data || [];
      setScheduleList(matches);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllAssignedMatches();
    }
  }, [user]);

  console.log('Check scheduleList', scheduleList);

  const getBadgeStatusByEvent = (event: string) => {
    switch (event) {
      case 'NOT_STARTED':
        return 'orange';
      case 'ON_GOING':
        return 'blue';
      case 'INTERVAL':
        return 'gold';
      case 'ENDED':
        return 'green';
      default:
        return 'default';
    }
  };

  const content = (
    <div className="w-full h-full flex flex-col justify-center">
      <p>Check in:</p>
      <p>Start Time:</p>
    </div>
  );

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');

    const matches = scheduleList.filter((match) => {
      if (!match.startedWhen) return false;
      const matchDate = dayjs.utc(match.startedWhen).format('YYYY-MM-DD');
      return matchDate === dateStr;
    });

    console.log(`Date: ${dateStr}, Matches:`, matches);

    return matches.map((match) => ({
      color: getBadgeStatusByEvent(match.matchStatus), // use different badge colors if needed
      content: `${match.tournamentEvent.tournamentId} - ${match.tournamentEvent.tournamentEvent}`,
    }));
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, idx) => (
          <Popover
            key={`${item.content}-${idx}`}
            content={content}
            title="Information"
          >
            <li>
              <Badge color={item.color} text={item.content} />
            </li>
          </Popover>
        ))}
      </ul>
    );
  };

  const monthCellRender = () => {
    return null;
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender();
    return info.originNode;
  };

  return (
    <div className='w-full h-full flex flex-col'>
       <div className="w-full h-full flex items-center gap-5">
        <Badge color="orange" text="Not Started" />
        <Badge color="blue" text="On Going" />
        <Badge color="gold" text="Interval" />
        <Badge color="green" text="Ended" />
      </div>
      <Calendar cellRender={cellRender} />
    </div>
  );
}
