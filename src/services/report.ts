import axios from 'axios';

export const createReportAPI = async (data: any, accessToken: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/create-new-report`,
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
      'Error create new report:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getAllReportsAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/get-all-reports`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error get all reports:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getReportByUserAPI = async (
  userId: string,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/get-all-reports-of-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get report by user:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const approveReportAPI = async (
  reportId: string,
  accessToken: string,
) => {
  try {
    // console.log('reportId', reportId);
    // console.log('accessToken', accessToken);
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/approve-report/${reportId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error approve report:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const rejectReportAPI = async (
  reportId: string,
  accessToken: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/reject-report/${reportId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error reject report:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
