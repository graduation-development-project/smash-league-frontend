import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import FailPage from '@/components/pages/payment/fail.page';
import React from 'react';


/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Asynchronously fetches the current authentication session and renders the FailPage component
 * within the MainLayout. The layout does not include a hero section.
 * 
 * @returns {JSX.Element} - The rendered FailPage component wrapped in the MainLayout.
 */

/*******  f947fcd3-f811-44c7-bf55-a2769a32449d  *******/const Fail = async () => {
  const session = await auth();
  return (
    <MainLayout noHero={true} session={session}>
      <FailPage />
    </MainLayout>
  );
};

export default Fail;
