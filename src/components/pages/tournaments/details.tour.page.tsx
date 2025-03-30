/* eslint-disable @next/next/no-img-element */
'use client';
import TourListBoard from '@/components/general/molecules/tournaments/tour-list.board';
import OnGoingTournament from '@/components/general/organisms/tournaments/on-going.tournament';
import { HomeContextProvider } from '@/context/home.context';
import {
  CalendarOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  ConfigProvider,
  Layout,
  Menu,
  Tabs,
  TabsProps,
} from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { SearchProps } from 'antd/es/input';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MyTournaments from './my-tour.tour';
import { Button } from '@/components/ui/button';
import InfoDetailsTour from '@/components/general/organisms/tournaments/info-details.tour';
import BracketDetailsTour from '@/components/general/organisms/tournaments/bracket-details.tour';
import MerchandiseDetailsTour from '@/components/general/organisms/tournaments/merchan-details.tour';
import LiveDetailsTour from '@/components/general/organisms/tournaments/live-details.tour';
import PostDetailsTour from '@/components/general/organisms/tournaments/post-details.tour';
import PlayerDetailTour from '@/components/general/organisms/tournaments/player-detail.tour';
import MatchDetailsTour from '@/components/general/organisms/tournaments/match-details.tour';
import { getTourDetailAPI } from '@/services/tournament';
import RegisterAthleteTournamentForm from '@/components/general/molecules/tournaments/register-athlete.tournament.form';
import RegisterUmpireTournamentForm from '@/components/general/molecules/tournaments/register-umpire.tournament.form';

