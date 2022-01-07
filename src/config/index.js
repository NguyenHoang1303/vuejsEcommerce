import axios from "axios";
import router from "../router";


const configAxios = {
    baseURL: "http://localhost:5050/api/v1/",
    timeout: 2 * 60 * 1000
}
const http = axios.create(configAxios);

const handlerError = (error) => {

    if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        router.push({name: 'Login'});
    }

    return Promise.reject(error.response);
}

http.interceptors.request.use((config) => {
    let token = localStorage.getItem('access_token');
    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return config;
}, handlerError)

http.interceptors.response.use((res) => {
    return Promise.resolve(res);
}, handlerError)


export default http;