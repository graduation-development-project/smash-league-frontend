'use client';
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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/create-team`,
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
