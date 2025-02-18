import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Pagination } from "antd";
import Input from "antd/es/input/Input";
import React from "react";
import TeamMemberCard from "../../atoms/teams/team-member-card";

const TeamsMember = ({ team }: TeamProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <div className="w-1/4">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                /* here is your component tokens */
                activeBorderColor: "#FF8243",
                activeShadow: "0 0 0 2px #fffff",
                hoverBorderColor: "#FF8243",
              },
            },
          }}
        >
          <Input
            size="large"
            variant="outlined"
            placeholder="Find the member"
            suffix={
              <SearchOutlined
                style={{ fontSize: 20, color: "#FF8243", fontWeight: "bold" }}
              />
            }
          />
        </ConfigProvider>
      </div>

      <div className="grid grid-cols-4 gap-x-8 gap-y-6 place-items-center justify-items-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <TeamMemberCard />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center bg-white w-max py-3 px-6 rounded-[15px]">
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
    </div>
  );
};

export default TeamsMember;
