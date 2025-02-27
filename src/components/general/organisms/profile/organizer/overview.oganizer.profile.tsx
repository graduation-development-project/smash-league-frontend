"use client";

import React, { useState } from "react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Avatar, Rate, Tooltip } from "antd";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/library/profile.context";
import TournamentCard from "@/components/general/atoms/tournaments/tournament.card";

const OverviewOrganizerProfile = () => {
  const [isSocialMediaVisible, setIsSocialMediaVisible] = useState(true);
  const { setActiveKey } = useProfileContext();
  return (
    <div className="w-full h-full flex justify-around px-8 py-4 gap-3">
      {/* Tournaments */}
      <div className="w-[70%] flex flex-col gap-3 ">
        <Button
          variant={"link"}
          colorBtn={"whiteBtn"}
          shadow={"shadowNone"}
          className="w-full justify-end text-primaryColor"
          onClick={() => setActiveKey("3")}
        >
          View all tournaments
        </Button>

        <div className="w-full h-full grid grid-cols-3 gap-5 place-items-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-max h-max">
              <TournamentCard />
            </div>
          ))}
        </div>
      </div>
      {/* Rating */}

      <div className="w-[30%] h-full flex flex-col gap-5 justify-center items-center">
        <div className="w-full flex flex-col shadow-shadowBtn bg-white p-5 rounded-[5px] gap-2 ">
          <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
            Rating
          </h1>
          <div className="flex items-center gap-3">
            <Rate allowHalf defaultValue={4.5} disabled />
            <span className="text-[14px] text-slate-600 mt-1">
              ( 100 rates )
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="w-full h-max flex flex-col justify-center gap-4 shadow-shadowBtn bg-white p-5 rounded-[5px]">
          <div className="flex flex-col gap-3">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Description
            </h1>
            <p className="max-w-[500px] break-words text-[14px] text-slate-600 text-justify ">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et
              Malorum&quot; (The Extremes of Good and Evil) by Cicero, written
              in 45 BC. This book is a treatise on the theory of ethics, very
              popular during the Renaissance. The first line of Lorem Ipsum,
              &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in
              section 1.10.32. The standard chunk of Lorem Ipsum used since the
              1500s is reproduced below for those interested. Sections 1.10.32
              and 1.10.33 from &quot;de Finibus Bonorum et Malorum&quot; by
              Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Social Media
            </h1>
            {isSocialMediaVisible ? (
              <div className="flex gap-4 items-center">
                <Tooltip title="Facebook" placement="bottomRight">
                  <FaFacebookSquare
                    size={20}
                    className="hover:animate-around hover:text-blue-700 transition-all duration-300"
                  />
                </Tooltip>
                <Tooltip title="Instagram" placement="bottomRight">
                  <FaInstagramSquare
                    size={20}
                    className="hover:animate-around hover:text-[#c4238a] transition-all duration-300"
                  />
                </Tooltip>
                <Tooltip title="Discord" placement="bottomRight">
                  <IoLogoDiscord
                    size={20}
                    className="hover:animate-around hover:text-[#4007a2] transition-all duration-300"
                  />
                </Tooltip>
                <Tooltip title="Twitter" placement="bottomRight">
                  <FaSquareXTwitter
                    size={20}
                    className="hover:animate-around hover:text-slate-500 transition-all duration-300"
                  />
                </Tooltip>
              </div>
            ) : (
              <p className=" text-[14px] text-slate-600 text-justify italic">
                No social media links yet
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Host
            </h1>
            <p>
              <Tooltip title="Ho Duong Trung Nguyen" placement="bottomLeft">
                {" "}
                <Avatar
                  style={{ backgroundColor: "gray" }}
                  size={"default"}
                  icon={<FaRegUser size={15} />}
                />
              </Tooltip>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewOrganizerProfile;
