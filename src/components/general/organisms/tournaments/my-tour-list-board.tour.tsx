import React from 'react';
import TourRegistrationOfAthleteTable from '../../molecules/tournaments/tour-registration-athlete.tour.table';
import MatchesOfUmpireTable from '../../molecules/tournaments/matches-of-umpire.table';
import CalendarPage from '@/components/pages/calendar/calendar.page';
import MyParticipatedTournaments from '../../molecules/tournaments/my-participated-tournaments';
import ReportsTable from '../reports/reports.table';

const MyTourListBoard = ({
  selectedKey,
  profileRole,
}: {
  selectedKey: string;
  profileRole: string;
}) => {
  const tournamentId = selectedKey.split('_')[1];
  // console.log("Check selected key", selectedKey);
  console.log('Check tournament id', tournamentId);

  if (selectedKey.includes('umpires')) {
    return <MatchesOfUmpireTable tournamentId={tournamentId} />;
  }
  switch (selectedKey) {
    case 'all-tournaments':
      return <MyParticipatedTournaments />;
    case 'my-series':
      return <div>My Series</div>;
    case 'tour-registration':
      return <TourRegistrationOfAthleteTable profileRole={profileRole} />;
    case 'my-schedule':
      return <CalendarPage profileRole={profileRole} />;
    case 'my-reports':
      return <ReportsTable profileRole={profileRole} />;
    default:
      return <TourRegistrationOfAthleteTable profileRole={profileRole} />;
  }
};

export default MyTourListBoard;
