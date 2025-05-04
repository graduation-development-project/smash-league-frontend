'use client';
import React, { useEffect, useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Popover } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  getAllAssignedMatchesAPI,
  getMatchesOfAthleteAPI,
} from '../../../services/tournament';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formatDateTime } from '@/utils/format';

dayjs.extend(utc);

interface TournamentEvent {
  id: string;
  tournamentEvent: string;
  tournamentEventStatus: string;
  tournamentId: string;
  championshipId: string | null;
  championshipPrize: string;
  runnerUpId: string | null;
  runnerUpPrize: string;
  thirdPlaceId: string | null;
  thirdPlacePrize: string;
  jointThirdPlaceId: string | null;
  jointThirdPlacePrize: string;
  fromAge: number;
  toAge: number;
  winningPoint: number;
  lastPoint: number;
  minimumAthlete: number;
  maximumAthlete: number;
  numberOfGames: number;
  typeOfFormat: string;
  ruleOfEventExtension: string;
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

  useEffect(() => {
    if (user) {
      getAllAssignedMatches();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getAllAssignedMatches = async () => {
    if (!user) return;
    try {
      let response;
      if (profileRole === 'UMPIRE') {
        response = await getAllAssignedMatchesAPI(user?.access_token);
      } else {
        response = await getMatchesOfAthleteAPI(user?.access_token);
      }
      const matches = response?.data?.data || [];
      setScheduleList(matches);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    }
  };

  console.log('scheduleList', scheduleList);

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

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    return scheduleList.filter((match) => {
      if (!match?.startedWhen) return false;
      const matchDate = dayjs.utc(match?.startedWhen).format('YYYY-MM-DD');
      return matchDate === dateStr;
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const matches = getListData(value);

    return (
      <ul className="events">
        {matches?.map((match, idx) => (
          <Popover
            key={match.id}
            title="Information"
            content={
              <div className="w-full flex flex-col">
                <p>
                  Start Time:{' '}
                  {match.startedWhen
                    ? formatDateTime(match?.startedWhen)
                    : 'N/A'}
                </p>
              </div>
            }
          >
            <li>
              <Badge
                color={getBadgeStatusByEvent(match?.matchStatus)}
                text={`${match?.tournamentEvent?.tournamentId} - ${match?.tournamentEvent?.tournamentEvent}`}
              />
            </li>
          </Popover>
        ))}
      </ul>
    );
  };

  const monthCellRender = () => null;

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender();
    return info.originNode;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex items-center gap-5 mb-4">
        <Badge color="orange" text="Not Started" />
        <Badge color="blue" text="On Going" />
        <Badge color="gold" text="Interval" />
        <Badge color="green" text="Ended" />
      </div>
      <Calendar cellRender={cellRender} />
    </div>
  );
}
