
import http from "../config/index";

const authenticate = (data) => http.post(`/manager/accounts/login`, data);


export {
    authenticate
}