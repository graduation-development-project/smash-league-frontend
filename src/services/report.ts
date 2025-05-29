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
    console.log('accessToken', accessToken);
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

export const reportPlayerAPI = async (
  tournamentId: string,
  tournamentEventId: string,
  reportToUserId: string,
  reason: string,
  accessToken: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/report-player`,
      {
        tournamentId,
        tournamentEventId,
        reportToUserId,
        reason,
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
      'Error report player:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
export const getAllReportsByUserIdAPI = async (accessToken: string) => {
  try {
    // console.log('accessToken', accessToken);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/get-reports-of-user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get all report by user id:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
export const getAllReportsByOrganizerAPI = async (accessToken: string) => {
  try {
    // console.log('accessToken', accessToken);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/get-all-reports-for-organizer`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get all report by organizer:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
export const payFeeForReportAPI = async (
  reportId: string,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/pay-report-fee/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error pay fee for report:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
