import axios from 'axios';

export const rejectPaymentAPI = async (
  transactionId: string | null,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/reject-payment/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error response reject payment:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const acceptPaymentAPI = async (
  transactionId: string | null,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/accept-payment/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error response reject payment:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getTransactionHistoryAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/user-transactions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error get transaction history:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getPayBackFeeListAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/staffs/payback-fee-list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error get pay back fee list:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const payBackTournamentFeeAPI = async (
  transactionDetail: string,
  paybackFeeId: string,
  paybackImage: File,
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('transactionDetail', transactionDetail);
    formData.append('paybackFeeId', paybackFeeId);
    formData.append('paybackImage', paybackImage);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/payback-tournament-fee`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Error pay back tournament fee:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
