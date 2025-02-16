"use client";
import MainLayout from "../../layout/mainlayout/layout";
import FeaturedTournamentMain from "../../general/organisms/tournaments.main";
import TourCardSliderMain from "@/components/general/atoms/tour.card.slider.main";
import { HomeContextProvider } from "@/library/home.context";
import OrganizerZone from "@/components/general/organisms/organizer.zone";
import NewsBulletinMain from "@/components/general/organisms/news.main";
import WelcomeIntroMain from "@/components/general/organisms/welcome.main";
import BannerMain from "@/components/general/organisms/banner.main";
import StandingBoardMain from "@/components/general/organisms/standing.board.main";

const HomePage = () => {
  return (
    // set theo role hiện layout

    <HomeContextProvider>
      {/* <MainLayout> */}
        <div className="flex flex-col gap-20">
          <div className="">
            <WelcomeIntroMain />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center h-max w-full">
            <FeaturedTournamentMain />
          </div>
          <div className="flex flex-col items-center h-max w-full">
            <BannerMain />
          </div>
          <div className="flex flex-col items-center h-max w-full">
            <NewsBulletinMain />
          </div>
          <div className="flex flex-col items-center h-max w-full">
            <OrganizerZone />
          </div>
          <div className="flex flex-col items-center h-max w-full">
            <StandingBoardMain />
          </div>
           
        </div>
      {/* </MainLayout> */}
    </HomeContextProvider>

  );
};

export default HomePage;
