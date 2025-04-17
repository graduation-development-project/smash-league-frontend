import axios from 'axios';
import React from 'react';
const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments`;

export const getPostListAPI = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/get-post-list`, {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to upload background image',
    );
  }
};
export const getMerchandiseListAPI = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/get-merchandise-list`, {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to upload background image',
    );
  }
};
export const getParticipantListAPI = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/get-participants-of-tournament-event/${id}`);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    }
    throw new Error('Failed to get Detail tour');
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to upload background image',
    );
  }
};
