/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { Avatar, ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import OverviewTeamDetails from '../../general/organisms/teams/overview.team.details';
import { useTeamContext } from '@/context/team.context';
import UpdateTeamsForm from '@/components/general/molecules/teams/update.teams.form';
import TournamentsTeamsDetails from '@/components/general/organisms/teams/tournaments.teams.details';
import MembersTeamsDetails from '@/components/general/organisms/teams/members.teams.details';
import AnnouncementsTeamsDetails from '../../general/organisms/teams/announcements.teams.details';
import { getTeamMembersAPI, requestJoinTeamAPI } from '@/services/team';
import { toast } from 'react-toastify';

const TeamDetailsPage = (props: any) => {
  const { session } = props;
  const { activeKey, setActiveKey, teamDetails, teamId } = useTeamContext();
  const [user, setUser] = useState<any>(null);
  const [teamMemberList, setTeamMemberList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTeamMembers = async (teamId: string) => {
    if (teamId) {
      setIsLoading(true);
      try {
        const res = await getTeamMembersAPI(teamId, '', 1, 8);
        setTeamMemberList(res?.data?.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch team members', error);
      }
      setIsLoading(false);
    }
  };

  // console.log('Check team members list', teamMemberList); // Start with null to check for loading state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers(teamId);
  }, [teamId]);

  const isTeamLeader =
    user?.role?.includes('Team Leader') &&
    user?.id === teamDetails?.teamLeaderId;

  // console.log('Check team details', teamDetails);

  const handleRequestJoinTeam = async () => {
    const response = await requestJoinTeamAPI(
      teamDetails?.id,
      user.access_token,
    );

    console.log('Check response', response);

    if (response?.status === 200 || response?.status === 201) {
      toast.success(`${response?.data}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error(`${response?.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
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
    ...(isTeamLeader
      ? [
          {
            key: '5',
            label: 'Update Info',
            children: <UpdateTeamsForm user={user} />,
          },
        ]
      : []),
  ];

  const onChange = (key: string) => {
    setActiveKey(key);
  };

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
            <p className="text-[14px] text-slate-400 ">
              {teamMemberList?.length}
              <span>
                {' '}
                Team {teamMemberList?.length > 1 ? 'Members' : 'Member'}
              </span>
            </p>
          </div>
          <Button size={'sm'} onClick={handleRequestJoinTeam}>
            Join
          </Button>
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
            backgroundColor: `${teamDetails?.logo ? '' : '#FF8243'}  `,
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
          src={teamDetails?.logo}
        />
      </div>
    </div>
  );
};

export default TeamDetailsPage;
