<template>
  <div>
    <div>
      <h2>Creat role</h2>
      <a-card>
        <a-form style="width: 50%; margin: auto">
          <a-form-item label="Name">
            <a-input placeholder="Name role"/>
          </a-form-item>
          <a-form-item label="Order permission" >
            <div>
              <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                  Check all
                </a-checkbox>
              </div>
              <br />
              <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
            </div>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import {privileges} from "../service";

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export default {

  data() {
    return {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
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
  }
  ,

  methods: {
    async getData() {
      try {
        const permission = await privileges()
        if (permission.data.status === 200) {
           permission.data.data.forEach(e =>{
             if (e.name.includes("PRODUCT")){
               this.privileges.product.push(e)
             }
             if (e.name.includes("ORDER")){
               this.privileges.order.push(e)
             }
             if (e.name.includes("ACCOUNT")){
               this.privileges.account.push(e)
             }
             if (e.name.includes("ROLE")){
               this.privileges.role.push(e)
             }
           })
          console.log(this.privileges.product)
        }
      } catch (e) {
        console.log(e)
      }
    },

    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
  },

}
</script>

<style scoped>

</style>