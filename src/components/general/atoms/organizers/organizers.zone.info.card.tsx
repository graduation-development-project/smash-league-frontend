/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { Image } from 'antd';
import React from 'react';
import { GoPeople } from 'react-icons/go';
import { TbTournament } from 'react-icons/tb';
import { FaLocationDot } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useProfileContext } from '@/context/profile.context';

const OrganizersZoneInfoCard = ({ organizer }: { organizer: any }) => {
  const router = useRouter();
  const { organizerId, setOrganizerId } = useProfileContext();

  return (
    <div
      className="w-max h-max flex flex-col gap-3 p-5 rounded-[10px] bg-white border border-solid border-gray-400 transition-all ease-in-out cursor-pointer hover:shadow-shadowComp hover:border-none hover:outline-none"
      onClick={() => {
        router.push(`/profile/organizer/${organizer?.name}`);
        setOrganizerId(organizer?.id);
      }}
    >
      <div className="w-full">
        <Image
          src="https://i.pinimg.com/736x/44/cc/f5/44ccf596eb7e3552059b5c53d3986682.jpg"
          alt="Organizer Image"
          width={250}
          height={150}
          className="object-cover rounded-[5px]"
        />
      </div>
      <div className="w-full h-full flex flex-col gap-2">
        <h2 className="text-[22px] font-bold ">{organizer?.name}</h2>
        <p className=" items-center gap-1 text-[16px] hidden">
          <GoPeople /> 50 Followers
        </p>
        <p className="flex items-center gap-1 text-[16px] italic">
          <TbTournament />
          {organizer?.email}
        </p>
        <p className="flex items-center gap-1 text-[16px]">
          <FaLocationDot />
          {organizer?.location ? organizer?.location : 'No infomation'}
        </p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Button
          size={'sm'}
          className="w-full"
          onClick={() => {
            router.push(`/profile/organizer/organizer-name`);
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default OrganizersZoneInfoCard;
