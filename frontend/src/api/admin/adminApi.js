import axiosInstance from "./axiosInstanceConfigAdmin";

export const adminApi = {

    get(url, params, config) {
        const token = JSON.parse(sessionStorage.getItem("token"));
        return axiosInstance.get(url, { ...params, headers: { Authorization: `Bearer ${token.access_token}`, ...config } })
    },
    create(url, data, config) {
        const token = JSON.parse(sessionStorage.getItem("token"));
        return axiosInstance.post(url, data, { headers: { Authorization: `Bearer ${token.access_token}`, ...config } })
    },
    delete(url, config) {
        const token = JSON.parse(sessionStorage.getItem("token"));
        return axiosInstance.delete(url, { headers: { Authorization: `Bearer ${token.access_token}`, ...config } })
    },
    update(url, data, config) {
        const token = JSON.parse(sessionStorage.getItem("token"));
        return axiosInstance.put(url, data, { headers: { Authorization: `Bearer ${token.access_token}`, ...config } })
    },
}