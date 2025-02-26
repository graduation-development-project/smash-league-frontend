"use client";

import React, { useState } from "react";

const MatchBox = () => {
  const [isWinner, setIsWinner] = useState<boolean>(true);
  const [isWinner1, setIsWinner1] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col rounded-[10px] border border-gray-300 gap-3 p-5">
      <div className="flex flex-col gap-3">
        {/* Player */}
        <div
          className={`flex justify-between items-center ${
            isWinner ? "font-bold" : ""
          }`}
        >
          <div className="flex flex-col gap-1">
            <h1>Trần Ánh Minh</h1>
            <h1>Võ Nguyễn Trung Sơn</h1>
          </div>
          <div className="flex justify-center items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full bg-primaryColor ${
                isWinner ? "block" : "hidden"
              }`}
            />
            <div className="flex gap-2">
              <span>21</span>
              <span>20</span>
              <span>19</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200" />

        {/* Player */}
        <div
          className={`flex justify-between items-center ${
            isWinner1 ? "font-bold" : ""
          }`}
        >
          <div className="flex flex-col gap-1">
            <h1>Trần Ánh Minh</h1>
            <h1>Võ Nguyễn Trung Sơn</h1>
          </div>
          <div className="flex justify-center items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full bg-primaryColor ${
                isWinner1 ? "block" : "hidden"
              }`}
            />
            <div className="flex gap-2">
              <span>21</span>
              <span>20</span>
              <span>19</span>
            </div>
          </div>
        </div>
        {/* Round */}
      </div>
      <h1 className="text-[16px] font-bold text-[#2c2c2c]">
        Round Semi-Final - HF
      </h1>
    </div>
  );
};

export default MatchBox;
