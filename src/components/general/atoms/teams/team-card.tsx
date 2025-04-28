'use client';
import { Button } from '@/components/ui/button';
import { useTeamContext } from '@/context/team.context';
import { getTeamMembersAPI } from '@/services/team';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TeamCard = (team: any) => {
  const [isFull, setIsFull] = useState(false);
  const { teamId, setTeamId } = useTeamContext();
  const router = useRouter();
  const [teamMemberList, setTeamMemberList] = useState([]);
  const handleTeamClick = () => {
    setTeamId(team.team.id);
    router.push(`/teams/details/${team.team.teamName}`);
  };

  const fetchTeamMembers = async (teamId: string) => {
    if (teamId) {
      // setIsLoading(true);
      try {
        const res = await getTeamMembersAPI(teamId, '', 1, 100);
        setTeamMemberList(res?.data?.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch team members', error);
      }
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers(team.team.id);
  }, [team.team.id]);

  // console.log('Check team', teamMemberList);

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
              color: 'white',
              backgroundColor: '#DBDBDB',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: '500',
            },
          }}
        >
          {teamMemberList.map((member: any) => (
            <Avatar
              key={member.id}
              style={{ backgroundColor: '#87d068' }}
              src={member?.avatarURL}
              alt={member?.name}
            >
              {!member?.avatarURL ? member?.name.charAt(0) : ''}
            </Avatar>
          ))}
        </Avatar.Group>
        <div className="flex flex-col gap-2 justify-center ">
          <p
            className={`text-[16px] font-semibold ${
              teamMemberList.length >= 15
                ? 'text-yellow-400'
                : teamMemberList.length >= 30
                ? 'text-red-600'
                : ''
            }`}
          >
            {teamMemberList.length}/30 {'\t'}
            <span>{teamMemberList.length === 1 ? 'Player' : 'Players'}</span>
          </p>
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
