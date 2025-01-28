"use client";
import MainLayout from "../../layout/mainlayout/layout";
import FeaturedTournamentMain from "../../general/organisms/tournaments.main";
import NewsCard from "@/components/general/molecules/news.card";
import NewsBulletinMain from "@/components/general/organisms/news.main";


const HomePage = () => {
  return (
    // set theo role hiện layout

    <MainLayout>
      <div className="flex flex-col gap-[100px] justify-center items-center min-h-[100vh] w-full">
        <FeaturedTournamentMain />
        <NewsBulletinMain />
      </div>
    </MainLayout>
  );
};

export default HomePage;