const DetailsTourPage = () => {
  const param = useParams();
  const url = param.id;
  console.log(url);

  const router = useRouter();
  const [activeKey, setActiveKey] = React.useState('details');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showUmpire = () => {
    setIsRegisterModalOpen(true);
  };

  const [detail, setDetail] = useState<any>();

  const onChange = (key: string) => {
    console.log(key);
  };
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  const handleGetTourDetail = async () => {
    try {
      if (typeof url === 'string') {
        const response = await getTourDetailAPI(url);
        console.log(response.data);
        setDetail(response.data);
      }
      throw new Error('Failed to get detail tour');
    } catch (error) {
      console.log(error, 'getTourDetail');
    }
  };
  useEffect(() => {
    handleGetTourDetail();
  }, [url]);

  const renderContent = () => {
    switch (activeKey) {
      case 'details':
        return <InfoDetailsTour tour={detail} />;
      case 'ms-bracket':
        return <BracketDetailsTour />;
      case 'ms-player':
        return <PlayerDetailTour />;
      case 'ms-match':
        return <MatchDetailsTour />;
      case 'ws-bracket':
        return <BracketDetailsTour />;
      case 'ws-player':
        return <PlayerDetailTour />;
      case 'ws-match':
        return <BracketDetailsTour />;
      case 'wd-bracket':
        return <BracketDetailsTour />;
      case 'wd-player':
        return <PlayerDetailTour />;
      case 'wd-match':
        return <BracketDetailsTour />;
      case 'xd-bracket':
        return <BracketDetailsTour />;
      case 'xd-player':
        return <PlayerDetailTour />;
      case 'xd-match':
        return <BracketDetailsTour />;
      case 'live1':
        return <LiveDetailsTour />;
      case 'live2':
        return <LiveDetailsTour />;
      case 'live3':
        return <LiveDetailsTour />;
      case 'posts':
        return <PostDetailsTour />;
      case 'merchandise':
        return <MerchandiseDetailsTour />;
      default:
        return null;
    }
  };

  return (
    <HomeContextProvider>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              fontFamily: 'inherit',
              colorPrimary: '#FF8243',
            },

            Menu: {
              fontFamily: 'inherit',
              colorPrimary: '#FF8243',
              // colorBgTextHover: '#FF8243',
              colorBgLayout: '#FF8243',
            },
            Breadcrumb: {
              fontFamily: 'inherit',
            },
          },
        }}
      >
        <div className="w-full h-max flex flex-col gap-8 px-20">
          <div className="w-full h-max shadow-shadowComp rounded-b-lg">
            <div className="w-full h-[500px] ">
              <img
                className="w-full h-full object-cover"
                src={detail?.backgroundTournament}
                alt="Tournament's Banner Image"
              />
            </div>
            <div className="w-full h-max px-12 py-5 text-sm flex gap-2 justify-between items-center">
              <div>
                <h1 className="text-4xl font-extrabold">{detail?.name}</h1>
                {/* <h4>@hochiminhfederation</h4> */}
              </div>
              <div className="flex gap-2">
                <Button variant={'default'} size={'sm'} onClick={showModal}>
                  Register Now
                </Button>

                <Button variant="default" size={'sm'} onClick={showUmpire}>
                  Register As Umpire
                </Button>
              </div>
              <RegisterAthleteTournamentForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                detail={detail}
                detailId={detail?.id}
              />
              <RegisterUmpireTournamentForm
                isRegisterModalOpen={isRegisterModalOpen}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
                detail={detail}
              />
            </div>
          </div>
          <div className="w-full h-max flex flex-col py-8 px-5 gap-5 justify-center items-center shadow-shadowComp rounded-lg">
            <div className="w-full px-10">
              <Breadcrumb style={{ cursor: 'pointer' }}>
                <BreadcrumbItem onClick={() => router.push('/')}>
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem onClick={() => router.push('/tournaments')}>
                  Tournaments
                </BreadcrumbItem>
                <BreadcrumbItem>
                  Ho Chi Minh Open Tournaments 2025
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="w-full">
              <Layout style={{ display: 'flex', backgroundColor: 'white' }}>
                <Sider
                  theme="light"
                  style={{
                    boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 0.25)',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    padding: 10,
                  }}
                >
                  <div className="demo-logo-vertical" />
                  <Menu
                    // theme="dark"
                    style={{}}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => setActiveKey(key)}
                    items={[
                      {
                        key: 'details',
                        // icon: <UserOutlined />,
                        label: 'Details',
                      },
                      {
                        key: 'events',
                        label: 'Events',
                        children: [
                          {
                            key: 'ms',
                            label: "Men's Single",
                            type: 'group',
                            children: [
                              {
                                key: 'ms-bracket',
                                label: 'Bracket',
                              },
                              {
                                key: 'ms-player',
                                label: 'Players',
                              },
                              {
                                key: 'ms-match',
                                label: 'Matches',
                              },
                              {
                                key: 'ms-standings',
                                label: 'Standingss',
                              },
                            ],
                          },
                          {
                            key: 'ws',
                            label: "Women's Single",
                            type: 'group',
                            children: [
                              {
                                key: 'ws-bracket',
                                label: 'Bracket',
                              },
                              {
                                key: 'ws-player',
                                label: 'Players',
                              },
                              {
                                key: 'ws-standings',
                                label: 'Standingss',
                              },
                            ],
                          },
                          {
                            key: 'wd',
                            label: "Women's Double",
                            type: 'group',
                            children: [
                              {
                                key: 'wd-bracket',
                                label: 'Bracket',
                              },
                              {
                                key: 'wd-player',
                                label: 'Players',
                              },
                              {
                                key: 'wd-standings',
                                label: 'Standingss',
                              },
                            ],
                          },
                          {
                            key: 'xd',
                            label: 'Mixed Double',
                            type: 'group',
                            children: [
                              {
                                key: 'xd-bracket',
                                label: 'Bracket',
                              },
                              {
                                key: 'xd-player',
                                label: 'Players',
                              },
                              {
                                key: 'xd-standings',
                                label: 'Standings',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        key: 'live',
                        label: 'Live Stream',
                        children: [
                          {
                            key: 'live1',
                            label: 'Live Court 1',
                          },
                          {
                            key: 'live2',
                            label: 'Live Court 2',
                          },
                          {
                            key: 'live3',
                            label: 'Live Court 3',
                          },
                        ],
                      },
                      {
                        key: 'posts',
                        label: 'Posts',
                      },
                      {
                        key: 'merchandise',
                        label: 'Merchandise',
                      },
                    ]}
                  />
                </Sider>
                <Layout
                  style={{
                    padding: 10,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Content
                    key={activeKey}
                    style={{
                      minHeight: 280,
                      background: 'white',
                      // borderRadius: 8,
                    }}
                  >
                    {renderContent()}
                  </Content>
                </Layout>
              </Layout>

              {/* <Input placeholder="Search" style={{ width: "80%", marginTop: "20px" }} /> */}
            </div>
          </div>
        </div>
      </ConfigProvider>
    </HomeContextProvider>
  );
};

export default DetailsTourPage;
