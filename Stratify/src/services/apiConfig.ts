import axios from "axios";

const login_api = axios.create({
    baseURL: "http://localhost:8080",
})

const api = axios.create({
    baseURL: "http://localhost:8080",
})

export {login_api, api};