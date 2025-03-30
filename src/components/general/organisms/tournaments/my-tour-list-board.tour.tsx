import React from 'react';
import TourRegistrationOfAthleteTable from '../../molecules/tournaments/tour-registration-athlete.tour.table';

const MyTourListBoard = ({ selectedKey }: { selectedKey: string }) => {
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
