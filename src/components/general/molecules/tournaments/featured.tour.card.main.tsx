'use client';

import React, { useEffect, useState } from 'react';

import { useHomeContext } from '@/context/home.context';
import { sliderImages } from '@/assets/data';
import TourCardSliderMain from '../../atoms/tour.card.slider.main';
import { Button } from '@/components/ui/button';
import TextGradientBtn from '../../atoms/text.gradient.btn';
import { useRouter } from 'next/navigation';
import { getFeaturedTourAPI } from '@/services/home-page';
import { formatLocation, formatMoney, formatOccurDate } from '@/utils/format';
import { format } from 'path';
import { FaLocationDot } from 'react-icons/fa6';
import { HiMiniTrophy, HiCalendar, HiClock } from 'react-icons/hi2';
import { HiLocationMarker } from 'react-icons/hi';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { TrophyIcon } from 'lucide-react';

const FeaturedTourCardMain = () => {
  const route = useRouter();
  const { activeSlide, setActiveSlide } = useHomeContext();
  const [slider, setSlider] = useState<any>([]);

  const [fadeInBottom, setFadeInBottom] = useState<boolean>(false);

  // const viewDetails = (id: string) => {
  //   route.push(`/tournaments/details/${id}`);
  // };
  const participatedNow = (id: string) => {
    route.push(`/tournaments/details/${id}`);
  };

  const fetchFeaturedTourMain = async () => {
    const response = await getFeaturedTourAPI();
    // const tourList = [response?.data[0]];

    setSlider(response?.data);
    setActiveSlide(response?.data[0].id);
    // setSlider(response?.data);
    // return response.data;
  };

  // const fetch

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    setFadeInBottom(false);
  };

  useEffect(() => {
    fetchFeaturedTourMain();
  }, []);

  const slide = slider?.find((item: any) => item?.id === activeSlide);

  useEffect(() => {
    setFadeInBottom(true);
  }, [activeSlide]);

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full h-full flex flex-col">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px]">
          <TourCardSliderMain slider={slider} />
          <div className="w-[90%] flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-3">
              {slider.length > 0 &&
                slider?.map((item: any) => {
                  const isActive = activeSlide === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSlideChange(item.id)}
                      className={`relative h-full w-full rounded-full shadow-md transition-all duration-300 flex justify-center items-center ${
                        isActive
                          ? 'border border-primaryColor scale-100'
                          : 'border border-gray-300 bg-gray-300'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inline-flex h-full w-full rounded-full border border-primaryColor animate-ping"></span>
                      )}
                      {/* Inner circle */}
                      <p
                        className={`rounded-full w-[8px] h-[8px] outline-none border-none ${
                          isActive ? 'bg-primaryColor scale-95' : 'bg-gray-300'
                        }`}
                      ></p>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        <div
          className={`relative z-10 flex flex-col p-10 gap-3 transition-opacity duration-500 ${
            fadeInBottom ? 'opacity-100 animate-fadeInBottom' : 'opacity-0'
          }`}
        >
          <div className="py-3 px-4 rounded-lg bg-[#000] bg-opacity-40">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-[24px] text-white leading-[20px]">
                {slide?.name}
              </h1>
              <h4 className="text-[16px] text-white leading-[20px]">
                {slide?.description}
              </h4>
            </div>
            <div className="flex py-[5px] px-[15px] items-center rounded-[20px] gap-4 bg-[#FFFFFF] bg-opacity-30 w-max my-2">
              <span className="font-bold text-[16px] text-white leading-[32px] flex justify-center items-center gap-2">
                <TrophyIcon />
                Total Prize Pool: {formatMoney(slide?.prizePool)}
              </span>
            </div>
            <ul className="flex flex-col gap-3 text-[16px] text-white leading-[16px]">
              <li className="flex ml-1 items-center gap-2 hover:text-orange-400">
                <MdDriveFileRenameOutline
                  size={20}
                  className="hover:text-orange-400 hover:animate-around transition-all duration-300 cursor-pointer"
                />
                {formatOccurDate(
                  slide?.registrationOpeningDate,
                  slide?.registrationClosingDate,
                )}
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400">
                <HiCalendar
                  size={22}
                  className="hover:text-orange-400 hover:animate-around transition-all duration-300 cursor-pointer"
                />
                {formatOccurDate(slide?.startDate, slide?.endDate)}
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400">
                <HiLocationMarker
                  size={24}
                  className="hover:text-orange-400 hover:animate-around transition-all duration-300 cursor-pointer"
                />
                {slide?.location}
              </li>
              {/* {slide?.details.map((item) => {
                return (
                  <li key={item.id} className="flex items-center gap-2 ">
                    <item.icon className="hover:text-orange-400 hover:animate-around transition-all duration-300 cursor-pointer" />{" "}
                    {item.content}
                  </li>
                );
              })} */}
            </ul>
          </div>
          <div className="flex gap-5 mt-10">
            <Button
              size={'lg'}
              onClick={() => {
                participatedNow(slide?.id);
              }}
            >
              Participate now
            </Button>
            <TextGradientBtn
              textColor="orange"
              size="lg"
              onClick={() => {
                participatedNow(slide?.id);
              }}
            >
              Read more
            </TextGradientBtn>
          </div>
        </div>
        <div
          className={`text-white text-right text-[16px] font-semibold absolute z-10 top-0 right-0 bg-primaryColor px-[15px] py-[5px] rounded-tr-[3px] rounded-bl-[10px] ${
            fadeInBottom ? 'opacity-100 animate-fadeInBottom' : 'opacity-0'
          }`}
        >
          Featured Tournament
        </div>
      </div>
    </div>
  );
};

export default FeaturedTourCardMain;
