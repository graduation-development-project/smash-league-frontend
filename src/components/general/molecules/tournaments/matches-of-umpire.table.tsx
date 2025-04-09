'use client';

import {
  getAssignedMatchesAPI,
  getParticipatedTournamentsAPI,
} from '@/services/tournament';
import {
  Button,
  ConfigProvider,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import CheckAttendanceModal from '../../atoms/tournaments/check-attendance.umpire.modal';
import ChooseStartPlayerModal from '../../atoms/tournaments/choose-start-player.modal';
import { updateStatusOfMatchAPI } from '@/services/match';
import { toast } from 'react-toastify';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  status: string;
}

interface TournamentEvent {
  key: string;
  id: string;
  tournamentName: string;
  tournamentEvent: string;
  typeOfFormat: string;
}

interface MatchesType {
  key: string;
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
  startedWhen: string | null;
  tournamentEvent: TournamentEvent;
  tournamentEventId: string;
  umpireId: string | null;
}
const MatchesOfUmpireTable = ({ tournamentId }: { tournamentId: string }) => {
  const [matchId, setMatchId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartPlayerModalOpen, setIsStartPlayerModalOpen] = useState(false);
  const [matchesList, setMatchesList] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAssignedMatches = async () => {
    try {
      const response = await getAssignedMatchesAPI(
        user.access_token,
        tournamentId,
      );
      console.log('Check res', response.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const formatData = response.data.data.map((match: any) => ({
          key: match.id,
          courtId: match.courtId,
          forfeitCompetitorId: match.forfeitCompetitorId,
          id: match.id,
          isByeMatch: match.isByeMatch,
          leftCompetitorAttendance: match.leftCompetitorAttendance,
          leftCompetitorId: match.leftCompetitorId,
          matchNumber: match.matchNumber,
          matchStatus: match.matchStatus,
          matchWonByCompetitorId: match.matchWonByCompetitorId,
          nextMatchId: match.nextMatchId,
          rightCompetitorAttendance: match.rightCompetitorAttendance,
          rightCompetitorId: match.rightCompetitorId,
          stageId: match.stageId,
          startedWhen: match.startedWhen,
          tournamentEvent: {
            key: match.tournamentEventId,
            id: match.tournamentEventId,
            tournamentName: match.tournamentEvent.tournament.name,
            tournamentEvent: match.tournamentEvent.tournamentEvent,
            typeOfFormat: match.tournamentEvent.typeOfFormat,
          },
          tournamentEventId: match.tournamentEventId,
          umpireId: match.umpireId,
        }));
        setMatchesList(formatData);
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  // console.log('Check matchesList', matchesList);
  // console.log('check matchStatus', matchStatus);

  useEffect(() => {
    getAssignedMatches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateStatusOfMatch = async (status: string, matchId: string) => {
    try {
      const response = await updateStatusOfMatchAPI(
        matchId,
        user.access_token,
        status,
      );
      console.log('check response', response.data);
      if (
        response?.data?.statusCode === 204 ||
        response?.data?.statusCode === 200
      ) {
        setIsLoading(false);
        getAssignedMatches();
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        setIsLoading(false);
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const columns: TableProps<MatchesType>['columns'] = [
    {
      title: 'Tour Name',
      dataIndex: 'tournamentEvent',
      key: 'tourName',
      render: (_, { tournamentEvent }) => (
        <h1>{tournamentEvent.tournamentName}</h1>
      ),
    },
    {
      title: 'Format',
      dataIndex: 'tournamentEvent',
      key: 'format',
      render: (_, { tournamentEvent }) => (
        <h1>{tournamentEvent.typeOfFormat}</h1>
      ),
    },

    {
      title: 'Tournament Event',
      dataIndex: 'tournamentEvent',
      key: 'tournamentEvent',
      render: (_, { tournamentEvent }) => (
        <h1>{tournamentEvent.tournamentEvent}</h1>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, { matchStatus, id }) => (
        <Select
          defaultValue={matchStatus}
          style={{ width: 150 }}
          onChange={(value) => updateStatusOfMatch(value, id)}
          options={[
            { value: 'NOT_STARTED', label: 'Not Started' },
            { value: 'ON_GOING', label: 'On Going' },
            { value: 'INTERVAL', label: 'Interval' },
            { value: 'ENDED', label: 'Ended' },
          ]}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { matchStatus, id }) => (
        <div className="w-full flex gap-4">
          {matchStatus === 'NOT_STARTED' ? (
            <Button
              // variant="outlined"
              onClick={() => {
                setIsModalOpen(true);
                setMatchId(id);
              }}
            >
              Check attendance
            </Button>
          ) : matchStatus === 'ON_GOING' ? (
            <Button
              type='primary'
              onClick={() => {
                setIsStartPlayerModalOpen(true);
                setMatchId(id);
              }}
            >
              Score Match
            </Button>
          ) : (
            <Button type='primary'>View Score</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: '#FF8243' } }}>
        {' '}
        <Table<MatchesType> columns={columns} dataSource={matchesList} />
      </ConfigProvider>

      <CheckAttendanceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        matchId={matchId}
      />

      <ChooseStartPlayerModal
        isModalOpen={isStartPlayerModalOpen}
        setIsModalOpen={setIsStartPlayerModalOpen}
        matchId={matchId}
      />
    </div>
  );
};

export default MatchesOfUmpireTable;
