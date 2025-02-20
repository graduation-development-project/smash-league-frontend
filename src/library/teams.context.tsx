"use client";

import React, { createContext, useContext, useState } from "react";

interface TeamDetailsKeyProps {
  activeKey: string;
  setActiveKey: (key: string) => void;
}

const TeamsContext = createContext<TeamDetailsKeyProps | null>(null);

export const TeamsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeKey, setActiveKey] = useState("1");
  return (
    <TeamsContext.Provider value={{ activeKey, setActiveKey }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeamsContext = () => {
  const context = useContext(TeamsContext);

  if (!context) {
    throw new Error("useHomeContext must be used within a HomeContextProvider");
  }

  return context;
};
