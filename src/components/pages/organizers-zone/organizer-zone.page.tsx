"use client";
import AllOrganizers from "@/components/general/organisms/organizers/all.organizers";
import { ConfigProvider, Tabs, TabsProps } from "antd";
import React from "react";

const OrganizersZonePage = (props: any) => {
  const { session } = props;
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "All Organizers",
      children: <AllOrganizers />,
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

export default OrganizersZonePage;
