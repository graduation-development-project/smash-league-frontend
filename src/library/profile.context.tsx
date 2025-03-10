"use client";

import React, { createContext, useContext, useState } from "react";

interface ProfileIdProps {
  athleteId: string;
  setAthleteId: (key: string) => void;
  organizerId: string;
  setOrganizerId: (key: string) => void;
  activeKey: string;
  setActiveKey: (key: string) => void;
}

const ProfileContext = createContext<ProfileIdProps | null>(null);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [athleteId, setAthleteId] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [activeKey, setActiveKey] = useState("1");
  return (
    <ProfileContext.Provider
      value={{
        athleteId,
        setAthleteId,
        organizerId,
        setOrganizerId,
        activeKey,
        setActiveKey,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider"
    );
  }

  return context;
};
