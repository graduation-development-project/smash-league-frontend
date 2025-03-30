import { auth } from '@/auth';
import BecomeOrganizerForm from '@/components/general/organisms/auth/become.organizer.form';
import MainLayout from '@/components/layout/mainlayout/layout';
import React from 'react';

const BecomeOrganizer = async () => {
  const session = await auth();
  return (
    <>
      <MainLayout noHero={true} session={session}>
        <BecomeOrganizerForm />
      </MainLayout>
    </>
  );
};

export default BecomeOrganizer;
