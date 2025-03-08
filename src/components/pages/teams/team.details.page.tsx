/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { Avatar, ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import OverviewTeamDetails from '../../general/organisms/teams/overview.team.details';
import { useTeamsContext } from '@/library/teams.context';
import UpdateTeamsForm from '@/components/general/molecules/teams/update.teams.form';
import TournamentsTeamsDetails from '@/components/general/organisms/teams/tournaments.teams.details';
import MembersTeamsDetails from '@/components/general/organisms/teams/members.teams.details';
import AnnouncementsTeamsDetails from '../../general/organisms/teams/announcements.teams.details';
import Spinner from '@/components/general/atoms/loaders/spinner';

const TeamDetailsPage = (props: any) => {
  const { session } = props;
  const { activeKey, setActiveKey, teamId, teamDetails, isLoading } =
    useTeamsContext();

  if (!teamId) return <Spinner isLoading={isLoading} />;

  console.log('Check session', session?.user?.role);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: <OverviewTeamDetails />,
    },
    {
      key: '2',
      label: 'Members',
      children: <MembersTeamsDetails />,
    },
    {
      key: '3',
      label: 'Announcements',
      children: <AnnouncementsTeamsDetails />,
    },
    {
      key: '4',
      label: 'Tournaments',
      children: <TournamentsTeamsDetails />,
    },
    ...(session?.user.role === 'team leader'
      ? [
          {
            key: '5',
            label: 'Update Info',
            children: <UpdateTeamsForm />,
          },
        ]
      : []),
  ];

  return (
    <div className="w-full h-full relative z-0 shadow-shadowComp rounded-[5px]">
      <img
        src={teamDetails?.logo}
        alt="Team Logo"
        className="w-full h-[300px] object-cover rounded-[5px]"
      />

      <div className="w-full h-full flex flex-col items-center relative z-20">
        <div className="w-1/2 h-full flex justify-between items-center px-6 mt-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold">{teamDetails?.teamName}</h1>
            <p className="text-[14px] text-slate-400 ">100 Team Members</p>
          </div>
          <Button size={'sm'}>Join</Button>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
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
              marginTop: 30,
              fontFamily: 'inherit',
            }}
            style={{ width: '100%', fontFamily: 'inherit' }}
            size="large"
            centered
            tabBarGutter={60}
            defaultActiveKey="1"
            activeKey={activeKey}
            items={items}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
      <div className="w-max h-max absolute z-10 bottom-0 left-48 top-60">
        <Avatar
          shape="square"
          size={135}
          style={{
            backgroundColor: '#FF8243',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
          src={teamDetails?.logo}
        />
      </div>
    </div>
  );
};

export default TeamDetailsPage;
