<template>
  <div>
    <h2>Creat role</h2>
    <a-card>
      <a-form style="width: 50%;margin: auto">
        <a-form-item label="Name">
          <a-input v-model="form.name" placeholder="Name role"/>
        </a-form-item>
        <a-form-item label="Select permission">
          <a-select
              mode="multiple"
              style="width: 100%"
              placeholder="Please select"
              v-model="form.privilege"
              @change="handleChange">
            <a-select-option v-for="i in privileges" :key="i.id" :value="i.id">
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-button style="margin-right: 15px" @click="handlerRole">
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
import {addRole, privileges, rolesDetail, updateRole} from "../service";

export default {
  data() {
    return {
      id: undefined,
      privileges: undefined,
      form: {
        name: undefined,
        privilege: [],
      }

    };
  },
  async created() {
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      const roleDetail = await rolesDetail(this.id)
      this.form.name = roleDetail.data.data.name
      roleDetail.data.data.privileges.forEach(e => {
        this.form.privilege.push(e.id)
      })
    }
    await this.getData()
  }
  ,

  methods: {
    async getData() {
      try {
        const permission = await privileges()
        if (permission.data.status === 200) {
          this.privileges = permission.data.data
        }
      } catch (e) {
        console.log(e)
      }
    },

    handleChange(value) {
      let arr = [];
      for (let i = 0; i < value.length; i++) {
        arr.push(value[i])
      }
      this.form.privilege = arr;
      console.log(this.form.privilege)
    },

    async handlerRole(e) {
      e.preventDefault()
      if (this.id) {
        await this.updateRole(this.id);
      } else {
       await this.createRole();
      }
    },

    async updateRole(id) {
      try {
        this.form.id = id
        const res = await updateRole(this.form)
        let  message = res.data.message;
        if (res.data.status === 200){
          this.$message.success(message)
        }else {
          this.$message.error(message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error(e.response.data.message)
      }
    },

    async createRole() {
      try {
        const res = await addRole(this.form)
        let message = res.data.message;
        if (res.data.status === 200) {
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error(e.response.data.message)
      }
    },

    clearForm() {
      this.form.name = undefined;
      this.form.privilege = undefined;
    }

  },
};
</script>

