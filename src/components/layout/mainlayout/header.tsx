"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { RightOutlined } from "@ant-design/icons";
import styles from "@/components/layout/layout.module.scss";
import images from "@/assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navigation from "./navigation";

export default function Header(props: any) {
  const { session } = props;
  const router = useRouter();
  // const { data: session } = useSession();
  const [route, setRoute] = useState("");

  useEffect(() => {
    const storedRoute = localStorage.getItem("page") || "";
    setRoute(storedRoute);
  }, []);

  return (
    <header className="relative w-full flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute w-full min-h-[100vh] z-0 shadow-shadowComp rounded">
        <Image
          src={images.heroImage}
          alt="Hero Background"
          fill
          quality={100}
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 px-10 py-2 w-full">
        <Navigation session={session} />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex w-full h-[50vh] items-center px-10 mt-10">
        {/* Text Content */}
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-primaryColor font-quicksand font-bold text-2xl ml-1">
            EVERY CHALLENGE. <span className="text-white">EVERY VICTORY.</span>
          </h1>
          <h2 className="text-white font-quicksand font-bold text-5xl leading-tight">
            Conquer The Tournament. Elevate Your Game.
          </h2>
          <p className="text-white text-lg ml-1 text-justify">
            Join a thriving community of players and teams competing in dynamic
            tournaments. Manage matches effortlessly, track your standings, and
            celebrate victories with us. Let the challenge begin!
          </p>
          {!session?.user && (
            <Button
              variant="icons"
              className="mt-4"
              onClick={() => {
                localStorage.setItem("page", "Home");
                router.push("/auth/register");
              }}
            >
              Sign up <RightOutlined />
            </Button>
          )}
        </div>

        {/* Hero Image */}
        <div className="w-1/2 flex justify-end">
          <Image
            src={images.heroBadmintonImage}
            alt="Hero Badminton"
            width={649}
            height={426}
            className="ml-[-20px]"
            priority
          />
        </div>
      </div>
    </header>
  );
}
