import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import FailPage from '@/components/pages/payment/fail.page';

import React from 'react';

const Fail = async () => {
  const session = await auth();
  return (
    <MainLayout noHero={true} session={session}>
      <FailPage />
    </MainLayout>
  );
};

export default Fail;
