import axios from 'axios';

export const getProvinceAPI = async () => {
  try {
    const response = await axios.get(`https://open.oapi.vn/location/provinces`);
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};

export const getDistrictAPI = async (provinceId: string) => {
  try {
    const response = await axios.get(
      `https://open.oapi.vn/location/districts/${provinceId}`,
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
export const getWardAPI = async (districtId: string) => {
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
