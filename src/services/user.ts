'use client';

import axios from 'axios';

export const searchUserByEmail = async (searchTerms: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/search-users-by-email`,
      {
        params: {
          email: searchTerms,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error search team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
