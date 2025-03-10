import HomePage from "@/components/pages/home/homepage";
import OrganizersZonePage from "@/components/pages/organizers-zone/organizer-zone.page";
import TeamPage from "@/components/pages/teams/teampage";
import TournamentPage from "@/components/pages/tournaments/tournament.page";

export const routes = [
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamPage,
  },
  {
    path: "/tournaments",
    name: "Tournaments",
    component: TournamentPage,
  },
  {
    path: "/organizers-zone",
    name: "Organizers Zone",
    component: OrganizersZonePage,
  },
];
