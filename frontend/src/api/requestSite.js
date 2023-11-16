import axios from 'axios';
import { AppURL } from './AppURL';

const request = axios.create({
  baseURL: AppURL.BaseURL,
});

const getRequestSite = async (url, params, config) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await request.get(url, { params, headers: { Authorization: `Bearer ${token?.access_token}`, ...config } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postRequestSite = async (url, data, config) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await request.post(url, data, { headers: { Authorization: `Bearer ${token?.access_token}`, ...config } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { request, getRequestSite, postRequestSite };
