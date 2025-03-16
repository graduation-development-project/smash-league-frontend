import axios from "axios";

export const getSerieAPI = async (districtId: string) => {
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