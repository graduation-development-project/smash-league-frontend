'use client';
import { Avatar } from 'antd';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';

interface UserProps {
  teamId: string;
  email: string;
  name: string;
}
const MemberSearchTeamCard = ({
  choosen = false,
  user,
  selectUser,
  setSelectUser,
}: {
  choosen?: boolean;
  user: UserProps;
  selectUser?: any;
  setSelectUser?: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div
      className={`w-[430px] h-full flex gap-2 rounded-[5px] ${
        choosen ? '' : 'hover:bg-gray-200'
      } p-2 cursor-pointer`}
      onClick={() => setSelectUser && setSelectUser(user)}
    >
      <Avatar style={{ width: '40px', height: '40px' }} icon={<FaRegUser />} />
      <div>
        <h1 className="font-semibold">{user.name}</h1>
        <h4 className="text-gray-400 text-sm italic">{user.email}</h4>
      </div>
    </div>
  );
};

export default MemberSearchTeamCard;
