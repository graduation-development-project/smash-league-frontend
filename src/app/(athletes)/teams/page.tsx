import { auth } from "@/auth";
import MainLayout from "@/components/layout/mainlayout/layout";
import TeamPage from "@/components/pages/teams/teampage";
import React from "react";

const Team = async () => {
  const session = await auth();

  return (
    <MainLayout session={session}>
      <div>
        <TeamPage />
      </div>
    </MainLayout>
  );
};

export default Team;
