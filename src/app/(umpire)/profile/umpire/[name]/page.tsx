
import React from 'react'
import { auth } from '@/auth';
import { Footer } from 'antd/es/layout/layout';
import Navigation from '@/components/layout/mainlayout/navigation';
import UmpireProfilePage from '@/components/pages/profile/umpire.profile.page';

const UmpireProfile = async () => {
    const session = await auth();
    return (
      <>
        <div className="px-10 w-full bg-[#2c2c2c] z-20 shadow-lg rounded-[5px] fixed top-0 ">
          <Navigation session={session} />
        </div>
        <div className="mt-[70px] relative">
          <UmpireProfilePage session={session} />
        </div>
        <Footer />
      </>
    );
}

export default UmpireProfile
