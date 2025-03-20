import axios from 'axios';

export const getAllPackagesAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/package/get-all`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error response invitation:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
