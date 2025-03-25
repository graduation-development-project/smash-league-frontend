'use client';

import {
  getTeamDetailsAPI,
  getTeamMembersAPI,
  searchTeamsAPI,
} from '@/services/team';
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
  getTeams: (
    currentPage: number,
    totalPerPage: number,
    searchTerm: string,
  ) => Promise<void>;
  teamDetails: TeamDetailsProps;
  setTeamDetails: (teamDetails: TeamDetailsProps) => void;
  fetchTeamDetails: (teamId: string) => Promise<void>;
  total: number;
  setTotal: (total: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPerPage: number;
  setTotalPerPage: (perPage: number) => void;

}

const TeamContext = createContext<TeamDetailsKeyProps | null>(null);

export const TeamContextProvider = ({
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
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPerPage, setTotalPerPage] = useState<number>(6);
  const [teamMemberList, setTeamMemberList] = useState<any[]>([]);

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

  const getTeams = async (
    currentPage: number,
    totalPerPage: number,
    searchTerm: string,
  ) => {
    setIsLoading(true);
    try {
      const res = await searchTeamsAPI(
        currentPage,
        totalPerPage,
        searchTerm.trim(),
      );
      setTeamsList(res?.data?.data || []);
      setTotal(res?.data?.meta?.total);
      setCurrentPage(res?.data?.meta?.currentPage);
      setTotalPerPage(res?.data?.meta?.totalPerPage);
      console.log('Check pagination', res?.data?.meta);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
    setIsLoading(false);
  };

  const fetchTeamDetails = async (teamId: string) => {
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



  useEffect(() => {
    fetchTeamDetails(teamId);
  }, [teamId]);

  return (
    <TeamContext.Provider
      value={{
        activeKey,
        setActiveKey,
        teamsList,
        setTeamsList,
        isLoading,
        setIsLoading,
        teamId,
        setTeamId,
        getTeams,
        teamDetails,
        setTeamDetails,
        fetchTeamDetails,
        total,
        setTotal,
        currentPage,
        setCurrentPage,
        totalPerPage,
        setTotalPerPage,

      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error(
      'useTeamsContext must be used within a TeamsContextProvider',
    );
  }

  return context;
};
