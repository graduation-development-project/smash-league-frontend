import { auth } from '@/auth';
import Footer from '@/components/layout/mainlayout/footer';
import Navigation from '@/components/layout/mainlayout/navigation';
import PackagePage from '@/components/pages/packages/package.show.page';
import React from 'react';

const Package = async () => {
  const session = await auth();
  return (
    <>
      <div className="px-10 w-full bg-[#2c2c2c] z-20 shadow-lg rounded-[5px] fixed top-0 ">
        <Navigation session={session} />
      </div>
      <div className="mt-28 px-10 relative">
        <PackagePage />
      </div>
      <Footer />
    </>
  );
};

export default Package;
