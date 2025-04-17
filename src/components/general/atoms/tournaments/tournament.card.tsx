'use client';
import images from '@/assets/images';
import { formatDate, formatLocation, formatMoney, formatOccurDate } from '@/utils/format';
import { Image } from 'antd';
import {
  CalendarClock,
  CalendarX,
  ClockAlert,
  MapPin,
  Users,
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { format } from 'path';

import React from 'react';

const TournamentCard = ({ tour }: any) => {
  const router = useRouter();
  // console.log(tour);

  return (
    <div
      className="w-[300px] h-max flex flex-col gap-2 rounded-xl p-2 border cursor-pointer hover:shadow-shadowBtn"
    >
      <div className="w-full h-[200px]">
        <Image
          className="w-full h-full object-cover rounded-lg"
          width={282}
          height={200}
          src={tour?.backgroundTournament}
          alt={tour?.name}
        />
      </div>
      <div className="flex flex-col gap-2"
        onClick={() => router.push(`/tournaments/details/${tour.id}`)}
      >
        <h3 className="text-base font-bold text-textColor">{tour?.name}</h3>
        <div className=" flex w-max py-1 px-2 bg-gradient-orange bg-opacity-20 rounded-full text-center items-center"        >
          <span className="text-xs text-white font-semibold ">
            Price pool: {formatMoney(tour?.prizePool)}
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="flex flex-row items-center gap-2">
            <MapPin size={16} color="#ff8243" /> {formatLocation(tour?.location) || tour?.location}
          </li>
          <li className="flex flex-row items-center gap-2">
            <CalendarClock size={16} color="#ff8243" />{' '}
            {formatOccurDate(tour?.startDate, tour?.endDate)}
          </li>
          <li className="flex flex-row items-center gap-2">
            <Users size={16} color="#ff8243" /> Up to 30 participants
          </li>
          <li className="flex flex-row items-center gap-2 font-semibold text-primaryColor">
            <CalendarX size={16} color="#ff8243" strokeWidth={2} /> Expired on{' '}
            {formatDate(tour?.registrationClosingDate)}
          </li>
        </ul>
        <span className=" flex flex-row items-center gap-2 text-base text-red-600 font-bold">
          {tour?.prizePool < 6 ? (
            <>
              <ClockAlert size={20} strokeWidth={3} /> {tour?.expiredDateLeft}{' '}
              left
            </>
          ) : (
            <div className="h-6"></div>
          )}
        </span>
        <button className="w-full py-2 bg-gradient-orange rounded-lg text-white font-bold hover:bg-gradient-orange hover:bg-opacity-80 hover:shadow-shadowBtn">
          Register now
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;
