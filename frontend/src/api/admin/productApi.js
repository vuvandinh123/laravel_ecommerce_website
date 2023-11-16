import axiosInstance from "./axiosInstanceConfigAdmin";

export const productApi = {
    getAll(params) {
        var url = `/products`;
        return axiosInstance.get(url, { params })
    },
    
    create(params) {
        var url = `/products`;
        return axiosInstance.post(url, params )
    },
    update(id,params) {
        var url = `/products/${id}`;
        return axiosInstance.put(url, params ,{headers: { 'Content-Type': 'application/json' } })
    },
    status(id) {
        var url = `products/status/${id}`;
        return axiosInstance.put(url)
    },
    delete(id) {
        var url = `products/${id}`;
        return axiosInstance.delete(url)
    },
    get(slug) {
        var url = `products/${slug}`;
        return axiosInstance.get(url)
    },
    search(id,params) {
        var url = `products/search/${id}`;
        return axiosInstance.get(url,{ params })
    },
}