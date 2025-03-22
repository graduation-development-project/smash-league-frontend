'use client';
import { Avatar, Popover } from 'antd';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import React, { useEffect, useMemo, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useTeamContext } from '@/context/team.context';
import { removeMemberAPI } from '@/services/team';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const TeamMemberCard = ({
  member,
  fetchMembers,
}: {
  member?: UserProps | undefined;
  fetchMembers?: () => void;
}) => {
  const [gender, setGender] = useState('Male');
  const { teamDetails, teamId } = useTeamContext();
  const [user, setUser] = useState<any>({});
  const router = useRouter();
  // const name = 'Tran Anh Minh';
  // console.log('Check details', teamDetails);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const isLeader = member?.teamRole === 'LEADER';

  // console.log('Check ', isLeader);
  // Generate a random color only once per component instance
  const avatarColor = useMemo(
    () => `#${Math.random().toString(16).slice(-6)}`,
    [],
  );

  const handleRemoveMember = async () => {
    if (!user?.access_token) return;
    try {
      const response = await await removeMemberAPI(
        teamId,
        'You are not suitable for this team. Sorry for the inconvenience',
        [member?.id ?? ''],
        user?.access_token,
      );

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        fetchMembers && fetchMembers();
        toast.success(`${response?.data}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.refresh();
      } else {
        console.log('Error', response);
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

  const content = (
    <div className="w-full h-full flex flex-col gap-2 px-1 justify-self-start font-semibold">
      <button className="text-secondColor hover:underline w-full">
        Assign
      </button>
      <button
        className="text-primaryColor hover:underline w-full"
        onClick={handleRemoveMember}
      >
        Remove
      </button>
    </div>
  );

  return (
    <div className="relative w-full h-full flex bg-white border border-slate-300 rounded-[5px] py-5 px-7 pt-8 gap-3 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
      <div>
        <Avatar
          size={40}
          style={{ backgroundColor: avatarColor }}
          src={member?.avatarURL}
        >
          {member?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </div>
      <div className="flex flex-col gap-1 ">
        <h3 className="text-[16px] font-bold text-[#2c2c2c] hover:text-primaryColor">
          {member?.name}
        </h3>
        <p className="flex items-center gap-1 hover:text-primaryColor transition duration-300 ease-in-out">
          <IoCalendarOutline size={16} />
          Age: <span className="text-[14px] text-slate-500">25</span>
        </p>
        <p className="flex items-center gap-1 hover:text-primaryColor transition duration-300 ease-in-out">
          {gender === 'Male' ? (
            <BsGenderMale size={16} />
          ) : (
            <BsGenderFemale size={16} />
          )}
          Gender: <span className="text-[14px] text-slate-500">{gender}</span>
        </p>
        <p className="flex items-center gap-1 hover:text-primaryColor transition duration-300 ease-in-out">
          <GrLocation size={16} />
          Location:{' '}
          <span className="w-max text-[14px] text-slate-500 truncate">
            Ho Chi Minh
          </span>
        </p>
      </div>
      {isLeader ? (
        <div className="absolute top-0 right-0 text-[11px] text-white bg-primaryColor py-1 px-2 font-bold rounded-bl-md">
          Leader
        </div>
      ) : (
        <Popover
          trigger={'click'}
          content={content}
          placement="bottomLeft"
          arrow={false}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <div className="absolute top-3 right-1">
            <BiDotsVerticalRounded size={20} />
          </div>
        </Popover>
      )}
    </div>
  );
};

export default TeamMemberCard;
