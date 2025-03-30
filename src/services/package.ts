import axios from 'axios';

export const getAllPackagesAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/package/get-all`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error response get all packages:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const buyPackageAPI = async (packageId: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/buy-package/${packageId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error response get buy package:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

