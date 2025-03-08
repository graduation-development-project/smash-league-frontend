"use client";
import { DownOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  MenuProps,
  message,
} from "antd";
import { MdPendingActions } from "react-icons/md";
import { RiProgress3Fill } from "react-icons/ri";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import React, { useState } from "react";

const SearchTournamentsOrganizersProfile = () => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info(`Click on menu item: ${e.key}`);
    console.log("click", e);
  };

  const [filterValue, setFilterValue] = useState("2025");

  const yearItems: MenuProps["items"] = [
    { key: "1", label: "2025", onClick: () => setFilterValue("2025") },
    { key: "2", label: "2024", onClick: () => setFilterValue("2024") },
    { key: "3", label: "2023", onClick: () => setFilterValue("2023") },
    { key: "4", label: "2022", onClick: () => setFilterValue("2022") },
    { key: "5", label: "2021", onClick: () => setFilterValue("2021") },
  ];

  const statusItems: MenuProps["items"] = [
    {
      label: <p className="text-[16px] font-semibold">Pending</p>,
      key: "1",
      icon: <MdPendingActions size={15} />,
    },
    {
      label: <p className="text-[16px] font-semibold">On-Going</p>,
      key: "2",
      icon: <RiProgress3Fill size={15} />,
    },
    {
      label: <p className="text-[16px] font-semibold">Completed</p>,
      key: "3",
      icon: <MdOutlineIncompleteCircle size={15} />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#FF8243",
            activeShadow: "0 0 0 2px #ffffff",
            hoverBorderColor: "#FF8243",
          },
          Button: {
            defaultActiveBorderColor: "#FF8243",
            defaultActiveColor: "#FF8243",
            defaultHoverBorderColor: "#FF8243",
            defaultHoverColor: "#FF8243",
          },
        },
      }}
    >
      <div className="w-full h-full flex justify-between items-center gap-5 shadow-shadowBtn p-5 rounded-[10px]">
        <div className="w-[80%]">
          <Input
            size="large"
            placeholder="Find a Tournament name here..."
            suffix={
              <SearchOutlined
                style={{ fontSize: 20, color: "#FF8243", fontWeight: "bold" }}
              />
            }
          />
        </div>
        <div className="w-[20%] flex gap-3 justify-center items-center">
          <Dropdown menu={{ items: statusItems, onClick: handleMenuClick }}>
            <Button
              size="large"
              style={{
                width: "max-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              --- Choose Status ---
              <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown menu={{ items: yearItems, onClick: handleMenuClick }}>
            <Button
              size="large"
              style={{
                width: "max-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {filterValue}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SearchTournamentsOrganizersProfile;
