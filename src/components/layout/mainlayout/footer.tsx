"use client";

import React from "react";
import styles from "@/components/layout/layout.module.scss";

const Footer = () => {
  return (
    <footer className="w-full h-[494px] gap-2 flex flex-col bg-black bottom-0 mt-7">
      <div className="w-full h-5/6 pr-[40px] pl-[50px] ml-[40px] py-[80px] flex justify-between items-start gap-6 shrink-0">
        <div className="h-full w-full flex flex-col  gap-4 text-[#B4B4AC]">
          <h1 className="mb-2 text-[20px] font-bold text-white">
            SCORES AND SCHEDULE
          </h1>
          {["ORDER OF PLAY", "RESULT", "EVENT SCHEDULE"].map((item, index) => {
            return (
              <p key={index} className={styles.container}>
                <span>{item}</span>
              </p>
            );
          })}
        </div>
        <div className="h-full w-full flex flex-col gap-4 text-[#B4B4AC]">
          <h1 className="mb-2 text-[20px] font-bold text-white">
            NEWS AND VIDEOS
          </h1>
          {["TRENDING", "HIGHLIGHTS", "LIVE", "INTERVIEWS"].map(
            (item, index) => {
              return (
                <p key={index} className={styles.container}>
                  <span>{item}</span>
                </p>
              );
            }
          )}
        </div>
        <div className="h-full w-full flex flex-col gap-4 text-[#B4B4AC]">
          <h1 className="mb-2 text-[20px] font-bold text-white">DRAWS</h1>
          {["WOMAN SINGLES", "MAN SINGLES", "MIXED DOUBLES"].map(
            (item, index) => {
              return (
                <p key={index} className={styles.container}>
                  <span>{item}</span>
                </p>
              );
            }
          )}
        </div>
        <div className="h-full w-full flex flex-col gap-4 text-[#B4B4AC]">
          <h1 className="mb-2 text-[20px] font-bold text-white">ABOUT US</h1>
          {["CONTACT US", "POLICIES", "TERM OF USE", "MEDIA"].map(
            (item, index) => {
              return (
                <p key={index} className={styles.container}>
                  <span>{item}</span>
                </p>
              );
            }
          )}
        </div>
      </div>
      <div className="flex justify-center items-center text-white font-semibold px-[10px] py-[20px]  ">
        © 2024 SMASH LEAGUE Badminton Tournament Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
