import axios from 'axios';
import { AppURL } from './AppURL';

const request = axios.create({
  baseURL: AppURL.BaseUrlAdmin,
});

const getRequestAdmin = async (url, params, config) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await request.get(url, { params, headers: { Authorization: `Bearer ${token.access_token}`, ...config } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postRequestAdmin = async (url, data, config) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await request.post(url, data, { headers: { Authorization: `Bearer ${token.access_token}`, ...config } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const deleteRequestAdmin = async (url, config) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await request.delete(url, { headers: { Authorization: `Bearer ${token.access_token}`, ...config } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const putRequestAdmin = async (url, data, config) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await request.put(url, data,{ headers: { Authorization: `Bearer ${token.access_token}`, ...config } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { request, getRequestAdmin, postRequestAdmin, deleteRequestAdmin, putRequestAdmin };
