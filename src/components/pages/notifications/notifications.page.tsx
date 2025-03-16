'use client';
import NotificationCard from '@/components/general/atoms/notification.card';
import { getNotificationAPI } from '@/services/notification';
import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState<any>({});

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
      const response = await getNotificationAPI(user?.access_token);
      console.log('Check user', user);
      console.log(response?.data, 'Check response');
      setNotifications(response?.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      getNotifications();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col gap-3 shadow-shadowComp rounded-[5px] mt-4 p-4">
      <h1 className="text-[28px] font-bold text-primaryColor underline">
        NOTIFICATIONS
      </h1>
      <div>
        {notifications ? (
          <div>
            {notifications.map((noti: any) => (
              <div key={noti?.id}>
                <NotificationCard notification={noti} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-[18px] text-gray-500">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
