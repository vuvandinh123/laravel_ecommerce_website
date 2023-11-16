import axiosInstance from "./axiosInstanceConfigAdmin";

export const supplierApi = {
    getAll(params) {
        var url = `/suppliers`;
        return axiosInstance.get(url, { params })
    },
    get(id) {
        var url = `suppliers/${id}`;
        return axiosInstance.get(url)
    },
}