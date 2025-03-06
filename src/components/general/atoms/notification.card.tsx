'use client';

import React from 'react';
import dayjs from 'dayjs';

const NotificationCard = () => {
  const date = dayjs(Date.now()).format('DD-MM-YYYY HH:mm:ss');
  return (
    <div className="flex flex-col gap-1 w-full h-max p-4 rounded-[5px] shadow-shadowBtn text-[#2c2c2c]">
      <h1 className="text-[16px] font-bold">Title of Notification</h1>
      <p className="text-[14px] text-slate-500 text-justify">
        This is a sample notification message.
      </p>
      <p className='text-[12px]'>{date}</p>
    </div>
  );
};

export default NotificationCard;
