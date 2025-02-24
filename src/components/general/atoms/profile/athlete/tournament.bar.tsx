"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import MatchBox from "./match.box";

const TournamentBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Tournament Card */}
      <div className="w-full h-full flex flex-col justify-center items-center gap-6 border-gray-200 border-[3px] rounded-[5px] py-5 px-3">
        {/* Tournament Name */}
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-[24px] font-bold text-[#2c2c2c]">
            YONEX-SUNRISE India Open 2025
          </h1>
          <h3 className="text-[18px] font-semibold text-[#2c2c2c]">
            14 - 19 JANUARY
          </h3>
          <h3 className="text-[18px] font-semibold text-gray-400">
            NEW DELHI, INDIA
          </h3>
        </div>
        {/* Format  */}
        <div className="underline text-[20px] text-primaryColor font-semibold">
          SINGLES
        </div>

        {/* Matches Games */}
        <div className="w-max h-full flex items-center justify-between gap-[150px]">
          <div className="flex flex-col justify-center items-center gap-1">
            <h2 className="text-[18px] font-semibold text-[#2c2c2c]">
              MATCHES
            </h2>
            <h4 className="text-[18px] font-semibold text-gray-400">2/3</h4>
            {/* Progress */}
            <div className="w-full h-[8px] flex">
              <div
                className="bg-secondColor h-full"
                style={{ width: `${(2 / 3) * 100}%` }}
              />
              <div
                className="bg-gray-400 h-full"
                style={{ width: `${(1 - 2 / 3) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h2 className="text-[18px] font-semibold text-[#2c2c2c]">GAMES</h2>
            <h4 className="text-[18px] font-semibold text-gray-400">10/10</h4>
            {/* Progress */}
            <div className="w-full h-[8px] flex">
              <div
                className="bg-secondColor h-full"
                style={{ width: `${(10 / 10) * 100}%` }}
              />
              <div
                className="bg-gray-400 h-full"
                style={{ width: `${(1 - 10 / 10) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-[18px] font-semibold text-[#2c2c2c]">
              POSITION
            </h2>
            <h4 className="text-[18px] font-semibold text-white bg-secondColor p-1 rounded-[5px]">
              TOP 8
            </h4>
          </div>
        </div>

        {/* View The Matches Breadown */}
        <div
          className="flex justify-center items-center gap-2 text-sm font-semibold text-gray-800 cursor-pointer select-none transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          View The Match Breakdown{" "}
          <IoChevronDownSharp
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
      {/* Match Breakdown */}
      <div
        className={`flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "h-max opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <MatchBox />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBar;
