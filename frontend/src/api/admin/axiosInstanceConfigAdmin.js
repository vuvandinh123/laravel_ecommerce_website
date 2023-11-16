import axios from "axios";
import { AppURL } from "../AppURL";
const token = JSON.parse(sessionStorage.getItem("token"));
const axiosInstance = axios.create({
  baseURL: AppURL.BaseUrlAdmin,
  headers: {
    Authorization: `Bearer ${token?.access_token}`,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

export default axiosInstance