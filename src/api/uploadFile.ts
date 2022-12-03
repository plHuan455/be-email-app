import axios from 'axios';
import ApiClient from './ApiClient';

// const UPLOAD_IMAGE_URL = process.env.REACT_IMAGE_API;

// const axiosInstance = axios.create({
//   baseURL: UPLOAD_IMAGE_URL,
//   timeout: 5000,
// });

// CREATE
export const uploadFile = async (file: any) => {
  // const formData = new FormData();
  // formData.append('file', file);
  // const config = {
  //   headers: {
  //     'content-type': 'multipart/form-data',
  //   },
  // };
  const res = await ApiClient.postFile(`/api/file`, {}, 'file', file);

  return res.data;
};

// GET IMAGE LINK
export const getImageUrl = async (fileName : string) => {
  const url = '/api/file';
  const res = await ApiClient.get(`${url}/${fileName}`);
  return res.data;
}
