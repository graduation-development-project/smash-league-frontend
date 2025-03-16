import axios from 'axios';

export const createTourAPI = async (districtId: string) => {
  try {
    const response = await axios.get(
      `https://api.dev.smashit.com.vn/api/v1/tournaments/create-tournament`,
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};
export const genUrlAPI = async (districtId: string) => {
  try {
    const response = await axios.get(
      `https://open.oapi.vn/location/wards/${districtId}`,
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};
export const isExistedUrlAPI = async (districtId: string) => {
  try {
    const response = await axios.get(
      `https://open.oapi.vn/location/wards/${districtId}`,
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};
