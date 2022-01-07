
import http from "../config/index";

const authenticate = (data) => http.post(`accounts/login`, data);


export {
    authenticate
}