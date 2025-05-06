import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;

export const getFeaturedTourAPI = async () => {
  try {
    const response = await axios.get(`${URL}/tournaments/feature-tournaments`);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    }
    throw new Error('Failed to get featured tour');
  } catch (error: any) {
    console.error(
      'Error featured tour:',
      error.response?.data || error.message,
    );
  }
};
export const getStandingBoardTourAPI = async () => {
  try {
    const response = await axios.get(`${URL}/tournaments/latest-finish-tournaments`);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    }
    throw new Error('Failed to get standing board tour');
  } catch (error: any) {
    console.error(
      'Error standing board tour:',
      error.response?.data || error.message,
    );
  }
};
export const getStandingBoardTourEventAPI = async (id : string) => {
  try {
    const response = await axios.get(`${URL}/tournaments/get-tournaments-event-standing-board/${id}`);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    }
    throw new Error('Failed to get standing board tour event');
  } catch (error: any) {
    console.error(
      'Error standing board tour event:',
      error.response?.data || error.message,
    );
  }
};


