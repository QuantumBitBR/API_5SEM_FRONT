import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";

const login_api = axios.create({
    baseURL: "http://localhost:8080",
});

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
    const token = Cookies.get('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        Cookies.remove('authToken');
        router.push('/')
        // window.location.href = "/login";
    }

    return Promise.reject(error);
});

export { login_api, api };
