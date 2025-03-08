"use client";

import NotificationCard from "@/components/general/atoms/notification.card";
import EmptyCard from "@/components/general/molecules/empty/empty.card";
import React, { useState } from "react";

const AnnouncementsOrganizerProfile = () => {
  const [isAnnouncements, setIsAnnouncements] = useState(true);
  return (
    <>
      {isAnnouncements ? (
        <div className="flex flex-col gap-5 w-full h-full p-8">
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

export default AnnouncementsOrganizerProfile;
