"use client";
import MainLayout from "../../layout/mainlayout/layout";
import FeaturedTournamentMain from "../../general/organisms/tournaments.main";
import TourCardSliderMain from "@/components/general/atoms/tour.card.slider.main";
import { HomeContextProvider } from "@/library/home.context";

const HomePage = () => {
  return (
    // set theo role hiện layout

    <HomeContextProvider>
      <MainLayout>
        <div className="flex flex-col gap-5 justify-center items-center h-screen w-full">
          <FeaturedTournamentMain />

          {/* <TourCardSliderMain /> */}
        </div>
      </MainLayout>
    </HomeContextProvider>
  );
};

export default HomePage;
