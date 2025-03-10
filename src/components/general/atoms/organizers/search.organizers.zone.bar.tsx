import { DownOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  MenuProps,
  message,
} from "antd";
import React from "react";

const SearchOrganizersZoneBar = () => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: <p className="text-[16px] font-semibold">Beginners</p>,
      key: "1",

    },
    {
      label: <p className="text-[16px] font-semibold">Intermediate</p>,
      key: "2",
    },
    {
      label: <p className=" text-[16px] font-semibold">Advanced</p>,
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="w-fulll flex items-center justify-between gap-10 shadow-shadowBtn bg-white rounded-[10px] p-4 ">
      <div className="w-[85%] flex flex-col gap-4 ">
        <h2 className="text-[16px] font-bold">Search Organizers</h2>
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
            placeholder="Find a Organizer name here..."
            suffix={
              <SearchOutlined
                style={{ fontSize: 20, color: "#FF8243", fontWeight: "bold" }}
              />
            }
          />
        </ConfigProvider>
      </div>
      <div className="w-[15%] flex flex-col gap-4 ">
        <h2 className="text-[16px] font-bold">Filter By Levels</h2>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                /* here is your component tokens */
                defaultActiveBorderColor: "#FF8243",
                defaultActiveColor: "#FF8243",
                defaultHoverBorderColor: "#FF8243",
                defaultHoverColor: "#FF8243",
              },
            },
          }}
        >
          <Dropdown menu={menuProps}>
            <Button
              size="large"
              style={{
                width: "max-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Space> */}
              --- Choose Level ---
              <DownOutlined />
              {/* </Space> */}
            </Button>
          </Dropdown>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SearchOrganizersZoneBar;
