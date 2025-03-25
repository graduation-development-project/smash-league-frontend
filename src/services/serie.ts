import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments`;

export const getAllMySeriesAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(`${URL}/get-my-tournament-series`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};

export const createTourSerieAPI = async (accessToken: string, values: any) => {
  try {
    const response = await axios.post(
      `${URL}/create-tournament-serie`,
      values,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};
