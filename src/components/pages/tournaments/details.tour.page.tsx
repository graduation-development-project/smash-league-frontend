/* eslint-disable @next/next/no-img-element */
'use client';
import { HomeContextProvider } from '@/context/home.context';
import {
  CalendarOutlined,
  DownOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Tabs,
  TabsProps,
} from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import InfoDetailsTour from '@/components/general/organisms/tournaments/info-details.tour';
import BracketDetailsTour from '@/components/general/organisms/tournaments/bracket-details.tour';
import MerchandiseDetailsTour from '@/components/general/organisms/tournaments/merchan-details.tour';
import LiveDetailsTour from '@/components/general/organisms/tournaments/live-details.tour';
import PostDetailsTour from '@/components/general/organisms/tournaments/post-details.tour';
import PlayerDetailTour from '@/components/general/organisms/tournaments/player-detail.tour';
import MatchDetailsTour from '@/components/general/organisms/tournaments/match-details.tour';
import { cancelTournamentAPI, getTourDetailAPI } from '@/services/tournament';
import { EVENT_ENUM } from '@/utils/enum';
import EventAgeDetails from '@/components/general/molecules/tournaments/event-age-details.tour';
import RegisterAthleteTournamentForm from '@/components/general/molecules/tournaments/register-athlete.tournament.form';
import RegisterUmpireTournamentForm from '@/components/general/molecules/tournaments/register-umpire.tournament.form';
import AttendantsCheck from '@/components/general/molecules/tournaments/attendants-check.tour';
import AlertCreateTeamsModal from '@/components/general/molecules/teams/alert-create-teams-modal';
import RegisterTeamTourForm from '@/components/general/molecules/tournaments/register-team.tournament.form';
import UpdateDetailsTour from '@/components/general/organisms/tournaments/update-details.tour';
import Loaders from '@/components/general/atoms/loaders/loaders';
import Spinner from '@/components/general/atoms/loaders/spinner';
import FeedbackDetailsTour from '@/components/general/organisms/tournaments/feedback-details.tour';
import SponsorsDetailsTour from '@/components/general/organisms/tournaments/sponsors-details.tour';
import ReportDetails from '@/components/general/organisms/tournaments/report-details.tour';
import PostestForm from '@/components/general/organisms/tournaments/postest-form';
import { toast } from 'react-toastify';
import { useTourContext } from '@/context/tour.context';

