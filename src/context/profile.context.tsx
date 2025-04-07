'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ProfileIdProps {
  athleteId: string;
  setAthleteId: (key: string) => void;
  organizerId: string;
  setOrganizerId: (key: string) => void;
  activeKey: string;
  setActiveKey: (key: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user: any;
  setUser: (user: any) => void;
}

const ProfileContext = createContext<ProfileIdProps | null>(null);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [athleteId, setAthleteId] = useState('');
  const [organizerId, setOrganizerIdState] = useState('');
  const [activeKey, setActiveKey] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTeamId = localStorage.getItem('organizerId');
      if (storedTeamId) {
        setOrganizerIdState(storedTeamId);
      }
    }
  }, []);

  // Function to update teamId and store it in localStorage
  const setOrganizerId = (id: string) => {
    setOrganizerIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('teamId', id);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        athleteId,
        setAthleteId,
        organizerId,
        setOrganizerId,
        activeKey,
        setActiveKey,
        isLoading,
        setIsLoading,
        user,
        setUser,
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
      'useProfileContext must be used within a ProfileContextProvider',
    );
  }

  return context;
};
