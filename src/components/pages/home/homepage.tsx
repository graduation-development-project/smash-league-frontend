"use client";
import MainLayout from "../../layout/mainlayout/layout";
import FeaturedTournamentMain from "../../general/organisms/tournaments.main";
import { HomeContextProvider } from "@/library/home.context";
import OrganizerZone from "@/components/general/organisms/organizer.zone";

const HomePage = () => {
  return (
    // set theo role hiện layout

    <HomeContextProvider>
      <MainLayout>
        <div className="flex flex-col px-[20px]">
          <div className="flex flex-col gap-5 justify-center items-center h-max w-full mt-32">
            <FeaturedTournamentMain />
          </div>
          <OrganizerZone />
        </div>
      </MainLayout>
    </HomeContextProvider>
  );
};

export default HomePage;
