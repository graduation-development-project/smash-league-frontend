"use client";

import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, Input, MenuProps } from "antd";
import React, { useState } from "react";

const SearchTournamentsProfile = () => {
  const [filterValue, setFilterValue] = useState("2025");

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "2025",
      onClick: () => setFilterValue("2025"),
    },
    {
      key: "2",
      label: "2024",
      onClick: () => setFilterValue("2024"),
    },

    {
      key: "3",
      label: "2023",
      onClick: () => setFilterValue("2023"),
    },
    {
      key: "4",
      label: "2022",
      onClick: () => setFilterValue("2022"),
    },
    {
      key: "5",
      label: "2021",
      onClick: () => setFilterValue("2021"),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              /* here is your component tokens */
              activeBorderColor: "#FF8243",
              activeShadow: "0 0 0 2px #fffff",
              hoverBorderColor: "#FF8243",
            },
            Button: {
              defaultActiveBorderColor: "#FF8243",
              defaultActiveColor: "#FF8243",
              // defaultBorderColor: "#FF8243",
              defaultHoverBorderColor: "#FF8243",
              defaultHoverColor: "#FF8243",
            },
          },
        }}
      >
        <div className="w-full h-full flex justify-between items-center py-2 ">
          <div className="w-[30%] h-full">
            <Input
              variant="borderless"
              size="large"
              placeholder="Search Tournaments..."
              suffix={
                <SearchOutlined
                  style={{ fontSize: 20, color: "#FF8243", fontWeight: "bold" }}
                />
              }
            />
          </div>
          <div className="w-full h-full flex justify-end items-center">
            {" "}
            <Dropdown
              placement="bottomRight"
              menu={{ items }}
              overlayStyle={{ fontFamily: "inherit", fontWeight: "600" }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button style={{ border: "none" }}>
                  {filterValue}
                  <DownOutlined />
                </Button>
              </a>
            </Dropdown>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default SearchTournamentsProfile;
