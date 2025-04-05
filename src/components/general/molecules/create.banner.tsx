'use client';

import images from '@/assets/images';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import CreateTeamsModal from './teams/create-teams-modal';
import AlertCreateTeamsModal from './teams/alert-create-teams-modal';
import { useRouter } from 'next/navigation';

const CreateBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [role, setRole] = useState('Organizer');

  const onClickCreateTour = () => {
    role === 'Organizer' ? (
      router.push('/tournaments/create')
    ) : (
      <AlertCreateTeamsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        message="You are not authorized to register as organizer"
        description="Please register as an organizer."
        linkText="Become an Organizer"
        path="/become/organizer"
      />
    );
  };

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
      <div className="relative z-10 flex justify-between w-full h-full py-10 px-28">
        <div className="flex flex-col justify-between">
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
            onClick={onClickCreateTour}
          >
            Create Your Own Tournament
          </Button>
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

export default CreateBanner;
