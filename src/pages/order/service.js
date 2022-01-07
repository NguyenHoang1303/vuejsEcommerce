import http from "../../config";


const orders = (params) => http.get(`orders`,{params: params} );
const store = (data) => http.post(`orders/add`, data);
const detailOrder = (id) => http.get(`orders/${id}/detail`);
const detail = (id) => http.get(`orders/${id}`);
const updateStatus = (id, status) => http.put(`orders/status/update?id=${id}&status=${status}`);


export {
    orders,
    store,
    detail,
    detailOrder,
    updateStatus,

}