const DetailsTourPage = () => {
  const param = useParams();
  const url = param.id.toString();
  const [eventList, setEventList] = useState<any[]>([]);
  const router = useRouter();
  const [activeKey, setActiveKey] = React.useState('details');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isTeamLeaderModalOpen, setIsTeamLeaderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [detail, setDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getTours } = useTourContext();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showUmpire = () => {
    setIsRegisterModalOpen(true);
  };

  const showTeamLeader = () => {
    setIsTeamLeaderModalOpen(true);
  };
  const showEdit = () => {
    setIsEditModalOpen(true);
  };

  // const onChange = (key: string) => {
  //   console.log(key);
  // };

  const items: MenuProps['items'] = [
    {
      key: 'register-athlete',
      label: 'Register Athlete',
      disabled: !user,
      onClick: () => {
        showModal();
      },
    },
    {
      type: 'divider',
    },
    ...(detail?.isRecruit
      ? [
          {
            key: 'register-umpire',
            label: 'Register Umpire',
            disabled: !user?.userRoles?.includes('Umpire'),
            onClick: () => {
              showUmpire();
            },
          },
        ]
      : []),

    {
      type: 'divider',
    },
    {
      key: 'register-team',
      label: 'Register Team',
      disabled: !user?.userRoles?.includes('Team Leader'),
      onClick: () => {
        showTeamLeader();
      },
    },
  ];
  // const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  //   console.log(info?.source, value);

  const handleGetTourDetail = async () => {
    try {
      setIsLoading(true);
      if (typeof url === 'string') {
        const response = await getTourDetailAPI(url);
        setDetail(response?.data);
        setEventList(Object.entries(response?.data?.tournamentEvents));
      }
      setIsLoading(false);
      throw new Error('Failed to get detail tour');
    } catch (error) {
      console.log(error, 'getTourDetail');
    }
  };

  useEffect(() => {
    handleGetTourDetail();
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
        return <InfoDetailsTour tour={detail} isOrganizer={isOrganizer} />;
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
      case 'update':
        return (
          <UpdateDetailsTour
            detail={detail}
            setDetail={setDetail}
            handleGetTourDetail={handleGetTourDetail}
          />
        );
      case 'feedback':
        return (
          <FeedbackDetailsTour
            detail={detail}
            isOrganizer={isOrganizer}
            user={user}
          />
        );
      case 'sponsors':
        return <SponsorsDetailsTour tourId={url} />;
      case 'reports':
        return (
          <ReportDetails
            detail={detail}
            isOrganizer={isOrganizer}
            user={user}
          />
        );
      default:
        return isEventKey ? (
          <EventAgeDetails
            tournamentId={url}
            eventId={activeKey}
            mainColor={detail?.mainColor || '#FF8243'}
            isOrganizer={isOrganizer}
            tour={detail}
          />
        ) : null;
    }
  };

  const isOrganizer = user?.id === detail?.organizer?.id;

  const handleCancelTour = async (tournamentId: string) => {
    if (!user) return;
    try {
      const res = await cancelTournamentAPI(tournamentId, user?.access_token);
      console.log('check cancel tour', res.data);
      if (
        res.data.statusCode === 200 ||
        res.data.statusCode === 201 ||
        res.data.statusCode === 204
      ) {
        toast.success(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        getTours(1, 100, '');
        router.push('/tournaments');
      } else {
        toast.error(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("check isRecruit", detail);
  return (
    <HomeContextProvider>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              fontFamily: 'inherit',
              colorPrimary: '#FF8243',
            },
            Tabs: {
              fontFamily: 'inherit',
              colorText: '#2c2c2c',
              itemActiveColor: '#FF8243',
              inkBarColor: '#FF8243',
              itemSelectedColor: '#FF8243',
              itemHoverColor: '#FF8243',
              // itemHeight: 48,
            },

            Menu: {
              fontFamily: 'inherit',
              colorPrimary: '#FF8243',
              itemSelectedBg: '#fcf7f4',
              itemActiveBg: '#ffebde',
              fontWeightStrong: 600,
              itemHeight: 35,
              colorBgLayout: '#FF8243',
            },
            Breadcrumb: {
              fontFamily: 'inherit',
            },
            Button: {
              fontFamily: 'inherit',
              colorPrimary: '#FF8243',
              colorPrimaryHover: '#ffa97e',
              colorPrimaryActive: '#e7753c',
              colorPrimaryBgHover: '#ffebde',
              colorBgTextActive: '#ffebde',
            },
            Input: {
              hoverBorderColor: '#FF8243',
              activeBorderColor: '#FF8243',
              fontFamily: 'inherit',
            },
            ColorPicker: {
              fontFamily: 'inherit',
              // colorBorder: '#FF8243',
              colorPrimaryBorderHover: '#FF8243',
              colorPrimaryActive: '#FF8243',
              // hoverBorderColor: '#FF8243',
              // activeBorderColor: '#FF8243',
            },
            Checkbox: {
              fontFamily: 'inherit',
              colorPrimary: '#FF8243',
              colorPrimaryHover: '#ffa97e',
            },
            Select: {
              fontFamily: 'inherit',
            },
          },
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner isLoading={isLoading} />
          </div>
        ) : (
          <div className="w-full h-max flex flex-col gap-8 px-20 text-textColor">
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
                <div>
                  {isOrganizer ? (
                    <div>
                      <Button
                        shadow={'shadowNone'}
                        className="border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => handleCancelTour(detail?.id)}
                      >
                        Cancel Tournament
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-3 justify-center items-center">
                      <Dropdown
                        menu={{ items }}
                        overlayStyle={{
                          fontFamily: 'inherit',
                          fontWeight: 400,
                        }}
                      >
                        <Button
                          variant={'default'}
                          size={'sm'}
                          // onClick={showModal}
                        >
                          Register Now <DownOutlined />
                        </Button>
                      </Dropdown>

                      {/* Team Form */}
                      {user?.userRoles?.includes('Team Leader') ? (
                        <RegisterTeamTourForm
                          isModalOpen={isTeamLeaderModalOpen}
                          setIsModalOpen={setIsTeamLeaderModalOpen}
                          detail={detail}
                          detailId={detail?.id}
                        />
                      ) : (
                        <AlertCreateTeamsModal
                          isModalOpen={isTeamLeaderModalOpen}
                          setIsModalOpen={setIsTeamLeaderModalOpen}
                          message="You are not authorized to register as Team Leader"
                          description="Please register as a Team Leader. "
                          linkText="Create your team"
                          path="/teams"
                        />
                      )}

                      {/* Athlete Form */}
                      <RegisterAthleteTournamentForm
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        detail={detail}
                        detailId={detail?.id}
                      />

                      {/* Umpire Form */}
                      {user?.userRoles?.includes('Umpire') ? (
                        <RegisterUmpireTournamentForm
                          isRegisterModalOpen={isRegisterModalOpen}
                          setIsRegisterModalOpen={setIsRegisterModalOpen}
                          detail={detail}
                        />
                      ) : (
                        <AlertCreateTeamsModal
                          isModalOpen={isRegisterModalOpen}
                          setIsModalOpen={setIsRegisterModalOpen}
                          message="You are not authorized to register as Umpire"
                          description="Please register as an Umpire. "
                          linkText="Become an Umpire"
                          path="/become/umpire"
                        />
                      )}
                      {/* {
                      user?.userRoles?.includes('Organizer') ? (
                        <Button variant="default" size={'sm'} onClick={showEdit}>
                          Edit
                        </Button>) : (<></>)
                    } */}
                    </div>
                  )}
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
                      boxShadow: '2px 0px 4px 0px rgb(0 0 0 / 0.1)',
                      backgroundColor: 'white',
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                      padding: 10,
                    }}
                  >
                    <div className="demo-logo-vertical" />
                    <Menu
                      // theme="dark"
                      style={{ fontWeight: 500, color: '#2c2c2c' }}
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
                        // {
                        //   key: 'live',
                        //   label: 'Live Stream',
                        //   disabled: !detail?.hasLiveStream,
                        //   children: detail?.liveStreamRooms?.map(
                        //     (room: any) => ({
                        //       key: room.id,
                        //       label: 'Live Court 1',
                        //     }),
                        //   ),
                        // },
                        // {
                        //   key: 'posts',
                        //   label: 'Posts',
                        //   disabled: !detail?.hasPost,
                        // },
                        {
                          key: 'merchandise',
                          label: 'Merchandise',
                          disabled: !detail?.hasMerchandise,
                        },
                        {
                          key: 'sponsors',
                          label: 'Sponsors',
                        },
                        {
                          key: 'feedback',
                          label: 'Feedback',
                        },

                        ...(!isOrganizer
                          ? [
                              {
                                key: 'reports',
                                label: 'Reports',
                              },
                            ]
                          : []),

                        ...(isOrganizer
                          ? [
                              {
                                key: 'update',
                                label: 'Update Details',
                              },
                            ]
                          : []),
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
                        minHeight: 400,
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
        )}
      </ConfigProvider>
    </HomeContextProvider>
  );
};

export default DetailsTourPage;
