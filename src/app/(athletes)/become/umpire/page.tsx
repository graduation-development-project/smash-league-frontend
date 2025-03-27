import { auth } from '@/auth';
import BecomeUmpireForm from '@/components/general/organisms/auth/become.umpire.form';
import MainLayout from '@/components/layout/mainlayout/layout';
import React from 'react';

const BecomeUmpire = async () => {
  const session = await auth();

  return (
    <>
      <MainLayout noHero={true} session={session}>
        <BecomeUmpireForm />
      </MainLayout>
    </>
  );
};

export default BecomeUmpire;
