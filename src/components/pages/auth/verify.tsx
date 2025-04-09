'use client';

import VerifyForm from '@/components/general/organisms/auth/verify.form';
import MainLayout from '@/components/layout/mainlayout/layout';
import React from 'react';

const Verify = (props: any) => {
  const { email } = props;

  return (
    <MainLayout noHero={true}>
      <VerifyForm email={email} />
    </MainLayout>
  );
};

export default Verify;
