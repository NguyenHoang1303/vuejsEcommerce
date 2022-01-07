import http from "../../config";


const accounts = (params) => http.get(`orders`,{params: params} );

export {
    accounts
}