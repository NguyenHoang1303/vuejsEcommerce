import http from "../../config";

const privileges = () => http.get(`manager/privileges`);
const roles = () => http.get(`manager/roles`);
const rolesDetail = (id) => http.get(`manager/roles/detail?id=${id}`);
const deleteRole = (id) => http.delete(`manager/roles/delete?id=${id}`);

const addRole = (form) => {
    let arr = [];
    for (let i = 0; i < form.privilege.length; i++) {
        let pri = {
            id: form.privilege[i]
        }
        arr.push(pri)
    }
    let data = {
        name : form.name,
        privileges: arr
    }
    return  http.post(`manager/roles/add`, data)
};

const updateRole = (form)=>{
    let arr = [];
    for (let i = 0; i < form.privilege.length; i++) {
        let pri = {
            id: form.privilege[i]
        }
        arr.push(pri)
    }
    let data = {
        id : form.id,
        name : form.name,
        privileges: arr
    }
    console.log("data: " , data);
    return  http.put(`manager/roles/update`, data)
}


export {
    privileges,
    roles,
    rolesDetail,
    addRole,
    deleteRole,
    updateRole
}