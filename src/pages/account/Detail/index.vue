<template>
  <div>
    <a-card>
      <h1>
        Account detail
      </h1>
      <p class="nameRole">{{ roleDetail.username }}</p>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Role">
          <a-button type="primary" style="margin-bottom: 10px" @click="showModal">
            + Assign new role
          </a-button>
          <a-modal
              title="Select role"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOkModalAddRole"
              @cancel="handleCancel"
          >
            <a-form-item>
              <a-select
                  mode="multiple"
                  style="width: 100%"
                  placeholder="Please select"
                  @change="addRole"
                  v-model="form.role"
              >
                <a-select-option v-for="i in rolesList" :key="i.id" :value="i.id">
                  {{ i.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-modal>
          <a-card>
            <a-table :pagination="false" bordered :columns="columnsRole" :data-source="data" rowKey="id">
              <span slot="customTitle" :key="data.id">Id</span>
              <span slot="name" slot-scope="text, record">
          <a-tag style="margin-bottom: 3px"
                 :color="record.name.length < 5 ? 'volcano' : record.name.length > 7 ? 'geekblue' : 'green'"
          >
          {{ record.name.toUpperCase() }}
          </a-tag>
        </span>
              <span slot="action" slot-scope="text, record">
          <a-icon class="action" type="delete" @click="showConfirmDelete(record.id)"/>
        </span>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Permission" force-render>
          <a-button type="primary" style="margin-bottom: 10px"  @click="showModalPermission">
            + Assign new permission
          </a-button>
          <a-modal
              title="Select permission"
              :visible="isPermission"
              @ok="handleOkModalAddPermission"
              @cancel="handleCancel"
          >
            <a-form-item>
              <a-select
                  mode="multiple"
                  style="width: 100%"
                  placeholder="Please select"
                  @change="addPermission"
                  v-model="form.permission"
              >
                <a-select-option v-for="i in allPermission" :key="i.id" :value="i.id">
                  {{ i.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-modal>
          <a-card>
            <a-table :pagination="false" bordered :columns="columnsPermission" :data-source="permission" rowKey="id">
              <span slot="customTitle" :key="data.id">Id</span>
              <span slot="name" slot-scope="text, record">
          <a-tag style="margin-bottom: 3px"
                 :color="record.name.length < 5 ? 'volcano' : record.name.length > 7 ? 'geekblue' : 'green'"
          >
          {{ record.name.toUpperCase() }}
          </a-tag>
        </span>
              <span slot="action" slot-scope="text, record">
          <a-icon class="action" type="delete" @click="showConfirmDeletePermission(record.id)"/>
        </span>
            </a-table>
          </a-card>
        </a-tab-pane>

      </a-tabs>
    </a-card>
  </div>
</template>

<script>

import {
  accountDetail,
  deleteRoleFromAccount,
  addRoleFromAccount,
  privileges,
  addMultiPrivileges,
  deletePermissionFromAccount
} from "../service";
import {getAllRole} from "../../role/service";

const columnsRole = [
  {
    dataIndex: 'id',
    key: 'id',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'id'},
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: {customRender: 'name'},
  },

  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    width: '10%'
  },
]

const columnsPermission = [
  {
    dataIndex: 'id',
    key: 'id',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'id'},
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: {customRender: 'name'},
  },

  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    width: '10%'
  },
]

export default {
  data() {
    return {
      visible: false,
      isPermission: false,
      confirmLoading: false,
      id: undefined,

      columnsRole: columnsRole,
      columnsPermission: columnsPermission,

      data: [],
      rolesList: undefined,
      roleDetail: {},

      permission: [],
      allPermission:[],
      selectPermission: [],
      rolesSelect: undefined,
      form:{
        role: undefined,
        permission: undefined
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {

    async getData() {
      try {
        this.id = this.$router.currentRoute.params.id;
        const resDetail = await accountDetail(this.id);
        const resAllRoles = await getAllRole();
        const resAllPrivileges = await privileges();

        this.permission = resDetail.data.data.privileges
        this.allPermission = resAllPrivileges.data.data

        this.rolesList = resAllRoles.data.data
        this.roleDetail = resDetail.data.data
        this.data = resDetail.data.data.roles

      } catch (e) {
        console.log(e)
      }
    },



    callback(key) {
      console.log("key: ", key);
    },

    async showModal() {
      this.form.role = undefined;
      this.visible = true;
      this.data.forEach(data=>{
        this.rolesList.forEach(role=>{
          if (data.id === role.id) {
            this.rolesList.splice(this.rolesList.indexOf(role), 1)
          }
        })

      })
    },

    async handleOkModalAddRole() {
      this.confirmLoading = true;
      this.visible = false;
     try {
       const res = await addRoleFromAccount(this.id,this.rolesSelect)
       let message = res.data.message;
       if (res.data.status !== 200){
         this.$message.error(message)

       }else {
         this.$message.success(message)
       }
     }catch (e) {
       console.log(e)
       this.$message.error(e.data.message)
     }finally {
       await this.getData()
     }
    },

    handleCancel(e) {
      console.log('Clicked cancel button' + e);
      this.visible = false;
      this.isPermission = false;
    },

    addRole(value) {
      this.rolesSelect = value.toString();
    },

    addPermission(value){
      this.selectPermission = value.toString();
    },


    showModalPermission(){
      this.isPermission = true;
      this.form.permission = undefined;
      this.permission.forEach(data=>{
        this.allPermission.forEach(permission=>{
          if (data.id === permission.id) {
            this.allPermission.splice(this.allPermission.indexOf(permission), 1)
          }
        })

      })

    },

    showConfirmDelete(roleId) {
      this.$confirm({
        title: 'Do you want to delete these role?',
        onOk: async () => {
          try {
            const res = await deleteRoleFromAccount(this.id, roleId)
            if (res.data.status !== 200) {
              this.$message.error(res.data.message)
            } else {
              this.$message.success(res.data.message)
            }
            await this.getData()
          } catch (e) {
            this.$message.error(e.data.message)
            console.log(e)
          }
        },
        onCancel() {

        },
      });
    },

    showConfirmDeletePermission(id){
      console.log(id)
      this.$confirm({
        title: 'Do you want to delete these permission?',
        onOk: async () => {
          try {
            const res = await deletePermissionFromAccount(this.id, id)
            if (res.data.status !== 200) {
              this.$message.error(res.data.message)
            } else {
              this.$message.success(res.data.message)
            }
            await this.getData()
          } catch (e) {
            this.$message.error(e.data.message)
            console.log(e)
          }
        },
        onCancel() {

        },
      });
    },

    async handleOkModalAddPermission() {
        // this.confirmLoading = true;
      this.isPermission = false;
      try {
        const res = await addMultiPrivileges(this.id, this.selectPermission)
        let message = res.data.message;
        if (res.data.status !== 200) {
          this.$message.error(message)
        } else {
          this.$message.success(message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error(e.data.message)
      } finally {
        await this.getData()
      }
    }
  }
}
</script>

<style scoped>
.nameRole {
  background: #ececec;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
}
</style>