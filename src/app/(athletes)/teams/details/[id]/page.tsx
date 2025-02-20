"use client";

import Footer from "@/components/layout/mainlayout/footer";
import MainLayout from "@/components/layout/mainlayout/layout";
import TeamDetailsPage from "@/components/pages/teams/team.details.page";
import { TeamsContextProvider } from "@/library/teams.context";

import React from "react";

const TeamDetails = () => {
  return (
    // <MainLayout>
    <>
      <div className="px-[100px]">
        <TeamsContextProvider>
          <TeamDetailsPage />
        </TeamsContextProvider>
      </div>
      <Footer />
    </>
    // </MainLayout>
  );
};

export default TeamDetails;
