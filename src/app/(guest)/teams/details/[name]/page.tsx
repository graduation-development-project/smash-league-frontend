import { auth } from '@/auth';
import Footer from '@/components/layout/mainlayout/footer';
import MainLayout from '@/components/layout/mainlayout/layout';
import Navigation from '@/components/layout/mainlayout/navigation';
import TeamDetailsPage from '@/components/pages/teams/team.details.page';
import { TeamsContextProvider } from '@/library/teams.context';

import React from 'react';

const TeamDetails = async () => {
  const session = await auth();
  return (
    <>
      <MainLayout noHero={true} session={session}>
        <div className="px-24">
          <TeamDetailsPage session={session} />
        </div>
      </MainLayout>
    </>
  );
};

export default TeamDetails;
