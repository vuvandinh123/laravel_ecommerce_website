import axiosInstance from "./site/axiosInstanceConfig";

export const AuthApi = {
    
    create(params) {
        var url = `/auth/singup`;
        return axiosInstance.post(url, params)
    },
    login(params) {
        var url = `/auth/login`;
        return axiosInstance.post(url, params)
    }
    
}