"use client";
import MainLayout from "../../layout/mainlayout/layout";
import FeaturedTournamentMain from "../../general/organisms/tournaments.main";


const HomePage = () => {
  return (
    // set theo role hiện layout

    <MainLayout>
      <div className="flex justify-center items-center min-h-[100vh] w-full">
        <FeaturedTournamentMain />
      </div>
    </MainLayout>
  );
};

export default HomePage;
