<template>
  <div>
    <p style="font-size: 25px; font-weight: 600">Accounts</p>
    <a-card>
      <a-table :pagination="false" bordered :columns="columns" :data-source="data" rowKey="id">
        <span slot="customTitle" :key="data.id">Id</span>
        <span slot="role" slot-scope="text, record">
          <p v-for="role in record.roles" :key="role">{{ role }}</p>
        </span>
        <span slot="privileges" slot-scope="text" >
          <a-tag style="margin-bottom: 3px"
              v-for="tag in text"
              :key="tag"
              :color="tag.includes('DELETE') ? 'volcano' : tag.includes('WRITE') ? 'geekblue' : 'green'"
          >
          {{ tag.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a class="action" :href="'/demo/accounts/edit/'+ record.id"><a-icon type="info-circle"/></a>
          <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon class="action" type="plus-circle"/>
              </a>
              <a-menu slot="overlay" >
                <a-menu-item v-for="pr in privileges" :key="pr.id" @click="addPrivilege(record.id, pr.id)">
                  {{ pr.name}}
                </a-menu-item>
              </a-menu>
          </a-dropdown>
          <a-icon class="action" type="delete" @click="showConfirmDelete(record.id)"/>
        </span>
      </a-table>
      <template>
        <div style=" margin-top: 15px; text-align: center;">
          <a-pagination
              @change="onShowSizeChange"
              show-size-changer
              :default-current="params.current"
              :total="totalData"
              @showSizeChange="onShowSizeChange"
          />
        </div>
      </template>
    </a-card>
  </div>
</template>

<script>

import moment from 'moment'
import {params} from "../params";
import {columns} from "../colums";
import {accounts, privileges, addPrivilege, deleteAccount} from "../service";



export default {
  data() {
    return {
      privileges:[],
      data: [],
      columns: columns,
      totalData: undefined,
      times: [],
      params: params
    };
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      try {
        const response = await accounts(this.params)
        const privilege = await privileges()
        this.privileges = privilege.data.data;
        this.data = response.data.data;
        this.totalData = response.data.pagination.totalItems
        console.log(this.data[1].privileges)

      } catch (e) {
        console.log(e)
      }
    },

    onShowSizeChange(current, pageSize) {
      this.params.page = current;
      this.params.pageSize = pageSize;
      this.getData()

    },


    async addPrivilege(accountID, privilege) {
      try {

        const res = await addPrivilege(accountID,privilege);
        let message = res.data.message;

        if (res.data.status === 200){
          this.$message.success(message)
        }else {
          this.$message.error(message)
        }
        console.log(res)
        await this.getData();

      }catch (e) {
        this.$message.error( e.data.message)
        console.log(e)
      }
    },

    showConfirmDelete(id) {
      this.$confirm({
        title: 'Do you Want to delete these account?',
        onOk: async () => {
          try {
            const res = await deleteAccount(id)
            console.log("res.data: ", res.data)
            if (res.data.status !== 200){
              this.$message.error(res.data.message)
            }else {
              this.$message.success(res.data.message)

            }
            await this.getData()
          }catch (e) {
            this.$message.error(e.data.message)
            console.log(e)
          }
        },
        onCancel() {

        },
      });
    },

    moment: function () {
      return moment();
    },

  }
};
</script>

<style>
.action {
  font-size: 20px;
  color: darkcyan;
  margin-right: 10px;
  cursor: pointer;
}
</style>