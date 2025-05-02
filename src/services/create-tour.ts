import axios from 'axios';
const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments`;


export const isExistedUrlAPI = async (url: string) => {
  try {
    const response = await axios.get(
      `${URL}/check-exist-tournament-url/${url}`,
    );
    console.log(response.data, 'isExistedUrlAPI');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to check exist url');
  }
};
export const generateUrlAPI = async () => {
  try {
    const response = await axios.get(`${URL}/create-random-url`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to generate url');
  }
};
export const uploadBgTourImageAPI = async (fileBgTour: File | null) => {
  if (!fileBgTour) {
    return null;
  }
  const formData = new FormData();
  formData.append('backgroundImage', fileBgTour);
  try {
    const response = await axios.post(
      `${URL}/upload-background-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response.data, 'uploadBgTourImageAPI');
    if (response.data.statusCode === 200) {
      return response.data;  
    }
    throw new Error('Failed to upload background image');
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to upload background image');
  }
};
export const uploadMerchandiseImageAPI = async (
  filesMerchandiseTour: File[],
) => {
  const formData = new FormData();
  filesMerchandiseTour.forEach((file) => {
    formData.append('files', file);
  });
  try {
    const response = await axios.post(
      `${URL}/upload-merchandise-images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response.data, 'uploadMerchandiseImageAPI');
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to upload merchandise images');
  }
};
