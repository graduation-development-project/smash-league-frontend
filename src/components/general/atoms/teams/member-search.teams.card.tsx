'use client';
import { Avatar } from 'antd';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosRemove } from 'react-icons/io';

const MemberSearchTeamCard = ({
  choosen = false,
  user,
  selectUser,
  setSelectUser,
}: {
  choosen?: boolean;
  user: UserProps;
  selectUser?: any;
  setSelectUser: (user: any) => void;
}) => {
  return (
    <div
      className={`w-[430px] h-full flex justify-between rounded-[5px] ${
        choosen ? '' : 'hover:bg-gray-200'
      } p-2 cursor-pointer`}
      onClick={() => setSelectUser(user)}
    >
      <div className="flex gap-2">
        <Avatar
          style={{ width: '40px', height: '40px' }}
          icon={<FaRegUser />}
        />
        <div>
          <h1 className="font-semibold">{user?.name}</h1>
          <h4 className="text-gray-400 text-sm italic">{user.email}</h4>
        </div>
      </div>
      {selectUser && (
        <div
          className="flex justify-center items-center"
          onClick={(event) => {
            event.stopPropagation();
            setSelectUser(null);
          }}
        >
          <IoIosRemove size={20} />
        </div>
      )}
    </div>
  );
};

export default MemberSearchTeamCard;
