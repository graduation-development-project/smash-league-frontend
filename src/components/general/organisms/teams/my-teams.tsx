'use client';

import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu } from 'antd';
import TeamsMember from '../../molecules/teams/teams-member';
import TeamsParticipatedTournaments from '../../molecules/teams/teams-participated-tournaments';
import TeamsRules from '../../molecules/teams/teams-rules';
import { getJoinedTeamAPI, getTeamMembersAPI } from '@/services/team';
import MembersTeamsDetails from './members.teams.details';

const { Header, Content, Footer, Sider } = Layout;

const MyTeams = ({ user }: { user: any }) => {
  const [teamList, setTeamList] = useState<any[]>([]);
  const [teamMemberList, setTeamMemberList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('');

  const getJoinedTeam = async () => {
    try {
      const response = await getJoinedTeamAPI(user.access_token);
      setTeamList(response?.data || []);
    } catch (error) {
      console.error('Error fetching joined teams:', error);
    }
  };

  // const fetchTeamMembers = async (teamId: string) => {
  //   if (teamId) {
  //     setIsLoading(true);
  //     try {
  //       const res = await getTeamMembersAPI(teamId, '', 1, 8);
  //       setTeamMemberList(res?.data?.data?.data || []);
  //     } catch (error) {
  //       console.error('Failed to fetch team members', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  useEffect(() => {
    if (user?.access_token) {
      getJoinedTeam();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  type MenuItem = Required<MenuProps>['items'][number];

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => ({
    key,
    icon,
    children,
    label,
  });

  const teamsList: MenuItem[] = teamList.map((team) =>
    getItem(team.teamName, `sub${team.id}`, <UserOutlined />, [
      getItem('Members', `members_${team.id}`),
      getItem('Tournaments', `tournaments_${team.id}`),
    ]),
  );

  const teamId = selectedKey.split('_')[1];
  const option = selectedKey.split('_')[0];

  const foundTeam = teamList.find((team) => team.id === teamId);

  // useEffect(() => {
  //   if (teamId) {
  //     fetchTeamMembers(teamId.toString());
  //   }
  // }, [teamId]);

  return (
    <Layout
      style={{
        height: '100%',
        backgroundColor: 'white',
        padding: '0px 20px',
        fontFamily: 'inherit',
      }}
    >
      <div className="flex flex-col gap-3 p-3 bg-white">
        <div className="text-[16px] font-bold font-quicksand shadow-shadowBtn flex justify-center items-center p-2 rounded-[5px]">
          The Team List
        </div>

        <Sider style={{ height: '100%', background: 'white', fontFamily: 'inherit' }}>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  darkItemBg: 'white',
                  darkItemColor: 'black',
                  darkItemSelectedColor: '#FF8243',
                  darkItemHoverColor: '#FF8243',
                  darkSubMenuItemBg: 'white',
                  darkItemSelectedBg: '#f7f7f7',
                },
              },
            }}
          >
            <Menu
              style={{
                padding: '16px 16px 0px 0px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 0.25)',
                // fontWeight: '500',
                fontFamily: 'inherit',
                fontSize: '16px',
                lineHeight: '24px',
              }}
              theme="dark"
              mode="inline"
              items={teamsList}
              onClick={({ key }) => setSelectedKey(key)}
            />
          </ConfigProvider>
        </Sider>
      </div>
      <Layout style={{ background: 'white', fontFamily: 'inherit' }}>
        <Content style={{ margin: '0 16px', fontFamily: 'inherit' }}>
          <div
            style={{
              padding: 24,
              paddingTop: 36,
              paddingBottom: 36,
              height: '100%',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 0.25)',
              fontFamily: 'inherit',
            }}
          >
            {foundTeam &&
              (option === 'members' ? (
                <MembersTeamsDetails
                  setTeamMemberList={setTeamMemberList}
                  teamMemberList={teamMemberList}
                  teamId={teamId}
                />
              ) : option === 'tournaments' ? (
                <TeamsParticipatedTournaments team={foundTeam} />
              ) : (
                <div>Choose your team</div>
              ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyTeams;
