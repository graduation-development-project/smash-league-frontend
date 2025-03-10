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
const Navigation = (props: any) => {
  const router = useRouter();
  const { session } = props;
  const [route, setRoute] = useState('');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Public Profile',
      icon: <RiProfileFill size={15} />,
      onClick: () => {
        localStorage.setItem('page', 'Home');
        setRoute('Profile');
        router.push(
          `/profile/${session?.user?.role.toLowerCase()}/${session?.user?.name.toLowerCase()}`,
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
      onClick: () => {
        localStorage.setItem('page', 'Home');
        setRoute('Home');
        signOut({ redirect: false });
        router.push('/');
      },
    },
  ];

  useEffect(() => {
    const storedRoute = localStorage.getItem('page') || '';
    setRoute(storedRoute);
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
              render={(attrs) => (
                <div
                  tabIndex={-1}
                  {...attrs}
                  className="shadow-shadowComp relative z-60 rounded-[10px]"
                >
                  <div className="w-full h-full bg-white rounded-[10px] px-4 py-6 flex flex-col justify-center items-center gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index}>
                        <NotificationCard />
                      </div>
                    ))}
                    <div className="text-[#2c2c2c] text-[14px] flex justify-center cursor-pointer bg-white mt-2 hover:text-primaryColor border border-gray-400 w-full p-1 rounded-[5px]">
                      View All Notifications
                    </div>
                  </div>
                </div>
              )}
            >
              <div className="relative hover:animate-shake">
                <IoNotifications
                  size={25}
                  className="cursor-pointer hover:text-orange-300 hover:animate-shake"
                />
                <div className="absolute -top-[2px] -right-[2px] bg-primaryColor w-[9px] h-[9px] rounded-full border border-white" />
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
