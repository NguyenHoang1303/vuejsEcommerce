
import http from "../../config";


const products = (params) => http.get(`products`,{params: params} );
const store = (data) => http.post(`products/add`, data);
const detail = (id) => http.get(`products/detail/${id}`);
const update = (data) => http.put(`products/edit`, data);
const deleteOne = (id) => http.delete(`products/delete/${id}`);

export {
    products,
    store,
    detail,
    update,
    deleteOne
}