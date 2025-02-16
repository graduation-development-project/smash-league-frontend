"use client";
import { Avatar } from "antd";
import { BookUser, MapPinCheckInside, UserRoundPen } from "lucide-react";
import React, { useMemo } from "react";

const TeamMemberCard = () => {
  const gender = "Female";
  const name = "Tran Anh Minh";

  // Generate a random color only once per component instance
  const avatarColor = useMemo(() => `#${Math.random().toString(16).slice(-6)}`, []);

  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-[15px] py-5 px-10 gap-3 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
      {/* Avatar & Name */}
      <div className="flex flex-col items-center gap-2 transition-all duration-300 ease-in-out hover:text-primaryColor">
        <Avatar
          size={64}
          style={{
            backgroundColor: avatarColor,
            color: "#fff",
            fontSize: "24px",
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <h1 className="text-[18px] font-bold">{name}</h1>
      </div>

      {/* Age */}
      <p className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-primaryColor hover:translate-x-1">
        <BookUser className="w-5 h-5 transition-all duration-300 ease-in-out" />
        <span className="font-medium">Age:</span>
        <span className="font-bold">24</span>
      </p>

      {/* Gender */}
      <p className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-primaryColor hover:translate-x-1">
        <UserRoundPen className="w-5 h-5 transition-all duration-300 ease-in-out" />
        <span className="font-medium">Gender:</span>
        <span className="font-bold">{gender}</span>
      </p>

      {/* Location */}
      <p className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:text-primaryColor hover:translate-x-1">
        <MapPinCheckInside className="w-5 h-5 transition-all duration-300 ease-in-out" />
        <span className="font-medium">Location:</span>
        <span className="font-bold">Ho Chi Minh</span>
      </p>
    </div>
  );
};

export default TeamMemberCard;
