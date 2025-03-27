import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import SuccessPage from '@/components/pages/payment/success.page';

import React from 'react';

const Success = async () => {
  const session = await auth();
  return (
    <MainLayout noHero={true} session={session}>
      <SuccessPage />
    </MainLayout>
  );
};

export default Success;
