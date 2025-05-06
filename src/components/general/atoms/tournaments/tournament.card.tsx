'use client';
import images from '@/assets/images';
import {
  formatDate,
  formatLocation,
  formatMoney,
  formatOccurDate,
} from '@/utils/format';
import { Image } from 'antd';
import {
  CalendarClock,
  CalendarX,
  ClockAlert,
  MapPin,
  UserPlus,
  Users,
} from 'lucide-react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import React from 'react';

const TournamentCard = ({ tour }: any) => {
  const router = useRouter();
  console.log(tour);
  return (
    <div
      className="w-[300px] h-max flex flex-col gap-2 rounded-xl p-2 border cursor-pointer hover:shadow-shadowBtn"
      onClick={() => router.push(`/tournaments/details/${tour.id}`)}
    >
      <div className="w-full h-[200px]">
        <Image
          width={'100%'}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          src={tour?.backgroundTournament}
          alt={tour?.name ? tour?.name : 'Badminton Summer Olympics'}
        />
      </div>
      <div
        className="flex flex-col gap-2"
        onClick={() => router.push(`/tournaments/details/${tour.id}`)}
      >
        <h3 className="text-base font-bold text-textColor">{tour?.name}</h3>
        <div className=" flex w-max py-1 px-2 bg-gradient-orange bg-opacity-20 rounded-full text-center items-center">
          <span className="text-xs text-white font-semibold ">
            Price pool: {formatMoney(tour?.prizePool)}
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-2 w-full">
            <MapPin size={16} color="#ff8243" />
            <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis w-full">
              {tour?.location}
            </span>
          </li>
          <li className="flex flex-row items-center gap-2">
            <CalendarClock size={16} color="#ff8243" />{' '}
            {formatOccurDate(tour?.startDate, tour?.endDate)}
          </li>
          <li className="flex flex-row items-center gap-2">
            <Users size={16} color="#ff8243" />{' '}
            {tour?.maxEventPerPerson > 1
              ? tour?.maxEventPerPerson + ' ' + 'events per person'
              : tour?.maxEventPerPerson + ' ' + 'event per person'}
          </li>
          <li className="flex flex-row items-center gap-2 font-semibold text-primaryColor">
            <CalendarX size={16} color="#ff8243" strokeWidth={2} /> Expired on{' '}
            {formatDate(tour?.registrationClosingDate)}
          </li>
        </ul>
        <span className="flex flex-row items-center gap-2 text-base text-red-600 font-bold">
          {(() => {
            const rawTime = tour?.expiredTimeLeft?.toLowerCase();
            const timeParts = rawTime?.split(' ') || [];
            const firstValue = Number(timeParts[0]);
            const firstUnit = timeParts[1];

            const isInvalid = !timeParts.length || isNaN(firstValue);
            const isExpired = firstValue === 0 && firstUnit === 'second';

            const shouldShow =
              !isInvalid &&
              !isExpired &&
              ((firstUnit === 'day' && firstValue < 6) ||
                (firstUnit !== 'day' && firstValue > 0));

            if (!shouldShow) {
              return (
                <div className="h-6 text-green-600 flex gap-2">
                  <AiOutlineFieldTime size={20} strokeWidth={3} className='mt-[3px]'/>{' '}
                  <span>Expired</span>
                </div>
              );
            }

            return (
              <div className="flex gap-3">
                <ClockAlert size={20} strokeWidth={3} /> {tour.expiredTimeLeft}
              </div>
            );
          })()}
        </span>
        {tour?.isRecruit ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            <p className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-green-600" />
              <span>Umpires can register</span>
            </p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            <p className="flex items-center gap-2 justify-center">
              {/* <UserPlus className="h-4 w-4 text-red-600" /> */}
              <span>No recruitment for this tournament</span>
            </p>
          </div>
        )}
        <span></span>
        <button className="w-full py-2 bg-gradient-orange rounded-lg text-white font-bold hover:bg-gradient-orange hover:bg-opacity-80 hover:shadow-shadowBtn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;
