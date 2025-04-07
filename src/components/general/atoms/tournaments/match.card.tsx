'use client';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Popconfirm, Popover } from 'antd';
import React, { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import UmpireAssignModal from './umpire-assign.tour.modal';

const MatchCard = ({
  match,
  tournamentId,
}: {
  match: any;
  tournamentId: string | string[];
}) => {
  const mainColor = '#60a5fa';
  const bgColor = 'bg-[#60a5fa]';
  const name = 'H.D.T.Nguyen';
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

  // console.log('Check', match.participants);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const player = (hasPlayer: boolean, players?: any) => {
    console.log('Check player', players);
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
                      'https://img.bwfbadminton.com/image/upload/w_308,h_359,c_thumb,g_face:center/v1697765036/assets/players/thumbnail/87442.png'
                    }
                  />

                  <Avatar
                    style={{ backgroundColor: 'white', color: '' }}
                    size={50}
                    src={
                      'https://img.bwfbadminton.com/image/upload/w_308,h_359,c_thumb,g_face:center/v1697765036/assets/players/thumbnail/87442.png'
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
                    'https://img.bwfbadminton.com/image/upload/w_308,h_359,c_thumb,g_face:center/v1697765036/assets/players/thumbnail/87442.png'
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
  const hasPoints = false;
  const sets = () => {
    return (
      <div className="flex flex-row gap-4 font-bold text-xl items-center">
        <div className="w-[3px] h-8 bg-[#8e8e8e] rounded-full" />
        {setScore.map((item: any, index) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-[#ffffff2a] px-5 py-1 rounded-md">
                <span
                  className={
                    item.player1 > item.player2 ? 'text-[#93e093]' : ''
                  }
                >
                  {item.player1}
                </span>
                -
                <span
                  className={
                    item.player2 > item.player1 ? 'text-[#93e093]' : ''
                  }
                >
                  {item.player2}
                </span>
              </div>
              <div className="w-[3px] h-8 bg-[#8e8e8e] rounded-full" />
            </div>
          );
        })}
      </div>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF8243',
        },
      }}
    >
      <div className="w-full h-full flex flex-col gap-2 px-1 justify-self-start font-semibold">
        <button
          className="text-secondColor text-[14px] font-semibold hover:underline w-full"
          onClick={showModal}
        >
          Assign Umpire
        </button>

        {/* <Popconfirm
          title="Are you sure to assign this athlete"
          description="Are you sure to remove this member?"
          onConfirm={() => {}}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        > */}
        <button
          className="text-primaryColor text-[14px] font-semibold hover:underline w-full"
          // onClick={handleRemoveMember}
          // onClick={() => setIsModalOpen(true)}
        >
          Assign Athlete
        </button>
        {/* </Popconfirm> */}
      </div>
    </ConfigProvider>
  );
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
          <div>{hasPoints && sets()}</div>
          <div className={`w-1/2 h-1 rounded-full ${bgColor}`} />
        </div>

        <div className="text-white absolute top-4 right-2">
          <Popover
            trigger={'click'}
            content={content}
            placement="bottomLeft"
            arrow={false}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            {' '}
            <HiOutlineDotsVertical size={25} />
          </Popover>
        </div>
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
      />
    </div>
  );
};

export default MatchCard;
