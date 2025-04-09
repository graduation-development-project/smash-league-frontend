import TourListBoard from '@/components/general/molecules/tournaments/tour-list.board';
import MyTourListBoard from '@/components/general/organisms/tournaments/my-tour-list-board.tour';
import { getParticipatedTournamentsAPI } from '@/services/tournament';
import {
  AppstoreOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Divider,
  Layout,
  Menu,
  MenuProps,
  Tour,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { TbTournament } from 'react-icons/tb';

type MenuItem = Required<MenuProps>['items'][number];

const MyTournaments = () => {
  const content = {};
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const menu: MenuItem[] = [
    {
      key: 'sub1',
      label: 'All Tournaments',
      icon: <AppstoreOutlined />,
    },
    {
      key: 'sub2',
      label: 'My Events',
      icon: <CalendarOutlined />,
      children: [
        { key: '5', label: 'Happy Summer' },
        { key: '6', label: 'Ice Breaker ' },
        { key: '7', label: 'Happy Summer' },
        { key: '8', label: 'Ice Breaker ' },
        { key: '9', label: 'Happy Summer' },
        { key: '10', label: 'Ice Breaker ' },
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [participatedTournaments, setParticipatedTournaments] = useState<any>(
    [],
  );
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getParticipatedTournaments = async () => {
    try {
      const response = await getParticipatedTournamentsAPI(user.access_token);
      console.log('Check res', response.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const formatData = response.data.data.map((tour: any) => ({
          key: `umpires_${tour.id}`,
          label: tour.name,
        }));
        setParticipatedTournaments(formatData);
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getParticipatedTournaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full h-max flex flex-col px-10 py-3 gap-5">
      <Breadcrumb
        items={[{ title: 'Home', onClick: () => {} }, { title: 'Tournaments' }]}
      />
      <div className="flex flex-row gap-8">
        <Layout style={{ display: 'flex', gap: 10, backgroundColor: 'white' }}>
          <Sider
            theme="light"
            style={{
              boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 0.25)',
              borderRadius: 8,
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              // theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={({ key }) => setSelectedKey(key)}
              // style={{position: 'sticky'}}

              items={[
                {
                  key: 'all-tournaments',
                  icon: <UserOutlined />,
                  label: 'All Tournaments',
                },
                {
                  key: 'my-series',
                  icon: <CalendarOutlined />,
                  label: 'Your Series',
                  children: [
                    {
                      key: '5',
                      label: 'Happy Summer',
                    },
                    {
                      key: '6',
                      label: 'Ice Breaker ',
                    },
                  ],
                },
                {
                  key: 'tour-registration',
                  label: 'Tour Registration',
                  icon: <TbTournament size={15} />,
                },

                ...(user?.userRoles.includes('Umpire')
                  ? [
                      {
                        key: 'matches-umpires',
                        label: 'Umpires Matches',
                        icon: <TbTournament size={15} />,
                        children: [...participatedTournaments],
                      },
                    ]
                  : []),
              ]}
            />
          </Sider>
          <Layout>
            <Content
              key={'1'}
              style={{
                minHeight: 280,
                background: 'white',
                borderRadius: 8,
              }}
            >
              <MyTourListBoard selectedKey={selectedKey} />
            </Content>
          </Layout>
        </Layout>
      </div>
      <div></div>
    </div>
  );
};

export default MyTournaments;
