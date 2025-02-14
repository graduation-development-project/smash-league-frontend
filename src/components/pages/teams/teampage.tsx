"use client";
import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import AllTeams from "@/components/general/organisms/teams/all-teams";
// import "./styles.css";
const TeamPage = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ALL TEAMS",
      children: <AllTeams />,
    },
    {
      key: "2",
      label: "YOUR TEAMS",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "MEMBERS",
      children: (
        <div className="w-full flex flex-col items-center ">
          Content of tab Pane 3
        </div>
      ),
    },
    {
      key: "4",
      label: "TOURNAMENTS",
      children: "Content of Tab Pane 4",
    },
    {
      key: "5",
      label: "PARTICIPATED TEAMS",
      children: "Content of Tab Pane 5",
    },
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
          fontWeight: 500,
          fontFamily: "Quicksand ,sans-serif",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        style={{ width: "100%" }}
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
