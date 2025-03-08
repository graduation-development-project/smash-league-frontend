import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data: object, options = {}) => {
  const response = await httpRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data: object, options = {}) => {
  const response = await httpRequest.put(path, data, options);
  return response.data;
};

export const patch = async (path: string, data: object, options = {}) => {
  const response = await httpRequest.patch(path, data, options);
  return response.data;
};

export const del = async (path: string, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response.data;
};

export default httpRequest;
