'use client';

import React, { useEffect, useState } from 'react';
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { IoLogoDiscord } from 'react-icons/io5';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Avatar, Rate, Popover } from 'antd';
import { FaRegUser } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useProfileContext } from '@/context/profile.context';
import TournamentCard from '@/components/general/atoms/tournaments/tournament.card';
import { getTournamentsOfOrganizerIdAPI } from '@/services/tournament';
import EmptyCard from '@/components/general/molecules/empty/empty.card';

const OverviewOrganizerProfile = ({
  profile,
  tournamentList,
  setTournamentList,
}: {
  profile: any;
  tournamentList: any[];
  setTournamentList: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  const [isSocialMediaVisible, setIsSocialMediaVisible] = useState(true);
  const { setActiveKey, organizerId } = useProfileContext();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getTournamentsOfOrganizerId = async () => {
    if (!user) return;
    try {
      const response = await getTournamentsOfOrganizerIdAPI(
        user.access_token,
        organizerId,
        page,
        perPage,
      );
      // console.log('Check tournament per page', response.data);
      setTournamentList(response.data.data.data);
    } catch (error: any) {
      console.error('Error fetching tournaments:', error.message);
    }
  };

  useEffect(() => {
    getTournamentsOfOrganizerId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log("Check tournament per page", tournamentList);

  return (
    <div className="w-full h-full flex justify-around px-2 py-4 gap-3">
      {/* Tournaments */}
      <div className="w-[70%] flex flex-col gap-3 ">
        <Button
          variant={'link'}
          colorBtn={'whiteBtn'}
          shadow={'shadowNone'}
          className="w-full justify-end text-primaryColor hover:bg-white"
          onClick={() => setActiveKey('4')}
        >
          View all tournaments
        </Button>

        {tournamentList.length > 0 ? (
          <div className="w-full h-full grid grid-cols-3 gap-3 place-items-center">
            {tournamentList?.map((tour: any) => (
              <div key={tour.id} className="w-max h-max">
                <TournamentCard tour={tour} />
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

      <div className="w-[30%] h-full flex flex-col gap-5 justify-center items-center">
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
              {profile?.description
                ? profile.description
                : 'No description yet'}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="w-max text-[20px] font-bold italic border-b-[2px] border-primaryColor hover:text-primaryColor hover:border-b-[3px] cursor-pointer">
              Social Media
            </h1>
            {isSocialMediaVisible ? (
              <div className="flex gap-4 items-center">
                <Popover title="Facebook" placement="bottomRight">
                  <FaFacebookSquare
                    size={20}
                    className="hover:animate-around hover:text-blue-700 transition-all duration-300"
                  />
                </Popover>
                <Popover title="Instagram" placement="bottomRight">
                  <FaInstagramSquare
                    size={20}
                    className="hover:animate-around hover:text-[#c4238a] transition-all duration-300"
                  />
                </Popover>
                <Popover title="Discord" placement="bottomRight">
                  <IoLogoDiscord
                    size={20}
                    className="hover:animate-around hover:text-[#4007a2] transition-all duration-300"
                  />
                </Popover>
                <Popover title="Twitter" placement="bottomRight">
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
              Host
            </h1>
            <p>
              <Popover title={profile?.name} placement="bottomLeft">
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

export default OverviewOrganizerProfile;
