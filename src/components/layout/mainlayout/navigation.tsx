'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import styles from '@/components/layout/layout.module.scss';
import { useRouter } from 'next/navigation';
import { Dropdown, MenuProps } from 'antd';
import { RiProfileFill } from 'react-icons/ri';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'next-auth/react';
import { IoNotifications } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
import HeadlessTippy from '@tippyjs/react/headless';
import NotificationCard from '@/components/general/atoms/notification.card';
import { FaAddressCard } from 'react-icons/fa';
import { LuPackagePlus } from 'react-icons/lu';
import { getNotificationAPI } from '../../../services/notification';

const Navigation = (props: any) => {
  const router = useRouter();
  const { session } = props;
  const [route, setRoute] = useState('');
  const [user, setUser] = useState<any>({});
  const [notifications, setNotifications] = useState<any>([]);
  const [unread, setUnread] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getNotificationByUser = async () => {
    try {
      const response = await getNotificationAPI(user?.access_token);
      // setUnread(
      //   response?.data?.some((notif: any) => {
      //     if (notifications.length > 0) {
      //       return !notifications.includes(notif);
      //     } else {
      //       return false;
      //     }
      //   }),
      // );
      // console.log('Check noti', response?.data);
      setNotifications(response?.data);
      // Check if there are unread notifications
    } catch (error: any) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      getNotificationByUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const markNotificationsAsRead = () => {
    setUnread(false);
    // Optionally, send API request to mark them as read
  };
  const filterStatusNotifications = () => {
    return (
      notifications &&
      notifications?.filter((notif: any) => {
        const hasRequest = notif.teamRequest?.status === 'PENDING';
        const hasInvitation = notif.teamInvitation?.status === 'PENDING';
        // Nếu bất kỳ cái nào khớp, giữ lại thông báo
        return hasRequest || hasInvitation;
      })
    );
  };

  const filteredNotifications = filterStatusNotifications();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Public Profile',
      icon: <RiProfileFill size={15} />,
      onClick: () => {
        if (!user || !user.role) return; // Avoid errors
        localStorage.setItem('page', 'Home');
        setRoute('Profile');
        router.push(
          `/profile/${
            Array.isArray(user.role)
              ? user.role[1]?.toLowerCase().replace(/\s+/g, '') ||
                user.role[0]?.toLowerCase().replace(/\s+/g, '')
              : user.role.toLowerCase().replace(/\s+/g, '')
          }/${session?.user?.name.toLowerCase()}`,
        );
      },
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Become The Organizer',
      icon: <IoIosStar size={15} className="text-yellow-400" />,
    },
    {
      key: '3',
      label: 'Become The Umpire',
      icon: <FaAddressCard size={15} />,
    },
    {
      key: '4',
      label: 'Buy Packages',
      icon: <LuPackagePlus size={15} />,
      onClick: () => {
        router.push('/package');
      },
    },
    {
      key: '5',
      label: 'Settings',
      icon: <IoSettingsSharp size={15} />,
    },
    {
      type: 'divider',
    },
    {
      key: '10',
      label: 'Log Out',
      icon: <MdLogout size={15} />,
      onClick: async () => {
        try {
          localStorage.setItem('page', 'Home');
          setRoute('Home');
          localStorage.removeItem('user');
          await signOut();
          router.push('/home');
          router.refresh();
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRoute = localStorage.getItem('page') || '';
      setRoute(storedRoute);
    }
  }, []);

  return (
    <div className="w-full py-2">
      {/* Top Section */}
      <div className="flex justify-between items-center text-white">
        {/* Logo */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            localStorage.setItem('page', 'Home');
            setRoute('Home');
            router.push('/home');
          }}
        >
          <h1 className="text-[28px] font-bold text-primaryColor font-quicksand">
            SMASH LEAGUE
          </h1>
          <p className="text-[13px]">Elevate your game, smash the league</p>
        </div>

        {/* Navigation */}
        <ul className="flex gap-12 text-lg font-quicksand font-bold">
          {['News', 'Tournaments', 'Teams', 'Organizers Zone', 'About'].map(
            (item, index) => {
              if (item === 'News' || item === 'Tournaments') {
                return (
                  <li
                    key={index}
                    className={`${
                      styles.textTab
                    } hover:text-primaryColor before:bg-primaryColor ${
                      item === route
                        ? 'text-primaryColor before:bg-primaryColor'
                        : ''
                    }`}
                    onClick={() => {
                      localStorage.setItem('page', item);
                      setRoute(item);
                      router.push(
                        `/${item.toLowerCase().replace(/\s+/g, '-')}`,
                      );
                    }}
                  >
                    {item}
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className={`relative ${
                      styles.textTab
                    } hover:text-secondColor 
                            before:bg-secondColor 
                            ${
                              item === route
                                ? 'text-secondColor before:!opacity-100'
                                : 'before:opacity-50'
                            }`}
                    onClick={() => {
                      localStorage.setItem('page', item);
                      setRoute(item);
                      router.push(
                        `/${item.toLowerCase().replace(/\s+/g, '-')}`,
                      );
                    }}
                  >
                    {item}
                  </li>
                );
              }
            },
          )}
        </ul>

        {/* Login Button */}
        {session?.user ? (
          <div className="flex items-center gap-4">
            <HeadlessTippy
              interactive
              delay={[500, 500]}
              placement="bottom"
              onClickOutside={markNotificationsAsRead}
              appendTo={
                typeof window !== 'undefined' ? document.body : undefined
              }
              render={(attrs) => (
                <div
                  tabIndex={-1}
                  {...attrs}
                  className="shadow-shadowComp relative z-60 rounded-[10px]"
                >
                  <div className="w-full h-full bg-white rounded-[10px] px-4 py-6 flex flex-col justify-center items-center gap-2">
                    {notifications && filteredNotifications.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {filteredNotifications
                          .slice(0, 3)
                          .map((notification: any) => (
                            <div key={notification.id}>
                              <NotificationCard
                                notification={notification}
                                hiddenBtn={true}
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-[14px] text-gray-400">
                        No notifications found
                      </div>
                    )}
                    {notifications && filteredNotifications?.length > 0 && (
                      <div
                        className="text-[#2c2c2c] text-[14px] flex justify-center cursor-pointer bg-white mt-2  border border-gray-400 w-full p-1 rounded-[5px] hover:text-primaryColor hover:border-primaryColor"
                        onClick={() => router.push('/notifications')}
                      >
                        View All Notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            >
              <div className="relative hover:animate-shake">
                <IoNotifications
                  size={25}
                  className="cursor-pointer hover:text-orange-300 hover:animate-shake"
                />
                {unread && (
                  <div className="absolute -top-[2px] -right-[2px] bg-primaryColor w-[9px] h-[9px] rounded-full border border-white" />
                )}
              </div>
            </HeadlessTippy>
            <Dropdown
              menu={{ items }}
              overlayStyle={{
                fontFamily: 'inherit',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button size={'sm'}>
                  Welcome {session?.user?.name}
                  <DownOutlined />
                </Button>
              </a>
            </Dropdown>
          </div>
        ) : (
          <Button
            variant="icons"
            onClick={() => {
              localStorage.setItem('page', 'Home');
              router.push('/auth/login');
            }}
          >
            Log in <RightOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
