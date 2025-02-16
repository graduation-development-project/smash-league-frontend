import HomePage from "@/components/pages/home/homepage";
import TeamPage from "@/components/pages/teams/teampage";
import TournamentPage from "@/components/pages/tournaments/tournament.page";

export const routes = [
    {
        path: '/',
        name: 'Home',
        component : HomePage
    },
    {
        path: "/teams",
        name: "Teams",
        component: TeamPage
    },
    {
        path: '/tournaments',
        name: 'Tournaments',
        component: TournamentPage
    }
]