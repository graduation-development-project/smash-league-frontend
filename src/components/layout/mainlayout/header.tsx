"use client";

import React from "react";
import { Button } from "../../ui/button";
import { RightOutlined } from "@ant-design/icons";
import styles from "@/components/layout/layout.module.scss";
import images from "@/assets";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute w-full min-h-[100vh] z-0 shadow-shadowComp rounded">
        <Image
          src={images.heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-10 mt-6 w-full ">
        {/* Top Section */}
        <div className="flex justify-between items-center text-white">
          {/* Logo */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-3xl font-bold text-primaryColor font-quicksand">
              SMASH LEAGUE
            </h1>
            <p className="text-sm">Elevate your game, smash the league</p>
          </div>

          {/* Navigation */}
          <ul className="flex gap-12 text-lg font-quicksand font-bold">
            {["News", "Tournaments", "Teams", "Organizer Zone", "About"].map(
              (item, index) => (
                <li key={index} className={styles.textTab}>
                  {item}
                </li>
              )
            )}
          </ul>

          {/* Login Button */}
          <Button variant="icons">
            Log in <RightOutlined />
          </Button>
        </div>
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
          <Button variant="icons" className="mt-4">
            Sign up <RightOutlined />
          </Button>
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
