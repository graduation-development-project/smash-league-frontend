"use client";

import React, { useState } from "react";

import type { MenuProps } from "antd";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { RiArrowLeftSLine } from "react-icons/ri";
import { TbTournament } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TfiBarChartAlt } from "react-icons/tfi";
import DashboardPage from "@/components/general/molecules/profile/organizer/dashboard.page";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "dashboard", <TfiBarChartAlt size={15} />),
  getItem("Tournaments", "tournaments", <TbTournament size={15} />),
  getItem("Athletes", "sub1", <GrGroup size={15} />, [
    getItem("Men's Singles", "men_single"),
    getItem("Women's Singles", "women_single"),
    getItem("Men's Doubles", "men_double"),
    getItem("Women's Doubles", "women_double"),
    getItem("Mixed Doubles", "mixed_double"),
  ]),
  getItem("Umpires", "umpires", <HiOutlineUserGroup size={15} />),
];
const DashboardOrganizerProfile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  return (
    <Layout
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "10px 20px",
        display: "flex",
        gap: "10px",
        fontFamily: "inherit",
      }}
    >
      <div className="flex flex-col p-3 bg-white shadow-shadowComp rounded-[5px]">
        <div
          className="text-[16px] font-bold flex justify-center items-center rounded-[5px] p-2 bg-white border border-gray-200"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <RiArrowLeftSLine
            className={`${
              collapsed ? "rotate-180" : ""
            } hover:text-primaryColor transition-all duration-300 ease-in-out`}
          />
        </div>

        <Sider
          collapsed={collapsed}
          onCollapse={(collapsed: boolean) => setCollapsed(collapsed)}
          style={{
            width: "100%",
            height: "100%",
            background: "white",
            fontFamily: "inherit",
          }}
        >
          <div className="demo-logo-vertical" />
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  /* here is your component tokens */
                  darkItemBg: "white",
                  darkItemColor: "black",
                  darkItemSelectedColor: "#FF8243",
                  darkItemHoverColor: "#FF8243",
                  darkSubMenuItemBg: "white",
                  darkItemSelectedBg: "#f7f7f7",
                },
              },
            }}
          >
            <Menu
              style={{
                padding: "16px 16px 0px 0px",
                borderRadius: "5px",
                fontWeight: "500",
                height: "100%",
                width: "100%",
                fontSize: "15px",
                fontFamily: "inherit",
              }}
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
              selectedKeys={[selectedKey]}
              onClick={({ key }) => setSelectedKey(key)}
            />
          </ConfigProvider>
        </Sider>
      </div>
      <Layout style={{ background: "white", fontFamily: "inherit" }}>
        <Content style={{ padding: "5px", fontFamily: "inherit" }}>
          <div
            style={{
              padding: 24,
              paddingTop: 36,
              paddingBottom: 36,
              width: "100%",
              height: "100%",
              background: "white",
              borderRadius: "5px",
              boxShadow: "0px 2px 4px 0px rgb(0 0 0 / 0.25)",
              fontFamily: "inherit",
            }}
          >
            <DashboardPage selectedKey={selectedKey} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardOrganizerProfile;
