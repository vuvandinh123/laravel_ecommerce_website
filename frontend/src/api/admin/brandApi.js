import axiosInstance from "./axiosInstanceConfigAdmin";

export const brandApi = {
 /**
     * Retrieves all data for a given slug.
     *
     * @param {string} slug - The slug for the brand.
     * @param {object} params - Additional parameters for the request.
     * @return {Promise} A promise that resolves to the response data.
     */
    getAll(params) {
        var url = `/brands`;
        return axiosInstance.get(url, { params }) 
    },
    get(id) {
        var url = `brands/${id}`;
        return axiosInstance.get(url)
    },
    create(params) {
        var url = `/brands`;
        return axiosInstance.post(url, params)
    },
    delete(id) {
        var url = `brands/${id}`;
        return axiosInstance.delete(url)
    },
    update(id, params) {
        var url = `/brands/${id}`;
        return axiosInstance.post(url, params)
    },
    status(id) {
        var url = `brands/status/${id}`;
        return axiosInstance.put(url)
    },
}
