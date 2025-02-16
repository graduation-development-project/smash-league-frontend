import React from "react";
import SearchTeamBar from "../../molecules/teams/search-teams-bar";
import TeamCard from "../../atoms/teams/team-card";
import { ConfigProvider, Pagination } from "antd";
import TeamsBanner from "../../molecules/teams/teams-banner";

const AllTeams = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-20">
      <SearchTeamBar />

      {/* Centering Grid Items */}
      <div className="grid grid-cols-3 gap-x-1 gap-y-6  w-full place-items-center justify-items-center px-5">
        {Array.from({ length: 6}).map((_, index) => (
          <div key={index}>
            <TeamCard />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center bg-white w-max py-3 px-6 shadow-shadowComp rounded-[15px]">
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: "#FF8243",
              colorPrimaryBorder: "#FF8243",
              colorPrimaryHover: "#FF8243",
              fontWeightStrong: 700,
            },
          }}
        >
          <Pagination
            style={{ fontWeight: 600 }}
            size="default"
            total={12}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={5}
            defaultCurrent={1}
          />
        </ConfigProvider>
      </div>

      <TeamsBanner />
    </div>
  );
};

export default AllTeams;
