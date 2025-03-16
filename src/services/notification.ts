import axios from 'axios';

export const getNotificationAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get notification:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
