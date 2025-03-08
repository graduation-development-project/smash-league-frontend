'use client';
import httpRequest from '@/utils/httpRequest';
import axios from 'axios';

export const createTeamAPI = async (
  logo: File | null,
  teamName: string,
  teamDescription: string,
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('logo', logo ?? '');
    formData.append('teamName', teamName);
    formData.append('description', teamDescription);

    const response = await httpRequest.post(
      '/api/v1/team-leaders/create-team',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};

export const searchTeamsAPI = async (
  page: number,
  perPage: number,
  searchTerm?: string,
) => {
  try {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/search`,
      {
        params: {
          page: page,
          perPage: perPage,
          searchTerm: searchTerm,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error searching team list:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to get team');
  }
};

export const getTeamDetailsAPI = async (teamId: string) => {
  try {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${teamId}`,
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get team details:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to get team details',
    );
  }
};
