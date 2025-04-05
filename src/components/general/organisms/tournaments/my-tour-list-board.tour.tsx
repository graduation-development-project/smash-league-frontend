import React from 'react';
import TourRegistrationOfAthleteTable from '../../molecules/tournaments/tour-registration-athlete.tour.table';
import MatchesOfUmpireTable from '../../molecules/tournaments/matches-of-umpire.table';

const MyTourListBoard = ({ selectedKey }: { selectedKey: string }) => {
  const tournamentId = selectedKey.split('_')[1];
  // console.log("Check selected key", selectedKey);
  console.log('Check tournament id', tournamentId);

  if (selectedKey.includes('umpires')) {
    return <MatchesOfUmpireTable tournamentId={tournamentId} />;
  }
  switch (selectedKey) {
    case 'all-tournaments':
      return <div>All-tournaments</div>;
    case 'my-series':
      return <div>My Series</div>;
    case 'tour-registration':
      return <TourRegistrationOfAthleteTable />;
    default:
      return <div>All Tournaments</div>;
  }
};

export default MyTourListBoard;
