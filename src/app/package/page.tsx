import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import PackagePage from '@/components/pages/packages/package.show.page';
import React from 'react';

const Package = async () => {
  const session = await auth();
  return (
    <>
      <MainLayout noHero={true} session={session}>
        <PackagePage />
      </MainLayout>
    </>
  );
};

export default Package;
