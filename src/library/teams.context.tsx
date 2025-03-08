'use client';

import { getTeamDetailsAPI } from '@/services/team';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TeamDetailsKeyProps {
  activeKey: string;
  setActiveKey: (key: string) => void;
  teamsList: any[];
  setTeamsList: (teams: (prevTeams: any[]) => any[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  teamId: string;
  setTeamId: (teamId: string) => void;
  teamDetails: TeamDetailsProps;
  setTeamDetails: (teamDetails: TeamDetailsProps) => void;
}

const TeamsContext = createContext<TeamDetailsKeyProps | null>(null);

export const TeamsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeKey, setActiveKey] = useState<string>('1');
  const [teamsList, setTeamsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamId, setTeamIdState] = useState<string>(''); // Initially empty
  const [teamDetails, setTeamDetails] = useState<TeamDetailsProps>(
    {} as TeamDetailsProps,
  );

  // Load teamId from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTeamId = localStorage.getItem('teamId');
      if (storedTeamId) {
        setTeamIdState(storedTeamId);
      }
    }
  }, []);

  // Function to update teamId and store it in localStorage
  const setTeamId = (id: string) => {
    setTeamIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('teamId', id);
    }
  };

  // Fetch team details when teamId changes
  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (teamId) {
        setIsLoading(true);
        try {
          const res = await getTeamDetailsAPI(teamId);
          setTeamDetails(res?.data);
        } catch (error) {
          console.error('Failed to fetch team details', error);
        }
        setIsLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  return (
    <TeamsContext.Provider
      value={{
        activeKey,
        setActiveKey,
        teamsList,
        setTeamsList,
        isLoading,
        setIsLoading,
        teamId,
        setTeamId,
        teamDetails,
        setTeamDetails,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeamsContext = () => {
  const context = useContext(TeamsContext);

  if (!context) {
    throw new Error(
      'useTeamsContext must be used within a TeamsContextProvider',
    );
  }

  return context;
};
