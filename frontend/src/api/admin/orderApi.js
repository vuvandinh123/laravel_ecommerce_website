import axiosInstance from "./axiosInstanceConfigAdmin";

export const orderApi = {
 
    getAll(params) {
        var url = `/orders`;
        return axiosInstance.get(url, { params }) 
    },
    get(id) {
        var url = `orders/${id}`;
        return axiosInstance.get(url)
    },
    create(params) {
        var url = `orders`;
        return axiosInstance.post(url,params)
    },
    delete(id) {
        var url = `orders/${id}`;
        return axiosInstance.delete(url)
    },
    search(params) {
        var url = `/post/search`;
        return axiosInstance.post(url,params)
    },
}

