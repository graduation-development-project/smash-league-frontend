/* eslint-disable @next/next/no-img-element */

'use client';
import Loaders from '@/components/general/atoms/loaders/loaders';
import OverviewAthleteProfile from '@/components/general/organisms/profile/athlete/overview.athlete.profile';
import { Avatar, ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import TournamentsAthleteProfile from '../../general/organisms/profile/athlete/tournaments.athlete.profile';
import UpdateInformationProfile from '@/components/general/organisms/profile/athlete/update.information.profile';
import { getProfileAPI } from '@/services/user';
import { useProfileContext } from '@/context/profile.context';

const AthleteProfilePage = (props: any) => {
  const { session } = props;
  const { athleteId, setAthleteId } = useProfileContext();
  console.log('athleteId', athleteId);
  console.log('session', session);




  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  console.log("user", user);


  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(storedUser ? JSON.parse(storedUser) : {}); 
  //     }
  //   }
  // }, []);

  const getProfile = async () => {
    // if (!user) return;
    console.log("check getProfile");
    console.log('athleteId', athleteId);
    try {
      const response = await getProfileAPI(athleteId);
      console.log('Check profile', response);
      setProfile(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [athleteId]);
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: <OverviewAthleteProfile info={profile} />,
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
                  {profile?.name}
                </h1>
                <div className="text-white text-[14px] italic ">
                  {profile?.email}
                </div>
                {
                  profile?.address ?
                    <div className="text-white text-[14px] font-semibold flex gap-1">
                      <CiLocationOn size={20} /> <span>Thu Duc, Ho Chi Minh</span>
                    </div>
                      :
                    <></>
                }


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
