import axios from 'axios';

export const registrationCountsAPI = async (
  period: string,
  fromDate: string,
  toDate: string,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/registration-counts`,

      {
        params: {
          period,
          fromDate,
          toDate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get registration counts :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const revenueCountsAPI = async (
  period: string,
  fromDate: string,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/revenue-counts`,

      {
        params: {
          period,
          fromDate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get revenue counts :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
