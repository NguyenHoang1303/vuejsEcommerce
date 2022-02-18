import http from "../../config";


const accounts = (params) => http.get(`manager/accounts`, {params: params});
const accountDetail = (id) => http.get(`manager/accounts/detail?id=${id}`);
const createAccount = (form) => http.post(`manager/accounts/register`, form);
const deleteAccount = (id) => http.delete(`manager/accounts/delete?accountId=${id}`);
const deleteRoleFromAccount = (accId, roleId) => http.delete(`manager/accounts/role/delete?accountId=${accId}&roleId=${roleId}`);
const deletePermissionFromAccount = (accId, id) => http.delete(`manager/accounts/privilege/delete?accountId=${accId}&privilegeId=${id}`);
const addRoleFromAccount = (accId, roleIds) => http.put(`manager/accounts/role/add?accountId=${accId}&roleIds=${roleIds}`);
const privileges = () => http.get(`manager/privileges`);
const addMultiPrivileges = (accId, privilegeIds) => http.put(`manager/accounts/privilege/add?accountId=${accId}&privilegeIds=${privilegeIds}`);
const roles = () => http.get(`manager/roles`);


const addPrivilege = (accountId, privilegeId) => http.put(`manager/accounts/privilege/update?accountId=${accountId}&privilegeId=${privilegeId}`);

export {
    accounts,
    deletePermissionFromAccount,
    privileges,
    roles,
    createAccount,
    deleteRoleFromAccount,
    addRoleFromAccount,
    accountDetail,
    deleteAccount,
    addPrivilege,
    addMultiPrivileges,
}