import http from "../../config";


const accounts = (params) => http.get(`manager/accounts`, {params: params});
const accountDetail = (name) => http.get(`manager/accounts/detail?name=${name}`);
const createAccount = (form) => http.post(`manager/accounts/register`, form);
const deleteAccount = (id) => http.delete(`manager/accounts/delete?accountId=${id}`);
const privileges = () => http.get(`manager/privileges`);
const roles = () => http.get(`manager/roles`);


const addPrivilege = (accountId, privilegeId) => http.put(`manager/accounts/privilege/update?accountId=${accountId}&privilegeId=${privilegeId}`);

export {
    accounts,
    privileges,
    roles,
    createAccount,
    accountDetail,
    deleteAccount,
    addPrivilege
}