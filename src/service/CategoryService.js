import http from "../config";

const categories = () => http.get(`categories`)

export {
    categories
};