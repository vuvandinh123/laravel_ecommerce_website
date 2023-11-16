import axios from "axios";
import { AppURL } from "../AppURL";
const axiosInstance = axios.create({
  baseURL: AppURL.BaseURL,
  headers: {
    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))?.access_token}`,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});
export default axiosInstance