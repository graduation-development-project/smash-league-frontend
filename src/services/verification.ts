import axios from 'axios';

export const getAllVerificationsAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/staffs/user-verifications`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get all verifications:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const verifyInformationAPI = async (
  verificationID: string,
  option: boolean,
  rejectionReason: string,
  accessToken: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/staffs/verify-information`,
      {
        verificationID,
        option,
        rejectionReason: 'ko thich',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get all verifications:',
      error.response?.data || error.message,
    );
    return error.response?.dat;
  }
};
