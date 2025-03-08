import { auth } from '@/auth';
import Footer from '@/components/layout/mainlayout/footer';
import Navigation from '@/components/layout/mainlayout/navigation';
import TeamLeaderProfilePage from '@/components/pages/profile/teamleader.profile.page';
import React from 'react';

const TeamLeaderProfile = async () => {
  const session = await auth();
  return (
    <>
      <div className="px-10 w-full bg-[#2c2c2c] z-20 shadow-lg rounded-[5px] fixed top-0 ">
        <Navigation session={session} />
      </div>
      <div className="mt-[70px] relative">
        <TeamLeaderProfilePage session={session} />
      </div>
      <Footer />
    </>
  );
};

export default TeamLeaderProfile;
