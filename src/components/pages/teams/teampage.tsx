"use client";
import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import AllTeams from "@/components/general/organisms/teams/all-teams";
import MyTeams from "@/components/general/organisms/teams/my-teams";
// import "./styles.css";
import ParticipatedTournamentsOfTeams from "../../general/organisms/teams/participated-tournaments";
import { useSession } from "next-auth/react";
const TeamPage = (props: any) => {
  const { session } = props;
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ALL TEAMS",
      children: <AllTeams />,
    },
    ...(session?.user
      ? [
          {
            key: "2",
            label: "MY TEAMS",
            children: <MyTeams />,
          },
          {
            key: "3",
            label: "PARTICIPATED TOURNAMENTS",
            children: <ParticipatedTournamentsOfTeams />,
          },
        ]
      : []),
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            /* here is your component tokens */
            itemColor: "#000000",
            itemSelectedColor: "#FF8243",
            inkBarColor: "#FF8243",
            itemHoverColor: "#FF8243",
            itemActiveColor: "#FF8243",
            horizontalItemPaddingLG: "0px 0px 16px 0px",
          },
        },
      }}
    >
      <Tabs
        tabBarStyle={{
          width: "100%",
          fontWeight: 600,
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          marginTop: 150,
          fontFamily: "inherit",
        }}
        style={{ width: "100%", fontFamily: "inherit" }}
        size="large"
        centered
        tabBarGutter={60}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default TeamPage;
