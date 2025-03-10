/* eslint-disable @next/next/no-img-element */

'use client';
import Loaders from '@/components/general/atoms/loaders/loaders';
import OverviewAthleteProfile from '@/components/general/organisms/profile/athlete/overview.athlete.profile';
import { Avatar, ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import TournamentsAthleteProfile from '../../general/organisms/profile/athlete/tournaments.athlete.profile';
import UpdateInformationProfile from '@/components/general/organisms/profile/athlete/update.information.profile';

const AthleteProfilePage = (props: any) => {
  const { session } = props;
  const user = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJkYzAzM2JhNy1kZTFhLTRmY2MtYjFmNy1kOTkwMTM4ODU5NGIiLCJyb2xlcyI6WyIwZTVmMWQ5YS02NWMyLTQ4NmItOTczYy1lNzA1YWU5NTY5MTMiXSwiaWF0IjoxNzQwNDE3Mzc3LCJleHAiOjE3NDA0MTkxNzd9.fvQaEsYcX956KnXmI5HpGtTosAfxrYgtsg1SdgjxHlA',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJkYzAzM2JhNy1kZTFhLTRmY2MtYjFmNy1kOTkwMTM4ODU5NGIiLCJyb2xlcyI6WyIwZTVmMWQ5YS02NWMyLTQ4NmItOTczYy1lNzA1YWU5NTY5MTMiXSwiaWF0IjoxNzQwNDE3Mzc3LCJleHAiOjE3NDA0NDI1Nzd9.mlxCTkI_ujgJh5Hx-JJpV1rKsZmCrsp1OaozJETWyNk',
    email: 'smount273@gmail.com',
    name: 'Tran Anh Minh',
    roles: ['Athlete'],
    id: 'dc033ba7-de1a-4fcc-b1f7-d9901388594b',
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: <OverviewAthleteProfile />,
    },
    {
      key: '2',
      label: 'Tournaments',
      children: <TournamentsAthleteProfile />,
    },
    ...(session?.user?.id === session?.user?.id
      ? [
          {
            key: '3',
            label: 'Update Information',
            children: <UpdateInformationProfile session={session} />,
          },
        ]
      : []),
  ];

  return (
    <>
      <Loaders isLoading={isLoading} />
      <div className="w-full h-full relative z-0 shadow-shadowComp rounded-[5px]">
        <div className="w-full h-full relative z-0">
          <img
            src="https://assets.challonge.com/assets/community_default_banners/default-cover-3-redesign-2693250cf849ef7bcd3975c81ca64c06e6bdffd39d47ae0c454fd0d6e0006fb4.svg"
            alt=""
            className="w-full h-[300px] object-cover rounded-[5px]"
          />

          <div className="absolute z-10 w-full h-full flex items-center top-0 pl-10">
            <div className="flex items-center justify-center gap-4">
              <Avatar
                style={{ border: '3px solid #FF8243' }}
                size={200}
                src="https://thebridge.in/h-upload/uid/1WBjBeRGUTAFdtLSbygdVctMuxxkfATBS2658560.jpg"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-[32px] font-bold">
                  HO DUONG TRUNG NGUYEN
                </h1>
                <div className="text-white text-[14px] italic ">
                  trungnguyen2734@gmail.com
                </div>
                <div className="text-white text-[14px] font-semibold flex gap-1">
                  <CiLocationOn size={20} /> <span>Thu Duc, Ho Chi Minh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center relative z-20 ">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  /* here is your component tokens */
                  itemColor: '#000000',
                  itemSelectedColor: '#FF8243',
                  inkBarColor: '#FF8243',
                  itemHoverColor: '#FF8243',
                  itemActiveColor: '#FF8243',
                  horizontalItemPaddingLG: '0px 0px 16px 0px',
                },
              },
            }}
          >
            <Tabs
              tabBarStyle={{
                width: '100%',
                fontWeight: 600,
                // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                marginTop: 30,
                fontFamily: 'inherit',
              }}
              style={{ width: '100%', fontFamily: 'inherit' }}
              size="large"
              centered
              tabBarGutter={60}
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default AthleteProfilePage;
