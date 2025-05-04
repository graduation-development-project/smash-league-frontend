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

export const getPackageDetailsByIdAPI = async (packageId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/package/get-by-id/${packageId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error response get package details:',
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


export const updatePackageDetailsAPI = async (
  data: any,
  // accessToken: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/package/update-package`,
      data,
      // {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // },
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error response update package:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const inactivePackageAPI = async (packageId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/package/inactivate-package/${packageId}`,
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error response inactive package:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
