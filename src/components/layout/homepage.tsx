"use client";

import { Result } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import MainLayout from "./mainlayout/layout";
import FeaturedTournamentMain from "../organisms/tournaments.main";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[100vh] w-full">
        {/* <Result
          icon={<CrownOutlined />}
          title="Smash League Project - createdBy @smashleague"
        /> */}

        <FeaturedTournamentMain />
      </div>
    </MainLayout>
  );
};

export default HomePage;
