'use client';

import axios from 'axios';

export const searchUserByEmailAPI = async (
  accessToken: string,
  searchTerms?: string,
) => {
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
    console.error('Error search team:', error.response?.data || error.message);
    return error.response?.data;
  }
};

export const registerNewRoleAPI = async (
  role: string,
  images: File[],
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('role', role);
    formData.append('idCardFront', images[0]);
    formData.append('idCardBack', images[1]);
    formData.append('cardPhoto', images[2]);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/register-new-role`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error register new role:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const registerUmpireRoleAPI = async (data: any, accessToken: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/register-role-umpire`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error register new role:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getProfileAPI = async (id: string | string[]) => {
  try {
    //  console.log("id", id);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/id/${id}`,
    );
    console.log('getProfile', response);

    // if(response.data.statusCode === 200 || response.data.statusCode === 201){
    //   return response.data;
    // }
    return response.data;
  } catch (error: any) {
    console.error(
      'Error register new role:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
export const getProfileAPI1 = async (accesToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      },
    );
    // console.log( "getProfile", response);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error register new role:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const updateProfileAPI = async (data: any, accessToken: string) => {
  // console.log('data', data);
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error update user profile:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const uploadAvatarAPI = async (
  file: File | null,
  accessToken: string,
) => {
  const formData = new FormData();
  formData.append('files', file ?? '');
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log(response.data, 'uploadAvatarAPI');
    return response;
  } catch (error: any) {
    console.error(
      'Error upload avatar profile:',
      error.response?.data || error.message,
    );
  }
};

export const getLatestMatchesAPIByAthleteAPI = async (
  accessToken: string,
  athleteId: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/match/get-athlete-latest-matches/${athleteId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get latest matches:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getAllUsersAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get all users:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getUserByRoleAPI = async (role: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-user-by-role/${role}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get all users:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
