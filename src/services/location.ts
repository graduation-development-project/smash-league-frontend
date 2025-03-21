import axios from 'axios';

const URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN_GHN = '6a0353ee-fc00-11ef-82e7-a688a46b55a3';
export const getProvinceAPI = async () => {
  try {
    const response = await axios.get(`${URL}/province`, {
      headers: {
        token: TOKEN_GHN,
      },
    });

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
    const response = await axios.get(`${URL}/district`, {
      headers: {
        token: TOKEN_GHN,
      },
      params: {
        province_id: provinceId,
      },
    });
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
    const response = await axios.get(`${URL}/ward`, {
      headers: {
        token: TOKEN_GHN,
      },
      params: {
        district_id: districtId,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};
