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
import { EVENT_ENUM } from '@/utils/enum';
import EventAgeDetails from '@/components/general/molecules/tournaments/event-age-details.tour';
import RegisterAthleteTournamentForm from '@/components/general/molecules/tournaments/register-athlete.tournament.form';
import RegisterUmpireTournamentForm from '@/components/general/molecules/tournaments/register-umpire.tournament.form';
import AttendantsCheck from '@/components/general/molecules/tournaments/attendants-check.tour';
import RegisterTeamTourForm from '@/components/general/molecules/tournaments/register-team.tournament.form';

const DetailsTourPage = () => {
  const param = useParams();
  const url = param.id;
  const [eventList, setEventList] = useState<any[]>([]);
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
        setDetail(response.data);
        setEventList(Object.entries(response.data.tournamentEvents));
      }
      throw new Error('Failed to get detail tour');
    } catch (error) {
      console.log(error, 'getTourDetail');
    }
  };

  useEffect(() => {
    handleGetTourDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const renderContent = () => {
    const eventMap =
      eventList?.flatMap(([name, event]) =>
        event.map((age: any) => {
          // console.log('Check tournamentEvent', event);
          return {
            key: `${name}-${age.id}`,
            label: `From ${age.fromAge} to ${age.toAge}`,
          };
        }),
      ) || [];
    const isEventKey = eventMap.some((event) => event.key === activeKey);

    switch (activeKey) {
      case 'details':
        return <InfoDetailsTour tour={detail} />;
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
        return isEventKey ? (
          <EventAgeDetails
            tournamentId={url}
            eventId={activeKey}
            mainColor={detail?.mainColor || '#FF8243'}
          />
        ) : null;
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
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold">{detail?.name}</h1>
                <h4>@{detail?.shortName}</h4>
              </div>
              <div className="flex gap-3">
                <Button variant={'default'} size={'lg'} onClick={showModal}>
                  Register Now
                </Button>
                <RegisterTeamTourForm 
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  detail={detail}
                  detailId={detail?.id}
                /> 
                {/* Athlete Form */}
                {/* <RegisterAthleteTournamentForm
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  detail={detail}
                  detailId={detail?.id}
                /> */}
                <Button variant="default" size={'lg'} onClick={showUmpire}>
                  Register As Umpire
                </Button>
                {/* Umpire Form */}
                <RegisterUmpireTournamentForm
                  isRegisterModalOpen={isRegisterModalOpen}
                  setIsRegisterModalOpen={setIsRegisterModalOpen}
                  detail={detail}
                />
              </div>
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
                <BreadcrumbItem>{detail?.name}</BreadcrumbItem>
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
                    defaultSelectedKeys={[activeKey]}
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
                        children: eventList?.map(([name, event]) => ({
                          key: name,
                          label: EVENT_ENUM[name as keyof typeof EVENT_ENUM],
                          // label: event?.tournamentEvent,
                          type: 'group',
                          children: event?.map((age: any) => ({
                            key: `${name}-${age.id}`,
                            label: `From ${age?.fromAge} to ${age?.toAge}`,
                          })),
                        })),
                      },
                      {
                        key: 'live',
                        label: 'Live Stream',
                        disabled: !detail?.hasLiveStream,
                        children: detail?.liveStreamRooms?.map((room: any) => ({
                          key: room.id,
                          label: 'Live Court 1',
                        })),
                      },
                      {
                        key: 'posts',
                        label: 'Posts',
                        disabled: !detail?.hasPost,
                      },
                      {
                        key: 'merchandise',
                        label: 'Merchandise',
                        disabled: !detail?.hasMerchandise,
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
