import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import { showToast } from "@/eventBus";

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

let hasShownTokenExpiredToast = false;

api.interceptors.response.use(response => {
    return response;
}, error => {
    // if (error.response && error.response.status === 401) {
    //     if (!hasShownTokenExpiredToast) {
    //         hasShownTokenExpiredToast = true;

    //         Cookies.remove('authToken');

    //         showToast({
    //             severity: "error",
    //             summary: "Sessão expirada",
    //             detail: "Sua sessão expirou. Faça login novamente.",
    //             life: 3000
    //         });

    //          router.push('/');

    //          setTimeout(() => {
    //              hasShownTokenExpiredToast = false;
    //          }, 3000);
    //     }
    // }

    return Promise.reject(error);
});


export { login_api, api };
