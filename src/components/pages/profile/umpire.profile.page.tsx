/* eslint-disable @next/next/no-img-element */
'use client';

import Loaders from '@/components/general/atoms/loaders/loaders';
import TournamentsAthleteProfile from '@/components/general/organisms/profile/athlete/tournaments.athlete.profile';
import UpdateInformationProfile from '@/components/general/organisms/profile/athlete/update.information.profile';
import { Avatar, ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import OverviewUmpireProfile from '../../general/organisms/profile/umpire/overview.umpire.profile';
import MyTournaments from '../tournaments/my-tour.tour';
import { getProfileAPI } from '@/services/user';
import { useProfileContext } from '@/context/profile.context';
import BankAccountShow from '@/components/general/atoms/bank/bank-account';
import UmpireDegrees from '@/components/general/organisms/profile/umpire/update-degree';
import DegreesList from '@/components/general/organisms/profile/umpire/degrees-list';
import { getAllUmpireQualificationsAPI } from '@/services/qualification';

const UmpireProfilePage = (props: any) => {
  const { session } = props;
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { umpireId } = useProfileContext();
  const [degrees, setDegrees] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const { setActiveKey, activeKey } = useProfileContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getProfileAPI(umpireId);
      // console.log('Check profile', response);
      setProfile(response);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getAllUmpireQualifications = async () => {
    try {
      const response = await getAllUmpireQualificationsAPI(umpireId);
      console.log('Check response', response.data.data);
      const formatData = response.data.data.map((degree: any) => ({
        id: degree?.id,
        type: degree?.typeOfDegree,
        name: degree?.degreeTitle,
        description: degree?.description,
        imageUrl: degree?.degree[0],
        // issueDate: degree?.issueDate,
      }));
      setDegrees(formatData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getProfile();
    getAllUmpireQualifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umpireId, user, activeKey]);
  // console.log('Check profile umpire', profile);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'umpire-overview',
      label: 'Overview',
      children: (
        <OverviewUmpireProfile profile={profile} setProfile={setProfile} />
      ),
    },
    {
      key: 'umpire-qualifications',
      label: 'Qualifications',
      children: (
        <DegreesList
          qualifications={degrees}
          getAllUmpireQualifications={getAllUmpireQualifications}
        />
      ),
    },

    ...(user?.id === umpireId
      ? [
          {
            key: 'umpire-tournaments',
            label: 'Tournaments',
            children: <MyTournaments profileRole="UMPIRE" />,
          },

          {
            key: 'umpire-bank-account',
            label: 'Bank Account',
            children: <BankAccountShow />,
          },
          {
            key: 'umpire-update-information',
            label: 'Update Information',
            children: (
              <UpdateInformationProfile
                session={session}
                profile={profile}
                setProfile={setProfile}
              />
            ),
          },

          {
            key: 'umpire-update-qualifications',
            label: 'Update Qualifications',
            children: (
              <UmpireDegrees
                getAllUmpireQualifications={getAllUmpireQualifications}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loaders isLoading={isLoading} />
        </div>
      ) : (
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
                  src={
                    profile?.avatarURL
                      ? profile?.avatarURL
                      : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                  }
                  alt="Umpire Image"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-white text-[32px] font-bold">
                    {profile?.name}
                  </h1>
                  <div className="text-white text-[14px] italic ">
                    {profile?.email}
                  </div>
                  <div className="text-white text-[14px] font-semibold flex gap-1">
                    <CiLocationOn size={20} />{' '}
                    <span>
                      {profile?.location
                        ? profile?.location
                        : 'No Infomation. Please update your profile'}
                    </span>
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
      )}
    </>
  );
};

export default UmpireProfilePage;
