import { auth } from "@/auth";
import Footer from "@/components/layout/mainlayout/footer";
import MainLayout from "@/components/layout/mainlayout/layout";
import Navigation from "@/components/layout/mainlayout/navigation";
import TeamDetailsPage from "@/components/pages/teams/team.details.page";
import { TeamsContextProvider } from "@/library/teams.context";

import React from "react";

const TeamDetails = async () => {
  const session = await auth();
  return (
    <>
      <div className="px-10 w-full bg-[#2c2c2c] z-20 shadow-lg rounded-[5px] fixed">
        <Navigation session={session} />
      </div>
      <div className="px-24">
        <TeamsContextProvider>
          <TeamDetailsPage session={session} />
        </TeamsContextProvider>
      </div>
      <Footer />
    </>
  );
};

export default TeamDetails;
