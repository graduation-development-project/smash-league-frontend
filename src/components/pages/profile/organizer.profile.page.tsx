/* eslint-disable @next/next/no-img-element */
"use client";

import OverviewOrganizerProfile from "@/components/general/organisms/profile/organizer/overview.oganizer.profile";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profile.context";
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd";
import React from "react";
import TournamentsOrganizerProfile from "../../general/organisms/profile/organizer/tournaments.organizer.profile";
import AnnouncementsOrganizerProfile from "@/components/general/organisms/profile/organizer/announcements.organizer.profile";
import DashboardOrganizerProfile from "@/components/general/organisms/profile/organizer/dashboard.organizers.profile";

const OrganizerProfilePage = (props: any) => {
  const { session } = props;
  const { organizerId, activeKey, setActiveKey } = useProfileContext();

  console.log("organizerId", organizerId);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <OverviewOrganizerProfile />,
    },
    {
      key: "2",
      label: "Announcements",
      children: <AnnouncementsOrganizerProfile />,
    },
    {
      key: "3",
      label: "Tournaments",
      children: <TournamentsOrganizerProfile />,
    },
    {
      key: "4",
      label: "Events",
      children: "Content of Events",
    },

    {
      key: "5",
      label: "Dashboard",
      children: <DashboardOrganizerProfile />,
    },

    {
      key: "6",
      label: "Update Information",
      children: "Content of Update Information",
    },
  ];

  return (
    <div className="w-full h-full relative z-0 shadow-shadowComp rounded-[5px]">
      <img
        src="https://assets.challonge.com/assets/community_default_banners/default-cover-3-redesign-2693250cf849ef7bcd3975c81ca64c06e6bdffd39d47ae0c454fd0d6e0006fb4.svg"
        alt=""
        className="w-full h-[300px] object-cover rounded-[5px]"
      />

      <div className="w-full h-full flex flex-col items-center relative z-20 ">
        <div className="w-1/2 h-full flex justify-between items-center px-6 mt-2 ">
          {" "}
          <div className="flex flex-col">
            <h1 className="text-[24px] font-bold">Organizer Name</h1>
            <div className="text-[14px] text-slate-400 italic">
              <p>organizers@gmail.com</p>
            </div>
          </div>
          <Button size={"sm"}>Follow</Button>
        </div>
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
              // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              marginTop: 30,
              fontFamily: "inherit",
            }}
            style={{ width: "100%", fontFamily: "inherit" }}
            size="large"
            centered
            tabBarGutter={60}
            defaultActiveKey="1"
            activeKey={activeKey}
            items={items}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
      <div className="w-max h-max absolute z-10 bottom-0 left-48 top-60">
        <Avatar
          shape="square"
          size={135}
          style={{
            backgroundColor: "#FF8243",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          M
        </Avatar>
      </div>
    </div>
  );
};

export default OrganizerProfilePage;
