import axiosInstance from "./axiosInstanceConfigAdmin";

export const invoicesApi = {
    getAll(params) {
        var url = `/invoices`;
        return axiosInstance.get(url, { params })
    },
    create(params) {
        var url = `/invoices`;
        return axiosInstance.post(url, params)
    },
    get(id) {
        var url = `invoices/${id}`;
        return axiosInstance.get(url)
    },
    delete(id) {
        var url = `invoices/${id}`;
        return axiosInstance.delete(url)
    },
}