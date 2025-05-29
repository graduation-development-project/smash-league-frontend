import React from 'react';
import DashboardOrganizer from './dashboard.organizer';
import TournamentsListTable from './tournaments-list.organizer.table';
import MenSinglesAthleteTable from './men-singles.athlete.table';
import WomenSinglesAthleteTable from './women-singles.athlete.table';
import WomenDoublesAthleteTable from './women-doubles.athlete.table';
import MixedDoublesAthleteTable from './mixed-doubles.athlete.table';
import UmpiresListTable from './umpires-list.organizer.table';
import MenDoublesAthleteTable from './men-doubles.athlete.table';
import ReportsTable from '@/components/general/organisms/reports/reports.table';

interface DashboardPageProps {
  selectedKey: string;
  credit: number | null;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  selectedKey,
  credit,
}) => {
  let eventName = selectedKey;

  let eventId = null;
  let verifications = false;
  let tourId = null;
  let tournamentId = null;

  if (selectedKey.includes('_')) {
    eventName = selectedKey.split('_').slice(0, 2).join('_');
    eventId = selectedKey.split('_')[4] || '';
    tournamentId = selectedKey.split('_')[5];
    verifications = selectedKey.includes('verifications');
    tourId =
      selectedKey
        .split('_')
        .filter((part) => part !== 'umpires')
        .join('_') || '';
  }
  

  if (selectedKey.includes('umpires')) {
    return <UmpiresListTable tourId={tourId} />;
  }

  switch (eventName) {
    case 'dashboard':
      return <DashboardOrganizer credit={credit} />;
    case 'athletes':
      return <TournamentsListTable />;
    case 'reports':
      return <ReportsTable profileRole="ORGANIZER" />;
    case 'MENS_SINGLE':
      return <MenSinglesAthleteTable eventId={eventId} tournamentId = {tournamentId}/>;
    case 'WOMENS_SINGLE':
      return <WomenSinglesAthleteTable eventId={eventId} tournamentId = {tournamentId}/>;
    case 'MENS_DOUBLE':
      return <MenDoublesAthleteTable eventId={eventId} tournamentId = {tournamentId}/>;
    case 'WOMENS_DOUBLE':
      return <WomenDoublesAthleteTable eventId={eventId} tournamentId = {tournamentId}/>;
    case 'MIXED_DOUBLE':
      return <MixedDoublesAthleteTable eventId={eventId} tournamentId = {tournamentId}/>;
    default:
      return <DashboardOrganizer credit={credit} />;
  }
};

export default DashboardPage;
