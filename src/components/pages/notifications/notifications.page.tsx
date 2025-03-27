'use client';
import Spinner from '@/components/general/atoms/loaders/spinner';
import NotificationCard from '@/components/general/atoms/notification.card';
import { getNotificationAPI } from '@/services/notification';
import { DownOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notiStatus, setNotiStatus] = useState('All');
  const router = useRouter();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setNotiStatus(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: <p className="text-[12px] font-semibold">All</p>,
      key: 'All',
    },
    {
      label: <p className="text-[12px] font-semibold">Pending</p>,
      key: 'Pending',
    },
    {
      label: <p className="text-[12px] font-semibold">Accepted</p>,
      key: 'Accepted',
    },
    {
      label: <p className="text-[12px] font-semibold">Approved</p>,
      key: 'Approved',
    },
    {
      label: <p className=" text-[12px] font-semibold">Rejected</p>,
      key: 'Rejected',
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);
  const getNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await getNotificationAPI(user?.access_token);
      console.log(response?.data);
      setNotifications(response?.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  const filterStatusNotifications = (status: string) => {
    if (status === 'All') return notifications;

    return (
      notifications &&
      notifications?.filter((notif: any) => {
        const hasRequest = notif.teamRequest?.status === status.toUpperCase();
        const hasInvitation =
          notif.teamInvitation?.status === status.toUpperCase();

        // Nếu bất kỳ cái nào khớp, giữ lại thông báo
        return hasRequest || hasInvitation;
      })
    );
  };

  const filteredNotifications = filterStatusNotifications(notiStatus);

  // console.log(filteredNotifications);

  useEffect(() => {
    if (user?.access_token) {
      getNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, notiStatus]);

  return (
    <div className="w-full h-full flex flex-col gap-3 shadow-shadowComp rounded-[5px] mt-4 p-4">
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <div className="w-full h-full flex justify-between items-center">
            <h1 className="text-[28px] font-bold text-primaryColor underline">
              NOTIFICATIONS
            </h1>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    /* here is your component tokens */
                    defaultActiveBorderColor: '#FF8243',
                    defaultActiveColor: '#FF8243',
                    defaultHoverBorderColor: '#FF8243',
                    defaultHoverColor: '#FF8243',
                  },
                },
              }}
            >
              <Dropdown
                overlayStyle={{
                  fontFamily: 'inherit',
                }}
                menu={menuProps}
                trigger={['click']}
              
              >
                <Button
                  size="large"
                  style={{
                    width: 'max-content',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.refresh();
                  }}
                >
                  {notiStatus} <DownOutlined />
                </Button>
              </Dropdown>
            </ConfigProvider>
          </div>
          <div>
            {notifications && filteredNotifications.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filteredNotifications?.map((noti: any) => (
                  <div key={noti?.id}>
                    <NotificationCard
                      notification={noti}
                      setNotifications={setNotifications}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-[18px] text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
