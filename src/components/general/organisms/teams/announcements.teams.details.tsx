"use client";

import React, { useState } from "react";
import NotificationCard from "../../atoms/notification.card";
import { Empty } from "antd";
import EmptyCard from "../../molecules/empty/empty.card";

const AnnouncementsTeamsDetails = () => {
  const [isAnnouncements, setIsAnnouncements] = useState(true);
  return (
    <>
      {isAnnouncements ? (
        <div className="flex flex-col gap-5 w-full h-full p-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <NotificationCard />
            </div>
          ))}
        </div>
      ) : (
        <EmptyCard
          description="No notifications for you yet."
          image="https://cdn-icons-png.freepik.com/256/1466/1466623.png?semt=ais_hybrid"
        />
      )}
    </>
  );
};

export default AnnouncementsTeamsDetails;
