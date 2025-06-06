'use client';
import React, { useState } from 'react';
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { IoLogoDiscord } from 'react-icons/io5';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Avatar, Rate, Popover } from 'antd';
import { FaRegUser } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import TournamentCard from '../../atoms/tournaments/tournament.card';
import { useTeamContext } from '@/context/team.context';
import { useRouter } from 'next/navigation';
import EmptyCard from '../../molecules/empty/empty.card';
const OverviewTeamDetails = () => {
  const [isSocialMediaVisible, setIsSocialMediaVisible] = useState(true);
  const { setActiveKey, teamDetails } = useTeamContext();
  const [tournamentList, setTournamentList] = useState([]);
  // console.log(teamDetails);
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-around px-8 py-4 gap-3">
      {/* Tournaments */}
      <div className="w-[60%] flex flex-col gap-3 px-5">
        <div className="w-full h-max flex justify-between">
          <Button
            variant={'link'}
            colorBtn={'whiteBtn'}
            shadow={'shadowNone'}
            className="text-primaryColor flex items-center"
            onClick={() => {
              router.push('/teams');
            }}
          >
            <IoArrowBack size={15} />
            <span>Back To List</span>
          </Button>

          <Button
            variant={'link'}
            colorBtn={'whiteBtn'}
            shadow={'shadowNone'}
            className="text-primaryColor"
            onClick={() => setActiveKey('4')}
          >
            View all tournaments
          </Button>
        </div>

        {tournamentList.length > 0 ? (
          <div className="w-full grid grid-cols-2 gap-5 place-items-center ">
            {tournamentList.map((_, index) => (
              <div key={index}>
                <TournamentCard />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-[20px] font-semibold">
            <EmptyCard
              description="No tournaments found"
              image="https://cdn-icons-png.flaticon.com/512/313/313738.png"
            />
          </div>
        )}
      </div>
      {/* Rating */}

      <div className="w-[40%] h-full flex flex-col gap-5 justify-center items-center">
        {/* <div className="w-full flex flex-col shadow-shadowBtn bg-white p-5 rounded-[5px] gap-2 ">
          <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
            Rating
          </h1>
          <div className="flex items-center gap-3">
            <Rate allowHalf defaultValue={4.5} disabled />
            <span className="text-[14px] text-slate-600 mt-1">
              ( 100 rates )
            </span>
          </div>
        </div> */}

        {/* Description */}
        <div className="w-full h-max flex flex-col justify-center gap-4 shadow-shadowBtn bg-white p-5 rounded-[5px]">
          <div className="flex flex-col gap-3">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Description
            </h1>
            <p className="max-w-[500px] break-words text-[14px] text-slate-600 text-justify ">
              {teamDetails?.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Social Media
            </h1>
            {isSocialMediaVisible ? (
              <div className="flex gap-4 items-center">
                <Popover
                  title="Facebook"
                  placement="bottomRight"
                  getPopupContainer={(triggerNode: any) =>
                    triggerNode.parentNode
                  }
                >
                  <FaFacebookSquare
                    size={20}
                    className="hover:animate-around hover:text-blue-700 transition-all duration-300"
                  />
                </Popover>
                <Popover
                  title="Instagram"
                  placement="bottomRight"
                  getPopupContainer={(triggerNode: any) =>
                    triggerNode.parentNode
                  }
                >
                  <FaInstagramSquare
                    size={20}
                    className="hover:animate-around hover:text-[#c4238a] transition-all duration-300"
                  />
                </Popover>
                <Popover
                  title="Discord"
                  placement="bottomRight"
                  getPopupContainer={(triggerNode: any) =>
                    triggerNode.parentNode
                  }
                >
                  <IoLogoDiscord
                    size={20}
                    className="hover:animate-around hover:text-[#4007a2] transition-all duration-300"
                  />
                </Popover>
                <Popover
                  title="Twitter"
                  placement="bottomRight"
                  getPopupContainer={(triggerNode: any) =>
                    triggerNode.parentNode
                  }
                >
                  <FaSquareXTwitter
                    size={20}
                    className="hover:animate-around hover:text-slate-500 transition-all duration-300"
                  />
                </Popover>
              </div>
            ) : (
              <p className=" text-[14px] text-slate-600 text-justify italic">
                No social media links yet
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Team Leader
            </h1>
            <p>
              <Popover
                title={teamDetails?.teamLeader?.name}
                placement="bottomLeft"
              >
                {' '}
                <Avatar
                  style={{ backgroundColor: 'gray' }}
                  size={'default'}
                  icon={<FaRegUser size={15} />}
                />
              </Popover>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTeamDetails;
