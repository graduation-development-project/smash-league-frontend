/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { FaLocationDot, FaRegCalendar } from 'react-icons/fa6';
import { FaRegClock, FaUserCircle } from 'react-icons/fa';
import { HiMiniTrophy } from 'react-icons/hi2';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';
import { MdReportGmailerrorred } from 'react-icons/md';
import { GrAttachment } from 'react-icons/gr';
import {
  formatDate,
  formatDateTime,
  formatMoney,
  formatOccurDate,
  formatTime,
} from '@/utils/format';
import { ATTACHMENTS_ENUM } from '@/utils/enum';
import { Divide } from 'lucide-react';
import { Card, Divider, Image } from 'antd';

const InfoDetailsTour = ({
  tour,
  isOrganizer,
}: {
  tour: any;
  isOrganizer: boolean;
}) => {
  const styleCard = 'w-full flex py-5 px-8 border rounded-md';
  const color = tour?.mainColor.includes('#') ? tour?.mainColor : '#FF8243';
  const textColor = '#FF8243';
  // const bgColor = `bg-[${color}]` || "bg-[#FF8243]";
  // console.log(tour);

  const titleCard = (title: string) => {
    return (
      <h3 className="text-2xl font-bold ">
        {title}
        <div
          className={`w-24 h-1  rounded-full`}
          style={{ backgroundColor: `${color}` }}
        />
      </h3>
    );
  };

  return (
    <div className="w-full h-max flex flex-col gap-5 p-3">
      <div
        className={`w-full flex py-4 px-8 rounded-md  justify-between items-center text-2xl  `}
        style={{ backgroundColor: `${color}`, color: `${textColor}` }}
      >
        <h3 className="font-bold text-white">
          {tour?.tournamentSerie?.tournamentSerieName}
        </h3>
        <Button size={'sm'} colorBtn={'whiteBtn'}>
          View series
        </Button>
      </div>
      <div className={`${styleCard} flex-col gap-7 text-base `}>
        {titleCard('Basic Info')}
        <div className="w-full flex flex-row justify-between">
          <div className="w-full flex gap-8">
            <ul className=" flex flex-col gap-2 font-semibold">
              <li className="flex gap-2 items-center">
                <FaLocationDot color={`${color}`} size={18} />
                Location
              </li>
              <li className="flex gap-2 items-center ">
                <FaRegCalendar color={`${color}`} size={18} />
                Occur Date
              </li>
              <li className="flex gap-2 items-center">
                <FaUserCircle color={`${color}`} size={18} />
                Host
              </li>
              <li className="flex gap-2 items-center">
                <FaRegClock color={`${color}`} size={18} />
                Date left
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li>{tour?.location}</li>
              <li className="font-semibold">
                {formatOccurDate(tour?.startDate, tour?.endDate)}
              </li>
              <li>{tour?.organizer?.name}</li>
              <li className="text-[red] font-semibold">
                {tour?.expiredTimeLeft}
              </li>
            </ul>
          </div>
          {/* <div className='h-40 w-[2px] rounded-full' style={{ backgroundColor: `${color}`,}} /> */}
          <Card>
            <div className="w-max flex gap-5">
              <div className="rounded-full">
                <Image
                  style={{
                    borderRadius: '20px',
                    objectFit: 'contain',
                  }}
                  width={100}
                  height={100}
                  src={
                    tour?.organizer?.avatarURL
                      ? tour?.organizer?.avatarURL
                      : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                  }
                  alt="Organizer Avatar"
                />
              </div>
              <ul className="flex flex-col gap-2 font-semibold">
                <li className="flex gap-2 items-center">
                  <FaUserCircle color={`${color}`} size={18} />
                  Host
                </li>
                <li className="flex gap-2 items-center">
                  <FaLocationDot color={`${color}`} size={18} />
                  Contact Phone
                </li>
                <li className="flex gap-2 items-center">
                  <FaRegCalendar color={`${color}`} size={18} />
                  Contact Email
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li>{tour?.organizer?.name}</li>
                <li>{tour?.contactPhone}</li>
                <li>{tour?.contactEmail}</li>
              </ul>
            </div>
          </Card>
        </div>
        <div className="w-max flex py-2 px-8 gap-2 items-center bg-gradient-orange rounded-full text-white font-bold ">
          <HiMiniTrophy color="#f3c900" size={25} />
          Prize Pool : {formatMoney(tour?.prizePool)}
        </div>
      </div>

      <div className={`${styleCard} flex-col gap-4 text-base `}>
        {titleCard('Registration & Fee')}
        <div className="flex gap-5">
          <ul className="flex flex-col gap-2 font-semibold">
            <li className="flex gap-2 items-center">
              <FaRegCalendar color={`${color}`} size={18} />
              Registration Date
            </li>
            <li className="flex gap-2 items-center">
              <AiOutlineFieldNumber color={`${color}`} size={21} />
              Number of events each person can register
            </li>
            <li className="flex gap-2 items-center">
              <HiOutlineUser color={`${color}`} size={19} />
              Registration Fee for Individual
            </li>
            <li className="flex gap-2 items-center">
              <HiOutlineUsers color={`${color}`} size={19} />
              Registration Fee for Pair
            </li>
            <li className="flex gap-2 items-center">
              <MdReportGmailerrorred color={`${color}`} size={20} />
              Protest Fee
            </li>
            <li className="flex gap-2 items-center">
              <GrAttachment color={`${color}`} size={17} />
              Required Attachments
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              {formatOccurDate(
                tour?.registrationOpeningDate,
                tour?.registrationClosingDate,
              )}
            </li>
            <li>{tour?.maxEventPerPerson} event(s) / person</li>
            <li>{formatMoney(tour?.registrationFeePerPerson)}</li>
            <li>{formatMoney(tour?.registrationFeePerPair)}</li>
            <li>{formatMoney(tour?.protestFeePerTime)} / time</li>
            <li>
              {tour?.requiredAttachments?.map(
                (attach: string) =>
                  `${ATTACHMENTS_ENUM[attach as keyof typeof ATTACHMENTS_ENUM]
                  } `,
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styleCard} flex-col gap-4 text-base `}>
        {titleCard('Schedule & Matches')}
        <div className="flex gap-5">
          <ul className="flex flex-col gap-2 font-semibold">
            <li className="flex gap-2 items-center">
              <FaRegCalendar color={`${color}`} size={18} />
              Draw Date
            </li>
            <li className="flex gap-2 items-center">
              <FaRegClock color={`${color}`} size={18} />
              Check in Before
            </li>
            <li className="flex gap-2 items-center">
              <FaRegCalendar color={`${color}`} size={18} />
              Registration Fee for Pair
            </li>
            <li className="flex gap-2 items-center">
              <FaRegCalendar color={`${color}`} size={18} />
              Number of events each person can register
            </li>
            <li className="flex gap-2 items-center">
              <FaRegCalendar color={`${color}`} size={18} />
              Protest Fee
            </li>
            <li className="flex gap-2 items-center">
              <FaRegCalendar color={`${color}`} size={18} />
              Required Attachments
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>{formatDateTime(tour?.drawDate)}</li>
            <li>{formatTime(tour?.checkInBeforeStart)}</li>

            <li>{formatMoney(tour?.registrationFeePerPair)}</li>
            <li>{tour?.maxEventPerPerson} event(s) / person</li>
            <li>{formatMoney(tour?.protestFeePerTime)} / time</li>
            <li>
              {tour?.requiredAttachments?.map(
                (attach: string) =>
                  `${ATTACHMENTS_ENUM[attach as keyof typeof ATTACHMENTS_ENUM]
                  }, `,
              )}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${styleCard} flex-col gap-4 text-base `}
        style={{ display: tour?.introduction ? 'block' : 'none' }}
      >
        {titleCard('Introduction')}
        <p>{tour?.introduction}</p>
        {/* <p>
                    <b>🏸 Welcome to the 2025 Summer Open Badminton Tournament!</b><br />
                    🏸 Experience the Thrill of Summer Badminton! ☀️
                    <br />
                    Get ready for an exciting and competitive badminton tournament this summer!
                    <br />
                    The 2025 Summer Open invites players of all skill levels to showcase their talent, compete with top athletes, and enjoy the electrifying atmosphere of one of the most anticipated badminton events of the year.
                </p> */}
      </div>
      <div className={`${styleCard} flex-col gap-4 text-base `}>
        {titleCard('Description')}
        <p>{tour?.description}</p>
      </div>
      <div
        className={`${styleCard} flex-col gap-4 text-base `}
        style={{ display: tour?.hasMerchandise ? 'block' : 'none' }}
      >
        {titleCard('Merchandise')}
        <p>{tour?.description}</p>
        <div>
          <img
            src=""
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default InfoDetailsTour;
