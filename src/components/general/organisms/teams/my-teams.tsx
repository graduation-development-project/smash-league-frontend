import React, { useState } from "react";
import {
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import TeamsMember from "../../molecules/teams/teams-member";
import TeamsParticipatedTournaments from "../../molecules/teams/teams-participated-tournaments";
import TeamsRules from "../../molecules/teams/teams-rules";

const MyTeams = () => {
  const { Header, Content, Footer, Sider } = Layout;

  const list = [
    {
      id: 1,
      name: "FPT",
    },
    {
      id: 2,
      name: "UEH",
    },
    {
      id: 3,
      name: "RMIT",
    },
  ];

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

  const teamsList: MenuItem[] = list.map((team, index) =>
    getItem(team.name, `sub${team.id}`, <UserOutlined />, [
      getItem("Members", `members_${team.id}`),
      getItem("Tournaments", `tournaments_${team.id}`),
      getItem("Rules", `rules_${team.id}`),
    ])
  );

  const [selectedKey, setSelectedKey] = useState("members_1");
 

  const numberTeam = selectedKey.split("_")[1];
  const options = selectedKey.split("_")[0];

  const foundTeam = list.find((team) => team.id === Number(numberTeam)) || null;

  return (
    <Layout
      style={{
        height: "100%",
        backgroundColor: "white",
        padding: "0px 20px",
      }}
    >
      <div className="flex flex-col gap-3 p-3 bg-white">
        <div className="text-[16px] font-bold font-quicksand shadow-shadowBtn flex justify-center items-center p-2 rounded-[5px]">
          The Team List
        </div>

        <Sider
          style={{
            height: "100%",
            background: "white",
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
                // border: "1px solid black",
                padding: "16px 16px 0px 0px",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px 0px rgb(0 0 0 / 0.25)",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
              theme="dark"
              defaultSelectedKeys={["sub1"]}
              mode="inline"
              items={teamsList}
              onClick={({ key }) => setSelectedKey(key)}
            />
          </ConfigProvider>
        </Sider>
      </div>
      <Layout style={{ background: "white" }}>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              paddingTop: 36,
              paddingBottom: 36,
              height: "100%",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px 0px rgb(0 0 0 / 0.25)",
            }}
          >
            {foundTeam &&
              (options === "members" ? (
                <TeamsMember team={foundTeam} />
              ) : options === "tournaments" ? (
                <TeamsParticipatedTournaments team={foundTeam} />
              ) : (
                <TeamsRules team={foundTeam} />
              ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyTeams;
