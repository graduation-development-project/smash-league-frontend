'use client';
import React from 'react';
import dayjs from 'dayjs';

const NotificationCard = ({
  notification,
}: {
  notification: NotificationProps;
}) => {
  const date = dayjs(notification?.createdAt).format('DD-MM-YYYY HH:mm:ss');
  return (
    <div className="flex flex-col gap-1 w-full h-max p-4 rounded-[5px] shadow-shadowBtn text-[#2c2c2c]">
      <h1 className="text-[16px] font-bold">{notification?.title}</h1>
      <p className="text-[14px] text-slate-500 text-justify">
        {notification?.message}
      </p>
      <p className="text-[12px]">{date}</p>
    </div>
  );
};

export default NotificationCard;
