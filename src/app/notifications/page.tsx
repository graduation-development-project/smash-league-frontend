import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import NotificationsPage from '@/components/pages/notifications/notifications.page';
import React from 'react';

const Notifications = async () => {
  const session = await auth();

  return (
    <>
      <MainLayout session={session} noHero={true}>
        <div className='py-11 p-4'>
          <NotificationsPage />
        </div>
      </MainLayout>
    </>
  );
};

export default Notifications;
