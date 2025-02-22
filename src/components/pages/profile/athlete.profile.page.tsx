/* eslint-disable @next/next/no-img-element */

"use client";
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd";
import React from "react";

const AthleteProfilePage = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: "Content of Overview",
    },
    {
      key: "2",
      label: "Tournaments",
      children: "Content of Tournaments",
    },
    {
      key: "3",
      label: "Ranking",
      children: "Content of Ranking",
    },
  ];

  return (
    <div className="w-full h-full relative z-0 shadow-shadowComp rounded-[5px]">
      <div className="w-full h-full relative z-0">
        <img
          src="https://assets.challonge.com/assets/community_default_banners/default-cover-3-redesign-2693250cf849ef7bcd3975c81ca64c06e6bdffd39d47ae0c454fd0d6e0006fb4.svg"
          alt=""
          className="w-full h-[300px] object-cover rounded-[5px]"
        />

        <div className="absolute z-10 w-full h-full flex items-center top-0 pl-10">
          <div className="flex items-center justify-center gap-4">
            <Avatar
              style={{ border: "3px solid #FF8243" }}
              size={200}
              src="https://thebridge.in/h-upload/uid/1WBjBeRGUTAFdtLSbygdVctMuxxkfATBS2658560.jpg"
            />
            <div>
              <h1 className="text-white text-[32px] font-bold">HO DUONG TRUNG NGUYEN</h1>
              <div className="text-white text-[14px] italic font-semibold">trungnguyen2734@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center relative z-20 ">
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
            items={items}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AthleteProfilePage;
