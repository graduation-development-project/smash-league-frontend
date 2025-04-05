import axios from 'axios';

export const updateStatusOfMatchAPI = async (
  matchId: string,
  accessToken: string,
  matchStatus: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/update-match`,

      {
        matchId,
        matchStatus,
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
      'Error update status for match:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
export const startMatchAPI = async (
  matchId: string,
  currenServerId: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/match/update-start-time/${matchId}?currentServerId=${currenServerId}`,
    );

    return response;
  } catch (error: any) {
    console.error('Error start match:', error.response?.data || error.message);
    return error.response?.data;
  }
};

export const updatePointAPI = async (gameId: string, winningId: string) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/match/update-point/${gameId}?winningId=${winningId}`,
    );

    return response;
  } catch (error: any) {
    console.error('Error update point:', error.response?.data || error.message);
    return error.response?.data;
  }
};

export const getMatchByIdAPI = async (matchId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/match/get-match/${matchId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get match by Id:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const checkAttendanceAPI = async (
  matchId: string,
  left: boolean,
  right: boolean,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/match/update-attendance/${matchId}?leftCompetitorAttendance=${left}&rightCompetitorAttendance=${right}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error check attendance:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
