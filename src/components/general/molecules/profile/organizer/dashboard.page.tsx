import React from 'react';
import DashboardOrganizer from './dashboard.organizer';
import TournamentsListTable from './tournaments-list.organizer.table';
import MenSinglesAthleteTable from './men-singles.athlete.table';
import WomenSinglesAthleteTable from './women-singles.athlete.table';
import WomenDoublesAthleteTable from './women-doubles.athlete.table';
import MixedDoublesAthleteTable from './mixed-doubles.athlete.table';
import UmpiresListTable from './umpires-list.organizer.table';
import MenDoublesAthleteTable from './men-doubles.athlete.table';

interface DashboardPageProps {
  selectedKey: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ selectedKey }) => {
  let eventName = selectedKey;

  let eventId = null;
  let verifications = false;

  if (selectedKey.includes('_')) {
    eventName = selectedKey.split('_').slice(0, 2).join('_');
    eventId = selectedKey.split('_')[4] || '';
    verifications = selectedKey.includes('verifications');
  }

  // console.log(eventName);

  switch (eventName) {
    case 'dashboard':
      return <DashboardOrganizer />;
    case 'tournaments':
      return <TournamentsListTable />;
    case 'MENS_SINGLE':
      return (
        <MenSinglesAthleteTable
          eventId={eventId}
          isVerification={verifications}
        />
      );
    case 'WOMENS_SINGLE':
      return (
        <WomenSinglesAthleteTable
          eventId={eventId}
          isVerification={verifications}
        />
      );
    case 'MENS_DOUBLE':
      return (
        <MenDoublesAthleteTable
          eventId={eventId}
          isVerification={verifications}
        />
      );
    case 'WOMENS_DOUBLE':
      return (
        <WomenDoublesAthleteTable
          eventId={eventId}
          isVerification={verifications}
        />
      );
    case 'MIXED_DOUBLE':
      return (
        <MixedDoublesAthleteTable
          eventId={eventId}
          isVerification={verifications}
        />
      );
    case 'umpires':
      return <UmpiresListTable />;
    default:
      return <DashboardOrganizer />;
  }
};

export default DashboardPage;
