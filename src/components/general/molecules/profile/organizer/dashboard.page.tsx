import React from "react";
import DashboardOrganizer from "./dashboard.organizer";
import TournamentsListTable from "./tournaments-list.organizer.table";
import MenSinglesAthleteTable from "./men-singles.athlete.table";
import WomenSinglesAthleteTable from "./women-singles.athlete.table";
import WomenDoublesAthleteTable from "./women-doubles.athlete.table";
import MixedDoublesAthleteTable from "./mixed-doubles.athlete.table";
import UmpiresListTable from "./umpires-list.organizer.table";
import MenDoublesAthleteTable from "./men-doubles.athlete.table";

interface DashboardPageProps {
  selectedKey: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ selectedKey }) => {
  switch (selectedKey) {
    case "dashboard":
      return <DashboardOrganizer />;
    case "tournaments":
      return <TournamentsListTable />;
    case "men_single":
      return <MenSinglesAthleteTable />;
    case "women_single":
      return <WomenSinglesAthleteTable />;
    case "men_double":
      return <MenDoublesAthleteTable />;
    case "women_double":
      return <WomenDoublesAthleteTable />;
    case "mixed_double":
      return <MixedDoublesAthleteTable />;
    case "umpires":
      return <UmpiresListTable />;
    default:
      return <DashboardOrganizer />;
  }
};

export default DashboardPage;
