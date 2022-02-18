<template>
  <div>
    <div>
      <h2>Creat role</h2>
      <a-card>
        <a-form style="width: 50%; margin: auto">
          <b>Name role:</b>
          <a-form-item>
            <a-input v-model="form.name" placeholder="Name role"/>
          </a-form-item>
          <br/>
          <b>PERMISSION:</b>
          <a-form-item>
            <a-checkbox-group v-model="form.privilege" @change="onChange">
              <b>Order</b>
              <a-row>
                <a-col v-for="o in privileges.order" :key="o.id" :span="10">
                  <a-checkbox :value="o.id">
                    {{ o.name }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <br/>
              <b>Product</b>
              <a-row>
                <a-col v-for="o in privileges.product" :key="o.id" :span="10">
                  <a-checkbox :value="o.id">
                    {{ o.name }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <br/>
              <b>Role</b>
              <a-row>
                <a-col v-for="o in privileges.role" :key="o.id" :span="10">
                  <a-checkbox :value="o.id">
                    {{ o.name }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <br/>
              <b>Order</b>
              <a-row>
                <a-col v-for="o in privileges.account" :key="o.id" :span="10">
                  <a-checkbox :value="o.id">
                    {{ o.name }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
          <a-button @click="handlerRole">
            Submit
          </a-button>
        </a-form>

      </a-card>
    </div>
  </div>
</template>

<script>
import {privileges, addRole} from "../service";


export default {

  data() {
    return {
      form: {
        name: undefined,
        privilege: [],
      },
      privileges: {
        order: [],
        product: [],
        account: [],
        role: [],
      }
    }
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        const permission = await privileges()
        if (permission.data.status === 200) {
          permission.data.data.forEach(e => {
            if (e.name.includes("PRODUCT")) {
              this.privileges.product.push(e)
            }
            if (e.name.includes("ORDER")) {
              this.privileges.order.push(e)
            }
            if (e.name.includes("ACCOUNT")) {
              this.privileges.account.push(e)
            }
            if (e.name.includes("ROLE")) {
              this.privileges.role.push(e)
            }
          })
          console.log(this.privileges.product)
        }
      } catch (e) {
        console.log(e)
      }
    },
    onChange(value) {
      let arr = [];
      for (let i = 0; i < value.length; i++) {
        arr.push(value[i])
      }
      this.form.privilege = arr;
      console.log(this.form.privilege)
    },
    handlerRole(){
      this.createRole();
    },
    clearForm(){

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
  },

}
</script>

<style scoped>

</style>