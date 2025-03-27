import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import DetailsTourPage from '@/components/pages/tournaments/details.tour.page';
import React from 'react';

const DetailsTour = async () => {
  const session = await auth();
  return (
    <MainLayout noHero={true} session={session}>
      <div className="">
        <DetailsTourPage />
      </div>
    </MainLayout>
  );
};

export default DetailsTour;
