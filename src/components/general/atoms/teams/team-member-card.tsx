'use client';
import { Avatar } from 'antd';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import React, { useMemo, useState } from 'react';

const TeamMemberCard = () => {
  const [gender, setGender] = useState('Female');
  const name = 'Tran Anh Minh';

  // Generate a random color only once per component instance
  const avatarColor = useMemo(
    () => `#${Math.random().toString(16).slice(-6)}`,
    [],
  );

  return (
    <div className="w-full h-full flex bg-white border border-slate-300 rounded-[5px] py-4 px-10 gap-3 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
      <div>
        <Avatar size={40} style={{ backgroundColor: avatarColor }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[16px] font-bold text-[#2c2c2c] hover:text-primaryColor">{name}</h3>
        <p className="flex items-center gap-1 hover:text-primaryColor transition duration-300 ease-in-out">
          <IoCalendarOutline size={16} />
          Age: <span className="text-[14px] text-slate-500">25</span>
        </p>
        <p className="flex items-center gap-1 hover:text-primaryColor  transition duration-300 ease-in-out">
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
    </div>
  );
};

export default TeamMemberCard;
