"use client";

import React from "react";
import dayjs from "dayjs";

const NotificationCard = () => {
  const date = dayjs(Date.now()).format("DD-MM-YYYY HH:mm:ss");
  return (
    <div className="flex flex-col gap-3 w-full h-max p-4 rounded-[5px] shadow-shadowBtn">
      <h1 className="text-[20px] font-bold">Title of Notification</h1>
      <p className="text-[16px] text-slate-500 text-justify">
        This is a sample notification message.
      </p>
      <p>{date}</p>
    </div>
  );
};

export default NotificationCard;
