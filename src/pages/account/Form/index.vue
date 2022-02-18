<template>
  <div>
    <h2>Creat account</h2>
    <a-card>
      <a-form style="width: 50%;margin: auto">
        <a-form-item label="Name">
          <a-input v-model="form.username" placeholder="Name role"/>
        </a-form-item>
        <a-form-item label="Password">
          <a-input v-model="form.password" placeholder="Password"/>
        </a-form-item>
        <a-form-item label="Select role">
          <a-select
              mode="single"
              style="width: 100%"
              placeholder="Please select"
              v-model="form.roleId">
            <a-select-option v-for="i in roles" :key="i.id" :value="i.id">
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
<!--        <a-form-item label="Select permission">-->
<!--          <a-select-->
<!--              mode="multiple"-->
<!--              style="width: 100%"-->
<!--              placeholder="Please select"-->
<!--              v-model="form.permission"-->
<!--              @change="handleChangePermission">-->
<!--            <a-select-option v-for="i in privileges" :key="i.id" :value="i.id">-->
<!--              {{ i.name }}-->
<!--            </a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-item>-->
        <a-button style="margin-right: 15px" @click="createAccount">
          {{ id ? 'Update' : 'Submit' }}
        </a-button>
        <a-button @click="clearForm">
          Clear
        </a-button>
      </a-form>
    </a-card>
  </div>

</template>

<script>

import {createAccount, roles} from "../service";
import {privileges} from "../../role/service"


export default {
  data() {
    return {
      id: undefined,
      privileges: [],
      roles: [],
      form: {
        username: undefined,
        password: undefined,
        roleId: undefined,
        // permission: [],
      }

    };
  },
  async created() {
    await this.getRole()
  }
  ,

  methods: {
    async getRole() {
      this.id = this.$router.currentRoute.params.id;
      if (this.id){
      console.log();
      }else {
        try {
          const resRole = await roles();
          const resPrivileges = await privileges();
          this.roles = resRole.data.data
          this.privileges = resPrivileges.data.data

        } catch (e) {
          console.log(e)
        }
      }

    },

     async createAccount() {
       try {
         let validationMessage = "Please enter full registration information";
         let isUser = this.form.username === undefined
         let isPass = this.form.password === undefined
         let isRole = this.form.roleId === undefined
         if (isUser && isRole && isPass){
           this.$message.error(validationMessage)
         }
         else {
           const res = await createAccount(this.form);
           let message = res.data.message;
           if (res.data.status !== 200) {
             this.$message.error(message)
           } else {
             this.$message.success(message)
           }
         }


       } catch (e) {
         this.$message.error(e.data.message)
         console.log(e)
       }
     },
     validate(){

    },

    // handleChangePermission(value){
    //   const listRole = this.roles
    //   for (const role of listRole) {
    //     if (value.length === role.privileges.length){
    //
    //     }
    //   }
    //   console.log("listRole: ", listRole)
    //
    //
    //
    //
    //
    //   let arr = [];
    //   for (let i = 0; i < value.length; i++) {
    //     arr.push(value[i])
    //   }
    //   this.form.privilege = arr;
    //   console.log(this.form.privilege)
    // },

    // async handlerChangeRole(role) {
    //    const resRoleDetail = await rolesDetail(role)
    //   const permissionArr = [];
    //   resRoleDetail.data.data.privileges.forEach(e=>{
    //     permissionArr.push(e.id)
    //   })
    //   this.form.permission = permissionArr
    // },

    clearForm() {
      this.form.name = undefined;
      this.form.permission = undefined;
    }

  },
};
</script>

