'use client';
import { Button } from '@/components/ui/button';
import { useTeamContext } from '@/context/team.context';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TeamCard = (team: any) => {
  const [isFull, setIsFull] = useState(false);
  const { teamId, setTeamId } = useTeamContext();
  const router = useRouter();

  const handleTeamClick = () => {
    setTeamId(team.team.id);
    router.push(`/teams/details/${team.team.teamName}`);
  };

  return (
    <div
      className="w-[400px] h-[300px] flex flex-col justify-center bg-white border border-slate-300 rounded-[15px] p-5 gap-3 cursor-pointer hover:shadow-shadowComp hover:scale-110"
      onClick={handleTeamClick}
    >
      <div
        className={`w-max h-max flex justify-center items-center  text-white text-[16px] font-bold self-stretch rounded-[20px] px-[20px] py-[5px] ${
          isFull ? 'bg-red-600' : 'bg-secondColor'
        }`}
      >
        {isFull ? 'Full' : 'Open'}
      </div>
      <h1 className="text-[18px] font-bold">{team.team.teamName}</h1>
      <p className="flex items-center gap-1">
        <Avatar style={{ backgroundColor: 'gray' }} size={'small'}>
          {team.team.teamLeader.name.charAt(0)}
        </Avatar>
        <span className="text-[13px] font-semibold">
          {team.team.teamLeader.name}
        </span>
      </p>

      <p className="max-w-[350px] break-words text-[#6A6A6A] text-[14px] leading-normal truncate">
        {team.team.description}
      </p>

      <div className="flex items-center gap-5 ">
        <Avatar.Group
          max={{
            count: 4,
            style: {
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              cursor: 'pointer',
            },
          }}
        >
          <Avatar style={{ backgroundColor: 'green' }}>S</Avatar>
          <Avatar style={{ backgroundColor: '#f56a00' }}>M</Avatar>
          <Avatar style={{ backgroundColor: 'green' }}>S</Avatar>
          <Avatar style={{ backgroundColor: '#f56a00' }}>M</Avatar>
          <Tooltip
            title="Ant User"
            placement="top"
            style={{ cursor: 'pointer' }}
          >
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: '#1677ff' }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <div className="flex flex-col gap-2 justify-center ">
          <p className="text-[16px] font-semibold">10 players</p>
          <p className="text-[14px] text-[#6A6A6A]">Joined this group</p>
        </div>
      </div>

      <Button size={'lg'} onClick={handleTeamClick}>
        View Details
      </Button>
    </div>
  );
};

export default TeamCard;
