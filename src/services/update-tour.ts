import axios from 'axios';
import { toast } from 'react-toastify';
const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments`;

export const getTourInfoDetailsAPI = async (
  tournamentId: string,
  // accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${URL}/get-tournament-information/${tournamentId}`,
    );
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      // toast.success(`${response?.data?.message}`, {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      // });
      return response.data;
    }
    throw new Error('Failed to update tournament information');
  } catch (error: any) {
    toast.error(`${error?.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    // console.error(
    //   'Error update tournament information:',
    //   error.response?.data || error.message,
    // );
    // throw new Error(
    //   error.response?.data?.message ||
    //     'Failed to update tournament information',
    // );
  }
};
export const updateTourInfoDetailsAPI = async (
  data: any,
  accessToken: string,
) => {
  try {
    const response = await axios.put(
      `${URL}/update-tournament-information`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response, 'response');

    if (response.data.statusCode === 200 || response.data.statusCode === 204) {
      toast.success(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return response.data;
    }
    throw new Error('Failed to update tournament information');
  } catch (error: any) {
    toast.error(`${error?.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};
export const getRegistrationFeeDetailsAPI = async (tournamentId: any) => {
  try {
    const response = await axios.get(
      `${URL}/get-tournament-registration-information/${tournamentId}`,
    );
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      // toast.success(`${response?.data?.message}`, {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      // });
      return response.data;
    }
    throw new Error('Failed to get tournament registration');
  } catch (error: any) {
    toast.error(`${error?.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};
export const updateRegistrationFeeDetailsAPI = async (
  data: any,
  accessToken: string,
) => {
  try {
    const response = await axios.put(
      `${URL}/update-tournament-registration-information`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.statusCode === 200 || response.data.statusCode === 204) {
      toast.success(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return response.data;
    }
    throw new Error('Failed to upload tournament registration ');
  } catch (error: any) {
    console.error(
      'Error update tournament registration fee:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message ||
        'Failed to upload tournament registration fee',
    );
  }
};
export const getTourContactDetailsAPI = async (
  tournamentId: string,
) => {
  try {
    const response = await axios.get(`${URL}/get-tournament-contact/${tournamentId}`);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      // toast.success(`${response?.data?.message}`, {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      // });
      return response.data;
    }
    throw new Error('Failed to update tournament contact');
  } catch (error: any) {
    toast.error(`${error?.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};
export const updateTourContactDetailsAPI = async (
  data: any,
  accessToken: string,
) => {
  try {
    const response = await axios.put(`${URL}/update-tournament-contact`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.statusCode === 200 || response.data.statusCode === 204) {
      toast.success(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return response.data;
    }
    throw new Error('Failed to update tournament contact');
  } catch (error: any) {
    toast.error(`${error?.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};
export const updateScheduleMatchesTourAPI = async (
  data: any,
  accessToken: string,
) => {
  try {
    const response = await axios.put(
      `${URL}/update-tournament-schedule-information`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.statusCode === 200 || response.data.statusCode === 204) {
      toast.success(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return response.data;
    }
    throw new Error('Failed to update tournament contact');
  } catch (error: any) {
    toast.error(`${error.response?.data?.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    console.error(
      'Error update tournament registration fee:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to update tournament contact',
    );
  }
};
