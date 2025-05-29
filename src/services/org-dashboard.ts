import axios from 'axios';

export const registrationCountsAPI = async (
  period: string,
  fromDate: string,
  toDate: string,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/registration-counts`,

      {
        params: {
          period,
          fromDate,
          toDate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get registration counts :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const revenueCountsAPI = async (
  period: string,
  fromDate: string,
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/revenue-counts`,

      {
        params: {
          period,
          fromDate,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get revenue counts :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getUmpiresInOwnedTourAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/umpire-in-owned-tournaments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get umpires in owned tournaments :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const countTournamentStatusAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/count-tournaments-status`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get count tournament status :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const countMatchesStatusAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/count-matches-status`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get count matches status :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getCurrentMonthRevenueAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/current-month-revenue`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get current month revenue :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getCountTourInCurrentMonthAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/count-tour-in-current-month`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get count tour in current month :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getCountMatchInCurrentWeekAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/match/count-matches-in-current-week`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get count match in current week :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getCountRegistrationInCurrentMonthAPI = async (
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/count-registrations-in-current-month`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get count registration in current month :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
