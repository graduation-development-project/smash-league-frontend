"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  DownOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "@/components/layout/layout.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Dropdown, MenuProps, Space } from "antd";
import { MdAccountCircle } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
const Navigation = (props: any) => {
  const router = useRouter();
  const { session } = props;
  const [route, setRoute] = useState("");

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      icon: <MdAccountCircle size={20} />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Public Profile",
      icon: <RiProfileFill size={20} />,
    },
    {
      key: "3",
      label: "Settings",
      icon: <IoSettingsSharp size={20} />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Log Out",
      icon: <MdLogout size={20} />,
      onClick: () => {
        localStorage.setItem("page", "Home");
        setRoute("Home");
        signOut({ callbackUrl: "/auth/login" });
        // router.push("/auth/login");
      },
    },
  ];

  useEffect(() => {
    const storedRoute = localStorage.getItem("page") || "";
    setRoute(storedRoute);
  }, []);
  return (
    <div className="w-full py-4">
      {/* Top Section */}
      <div className="flex justify-between items-center text-white">
        {/* Logo */}
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            localStorage.setItem("page", "Home");
            setRoute("Home");
            router.push("/");
          }}
        >
          <h1 className="text-3xl font-bold text-primaryColor font-quicksand">
            SMASH LEAGUE
          </h1>
          <p className="text-sm">Elevate your game, smash the league</p>
        </div>

        {/* Navigation */}
        <ul className="flex gap-12 text-lg font-quicksand font-bold">
          {["News", "Tournaments", "Teams", "Organizer Zone", "About"].map(
            (item, index) => {
              if (item === "News" || item === "Tournaments") {
                return (
                  <li
                    key={index}
                    className={`${
                      styles.textTab
                    } hover:text-primaryColor before:bg-primaryColor ${
                      item === route
                        ? "text-primaryColor before:bg-primaryColor"
                        : ""
                    }`}
                    onClick={() => {
                      localStorage.setItem("page", item);
                      console.log(item.charAt(0).toLowerCase() + item.slice(1));

                      setRoute(item);
                      router.push(
                        `/${item.charAt(0).toLowerCase() + item.slice(1)}`
                      );
                    }}
                  >
                    {item}
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className={`relative ${
                      styles.textTab
                    } hover:text-secondColor 
                            before:bg-secondColor 
                            ${
                              item === route
                                ? "text-secondColor before:!opacity-100"
                                : "before:opacity-50"
                            }`}
                    onClick={() => {
                      localStorage.setItem("page", item);
                      setRoute(item);
                      router.push(
                        `/${item.charAt(0).toLowerCase() + item.slice(1)}`
                      );
                    }}
                  >
                    {item}
                  </li>
                );
              }
            }
          )}
        </ul>

        {/* Login Button */}
        {session?.user ? (
          <Dropdown
            menu={{ items }}
            overlayStyle={{ fontFamily: "inherit", fontWeight: "600" }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button>
                Welcome {session?.user?.name}
                <DownOutlined />
              </Button>
            </a>
          </Dropdown>
        ) : (
          <Button variant="icons" onClick={() => router.push("/auth/login")}>
            Log in <RightOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
