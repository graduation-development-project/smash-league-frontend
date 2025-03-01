"use client";
import { AdminContext } from "@/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useContext } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminHeader = (props: any) => {
  // const { data: session, status } = useSession();
  const { session } = props;
  const router = useRouter();

  const { Header } = Layout;
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Profile",
    },
    {
      key: "2",
      label: <span>Settings</span>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      danger: true,
      label: <span>Sign Out</span>,
      onClick: () => {
        console.log("Check Signout");
        signOut();
        router.push("/auth/login");
      },
    },
  ];

  return (
    <>
      <Header
        style={{
          padding: 0,
          display: "flex",
          background: "#f5f5f5",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "inherit",
        }}
      >
        <Button
          type="text"
          icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapseMenu(!collapseMenu)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            fontFamily: "inherit",
          }}
        />
        <Dropdown
          menu={{ items }}
          trigger={["hover"]}
          overlayStyle={{ width: "10px", fontFamily: "inherit" }}
        >
          <a
            onClick={(e) => e.preventDefault()}
            style={{
              color: "unset",
              lineHeight: "0 !important",
              marginRight: 20,
              fontFamily: "inherit",
            }}
          >
            <Space>
              Welcome{session?.user?.name ?? ""}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  );
};

export default AdminHeader;
