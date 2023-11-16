import axiosInstance from "./axiosInstanceConfigAdmin";

export const categoriesApi = {
    getAll(params) {
        var url = `/categories`;
        return axiosInstance.get(url, { params })
    },
    create(params) {
        var url = `/categories`;
        return axiosInstance.post(url, params)
    },
    update(id, params) {
        var url = `/categories/${id}`;
        return axiosInstance.post(url, params)
    },
    get(slug) {
        var url = `categories/${slug}`;
        return axiosInstance.get(url)
    },
    status(id) {
        var url = `categories/status/${id}`;
        return axiosInstance.put(url)
    },
    delete(id) {
        var url = `categories/${id}`;
        return axiosInstance.delete(url)
    },
}