import axios from 'axios';
import { toast } from 'react-toastify';
const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes`;

export const createFeedbackAPI = async (feedback: any, accessToken: string) => {
  try {
    const response = await axios.post(`${URL}/create-feedback`, feedback, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      toast.success(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      return response.data;
    }

    throw new Error('Failed to get Detail tour');
  } catch (error: any) {
    toast.error(`${error?.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to upload background image',
    );
  }
};

export const getFeedbackTournamentAPI = async (
  tournamentId: string,
  page: number,
  perPage: number,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/tournament-feedbacks/${tournamentId}`,
      {
        params: {
          page,
          perPage,
        },
      },
    );
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    }
    throw new Error('Fetch tournament feedbacks failed');
  } catch (error: any) {
    console.error(
      'Error get tournament feedbacks failed: ',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
