import axios from 'axios';
import { getUmpireRegistrationAPI } from './tour-registration';

export const createUmpireQualificationAPI = async (
  typeOfDegree: string,
  files: any,
  description: string,
  degreeTitle: string,
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('files', files);
    formData.append('typeOfDegree', typeOfDegree);
    formData.append('description', description);
    formData.append('degreeTitle', degreeTitle);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/create-umpire-degree`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error create umpire degree :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getUmpireQualificationTypeAPI = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/get-all-umpire-degrees-type`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error create umpire degree :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getAllUmpireQualificationsAPI = async (umpireId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/get-umpire-degrees/${umpireId}`,
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get all umpire degree :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const updateUmpireDegreeAPI = async (
  id: string,
  typeOfDegree: string,
  description: string,
  degreeTitle: string,
  files: any,
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('typeOfDegree', typeOfDegree);
    formData.append('description', description);
    formData.append('degreeTitle', degreeTitle);
    formData.append('files', files);

    // FIX: update the URL to match your actual backend endpoint
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/update-umpire-degree`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response; // return only the data
  } catch (error: any) {
    console.error(
      'Error updating umpire degree:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const deleteUmpireDegreeAPI = async (
  id: string,
  accessToken: string,
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/delete-umpire-degree/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error delete umpire degree :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
