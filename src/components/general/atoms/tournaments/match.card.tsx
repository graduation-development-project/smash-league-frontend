'use client';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Popconfirm, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import UmpireAssignModal from './umpire-assign.tour.modal';
import AssignPlayerInMatchModal from './assign-player-in-match.modal';
import {
  getParticipantsByTournamentEventAPI,
  getTournamentEventParticipantsAPI,
} from '@/services/tournament';

const MatchCard = ({
  match,
  tournamentId,
  tournamentEventId,
  isOrganizer,
  tour,
  getMatchesOfTournamentEvent,
}: {
  match: any;
  tournamentId: string | string[];
  tournamentEventId: string;
  isOrganizer: boolean;
  tour: any;
  getMatchesOfTournamentEvent: any;
}) => {
  const mainColor = '#60a5fa';
  const bgColor = 'bg-[#60a5fa]';
  // const name = 'H.D.T.Nguyen';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignAthleteModalOpen, setIsAssignAthleteModalOpen] =
    useState(false);
  const [participantsList, setParticipantsList] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const setScore = [
    {
      player1: 17,
      player2: 15,
    },
    {
      player1: 16,
      player2: 15,
    },
    {
      player1: 21,
      player2: 10,
    },
    {
      player1: 10,
      player2: 13,
    },
    {
      player1: 20,
      player2: 21,
    },
  ];
  // console.log('Check match', match);

  // console.log('Check', match.participants);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showAssignAthleteModal = () => {
    setIsAssignAthleteModalOpen(true);
  };

  const getTournamentEventParticipants = async () => {
    if (!user) return;
    try {
      const response = await getParticipantsByTournamentEventAPI(
        tournamentEventId,
      );
      // console.log('Check participants', response.data.data.listParticipants);
      const formatData = response.data.data.listParticipants.map(
        (participant: any) => {
          return {
            value: participant.id,
            label:
              participant.partner !== null
                ? participant.user.name + ' / ' + participant.partner.name
                : participant.user.name,
          };
        },
      );
      setParticipantsList(formatData);
    } catch (error: any) {
      console.log('Check error', error);
    }
  };

  useEffect(() => {
    getTournamentEventParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // console.log('Check party', participantsList);

  const player = (hasPlayer: boolean, players?: any) => {
    // console.log('Check player', players);
    return (
      <div className="">
        {hasPlayer ? (
          <div>
            {players.player2 !== null ? (
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col justify-center gap-2">
                  <Avatar
                    style={{ backgroundColor: 'white', color: '' }}
                    size={50}
                    src={
                      players?.player1?.avatarUrl
                        ? players?.player1?.avatarUrl
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                  />

                  <Avatar
                    style={{ backgroundColor: 'white', color: '' }}
                    size={50}
                    src={
                      players?.player2?.avatarUrl
                        ? players?.player2?.avatarUrl
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                  />
                </div>
                <div className="w-2/3 flex flex-col gap-3">
                  <b
                    className={hasPlayer ? 'text-[#93e093]' : 'text-[#8e8e8e]'}
                  >
                    {players.player1.name}
                  </b>

                  <b
                    className={hasPlayer ? 'text-[#93e093]' : 'text-[#8e8e8e]'}
                  >
                    {players.player2.name}
                  </b>
                  {/* <span className="text-base">FPT University</span> */}
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-4">
                <Avatar
                  style={{ backgroundColor: 'white', color: '' }}
                  size={85}
                  src={
                    players?.player1?.avatarUrl
                      ? players?.player1?.avatarUrl
                      : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                  }
                />
                <div className="w-2/3 flex flex-col gap-4">
                  <b
                    className={hasPlayer ? 'text-[#93e093]' : 'text-[#8e8e8e]'}
                  >
                    {players.player1.name}
                  </b>
                  {/* <span className="text-base">FPT University</span> */}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>No information</div>
        )}
      </div>
    );
  };
  const sets = () => {
    return (
      <div className="flex flex-row gap-4 font-bold text-xl items-center">
        <div className="w-[3px] h-8 bg-[#8e8e8e] rounded-full" />
        {match?.games.map((game: any) => {
          return (
            <div key={game.id} className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-[#ffffff2a] px-5 py-1 rounded-md">
                <span
                  className={
                    game.leftCompetitorPoint > game.rightCompetitorPoint
                      ? 'text-[#93e093]'
                      : ''
                  }
                >
                  {game.leftCompetitorPoint}
                </span>
                -
                <span
                  className={
                    game.rightCompetitorPoint > game.leftCompetitorPoint
                      ? 'text-[#93e093]'
                      : ''
                  }
                >
                  {game.rightCompetitorPoint}
                </span>
              </div>
              <div className="w-[3px] h-8 bg-[#8e8e8e] rounded-full" />
            </div>
          );
        })}
      </div>
    );
  };

  // const content = (
  //   <ConfigProvider
  //     theme={{
  //       token: {
  //         colorPrimary: '#FF8243',
  //       },
  //     }}
  //   >
  //     <div className="w-full h-full flex flex-col gap-2 px-1 justify-self-start font-semibold">
  //       <button
  //         className="text-secondColor text-[14px] font-semibold hover:underline w-full"
  //         onClick={showModal}
  //       >
  //         Assign Umpire
  //       </button>

  //       {/* <Popconfirm
  //         title="Are you sure to assign this athlete"
  //         description="Are you sure to remove this member?"
  //         onConfirm={() => {}}
  //         onCancel={() => {}}
  //         okText="Yes"
  //         cancelText="No"
  //       > */}
  //       <button
  //         className="text-primaryColor text-[14px] font-semibold hover:underline w-full"
  //         // onClick={handleRemoveMember}
  //         onClick={showAssignAthleteModal}
  //       >
  //         Assign Athlete
  //       </button>
  //       {/* </Popconfirm> */}
  //     </div>
  //   </ConfigProvider>
  // );
  return (
    <div className="relative w-full h-max flex flex-col items-center ">
      <div className="relative w-full h-[300px]  bg-[#2c2c2c] rounded-xl text-white shadow-shadowBtn">
        <div className="w-full h-full flex flex-col justify-between items-center px-5 py-5 font-medium">
          <div className="flex w-max h-max text-base gap-3 items-center">
            <span>MS</span>
            <div className="w-[2px] h-5 bg-[#8e8e8e] rounded-full" />
            <span>20-30</span>
            <div className="w-[2px] h-5 bg-[#8e8e8e] rounded-full" />
            <span>R16</span>
            <div className="w-[2px] h-5 bg-[#8e8e8e] rounded-full" />
            <span>Court 1</span>
          </div>
          <div className="w-full flex justify-between items-center text-white text-2xl px-5">
            {match.participants.map((item: any, index: number) => {
              return <div key={item.id}>{player(true, item)}</div>;
            })}

            {/* <span className="font-bold">VS</span> */}
            {match.participants.length === 1 && player(false)}
          </div>
          <div>{match?.games.length > 0 && sets()}</div>
          <div className={`w-1/2 h-1 rounded-full ${bgColor}`} />
        </div>

        {isOrganizer && (
          <div className="text-white absolute top-4 right-2">
            {/* <Popover
            trigger={'click'}
            content={content}
            placement="bottomLeft"
            arrow={false}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          > */}{' '}
            <HiOutlineDotsVertical size={25} onClick={showModal} />
            {/* </Popover> */}
          </div>
        )}
      </div>
      <div
        className={`absolute w-1/3 h-12 -top-7 flex text-white text-3xl rounded-lg font-bold items-center justify-center shadow-shadowBtn`}
        style={{
          background: `linear-gradient(to bottom, ${mainColor}, #2c2c2c 70%)`,
        }}
      >
        {match.name}
      </div>

      <UmpireAssignModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        tournamentId={tournamentId}
        matchId={match.id}
        playersOptions={participantsList}
        tour={tour}
        getMatchesOfTournamentEvent={getMatchesOfTournamentEvent}
      />

      <AssignPlayerInMatchModal
        isModalOpen={isAssignAthleteModalOpen}
        setIsModalOpen={setIsAssignAthleteModalOpen}
        matchId={match.id}
        playersOptions={participantsList}
      />
    </div>
  );
};

export default MatchCard;
