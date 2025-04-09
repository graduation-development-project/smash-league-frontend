'use client';

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu } from 'antd';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { TbTournament } from 'react-icons/tb';
import { GrGroup } from 'react-icons/gr';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { TfiBarChartAlt } from 'react-icons/tfi';
import DashboardPage from '@/components/general/molecules/profile/organizer/dashboard.page';
import { getAllTournamentsByUserAPI } from '@/services/tournament';
import { getProfileAPI, getProfileAPI1 } from '@/services/user';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    label,
    children: children ?? undefined, // Đảm bảo children luôn là undefined nếu không có giá trị
  };
}

const DashboardOrganizerProfile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [tournamentList, setTournamentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllTournamentByUser = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await getAllTournamentsByUserAPI(user?.access_token);
      setTournamentList(response?.data?.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const getProfile = async () => {
    if (!user) return;
    try {
      const res = await getProfileAPI1(user?.access_token);
      // console.log('Check res profile', res);
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...res.data,
            access_token: user?.access_token,
          }),
        );
      }
    } catch (error: any) {
      console.log('error', error);
    }
  };

  // console.log('Check tournaments', tournamentList);

  useEffect(() => {
    if (user) {
      getProfile();
      getAllTournamentByUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const items: MenuItem[] = [
    getItem('Dashboard', 'dashboard', <TfiBarChartAlt size={15} />),
    getItem(
      'Tournaments',
      'tournaments',
      <TbTournament size={15} />,
      tournamentList?.flatMap((item: any) =>
        getItem(
          item?.name,
          item?.id,
          <TbTournament size={15} />,
          Object.entries(item.tournamentEvents)?.map(([name, events]) =>
            getItem(
              name,
              name,
              <TbTournament size={15} />,
              (Array.isArray(events) ? events : []).map((event: any) =>
                getItem(
                  `From ${event.fromAge} - to ${event.toAge}`,
                  `${name}_${event.fromAge}_${event.toAge}_${event.id}`,
                  <TbTournament size={15} />,
                ),
              ),
            ),
          ),
        ),
      ) || [],
    ),
    getItem(
      'Umpires',
      'umpires',
      <HiOutlineUserGroup size={15} />,
      tournamentList?.flatMap((item: any) =>
        getItem(item?.name, `${item?.id}_umpires`, <TbTournament size={15} />),
      ) || [],
    ),
  ];

  return (
    <Layout
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: '10px 20px',
        display: 'flex',
        gap: '10px',
      }}
    >
      <div className="flex flex-col p-3 bg-white shadow-md rounded-[5px]">
        {/* Toggle Button */}
        <div
          className="text-[16px] font-bold flex justify-center items-center rounded-[5px] p-2 bg-white border border-gray-200 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <RiArrowLeftSLine
            className={`transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            } hover:text-primaryColor`}
          />
        </div>

        {/* Sidebar */}
        <Sider
          collapsed={collapsed}
          onCollapse={(c) => setCollapsed(c)}
          width={220}
          style={{ height: '100%', background: 'white' }}
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemBg: 'white',
                  itemColor: 'black',
                  itemSelectedColor: '#FF8243',
                  itemHoverColor: '#FF8243',
                  subMenuItemBg: 'white',
                  itemSelectedBg: '#f7f7f7',
                },
              },
            }}
          >
            <Menu
              mode="inline"
              items={items}
              selectedKeys={[selectedKey]}
              onClick={({ key }) => setSelectedKey(key)}
              style={{ fontSize: '15px', borderRadius: '5px' }}
            />
          </ConfigProvider>
        </Sider>
      </div>

      {/* Content */}
      <Layout style={{ background: 'white' }}>
        <Content style={{ padding: '5px' }}>
          <div
            style={{
              padding: 24,
              width: '100%',
              height: '100%',
              background: 'white',
              borderRadius: '5px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <DashboardPage
              selectedKey={selectedKey}
              credit={user?.creditsRemain}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardOrganizerProfile;
