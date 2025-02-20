"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { RightOutlined } from "@ant-design/icons";
import styles from "@/components/layout/layout.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const Navigation = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [route, setRoute] = useState("");

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
          <Button>{session?.user?.name}</Button>
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
