import axiosInstance from "./axiosInstanceConfigAdmin";

export const contactApi = {
 
    getAll(params) {
        var url = `/contacts`;
        return axiosInstance.get(url, { params }) 
    },
    get(id) {
        var url = `contacts/${id}`;
        return axiosInstance.get(url)
    },
    create(params) {
        var url = `contacts`;
        return axiosInstance.post(url,params)
    },
    delete(id) {
        var url = `contacts/${id}`;
        return axiosInstance.delete(url)
    },
    search(params) {
        var url = `/post/search`;
        return axiosInstance.post(url,params)
    },
}

