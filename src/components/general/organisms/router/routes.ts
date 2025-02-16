import HomePage from "@/components/pages/home/homepage";
import TeamPage from "@/components/pages/teams/teampage";

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
    }
]