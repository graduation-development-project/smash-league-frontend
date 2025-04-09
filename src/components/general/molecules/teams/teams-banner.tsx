'use client';
import images from '@/assets/images';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateTeamsModal from './create-teams-modal';
import AlertCreateTeamsModal from './alert-create-teams-modal';
import { useProfileContext } from '@/context/profile.context';

const TeamsBanner = (props: any) => {
  const { session } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // console.log(role);

  return (
    <div className="w-full h-full relative">
      <div className="absolute z-0 w-full h-full rounded">
        <Image
          src={images.heroImage}
          alt="Hero Background"
          fill
          quality={100}
          priority
          className="object-cover"
        />
      </div>
      <div className="relative z-10 flex justify-between w-full h-full p-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-white text-[24px] font-quicksand font-bold">
            Struggling to Find Your Perfect Team?
          </h1>
          <p className="text-[14px] text-[#E8E8E8] font-quicksand max-w-[500px] break-words">
            Build your dream team today and embark on your journey to success!
            Assemble players who share your vision and style, and take your game
            to the next level.
          </p>
          <Button
            className="w-max px-4 py-2 flex justify-center items-center"
            onClick={showModal}
          >
            Create Your Team
          </Button>

          {user?.userRoles && user?.userRoles.includes('Athlete') ? (
            <CreateTeamsModal
              isModalOpen={isModalOpen}
              session={session}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="">
          <Image
            src={images.heroBadmintonImage}
            alt="Hero Badminton"
            width={400}
            height={400}
            className="ml-[-20px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default TeamsBanner;
