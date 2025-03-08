"use client";

import React, { useState } from "react";
import PaginationCard from "../../atoms/pagination/pagination-card";
import { ConfigProvider, Empty, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TeamMemberCard from "../../atoms/teams/team-member-card";
import EmptyCard from "../../molecules/empty/empty.card";

const MembersTeamsDetails = () => {
  const [isMembers, setIsMembers] = useState(true);

  const handleChange = () => {

  }
  return (
    <>
      {isMembers ? (
        <div className="w-full h-full flex flex-col items-center gap-5 p-5">
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
                    style={{
                      fontSize: 20,
                      color: "#FF8243",
                      fontWeight: "bold",
                    }}
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

          <PaginationCard total={12} currentPage={1} totalPerPage={6}  onChange={handleChange}/>
        </div>
      ) : (
        <EmptyCard
          description="No members found"
          image="https://static.thenounproject.com/png/88030-200.png"
        />
      )}
    </>
  );
};

export default MembersTeamsDetails;
