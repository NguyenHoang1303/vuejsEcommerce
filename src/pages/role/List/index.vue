<template>
  <div>
    <p style="font-size: 25px; font-weight: 600">Accounts</p>
    <a-card>
      <a-table :pagination="false" bordered :columns="columns" :data-source="data" rowKey="id">
        <span slot="customTitle" :key="data.id">Id</span>
        <span slot="role" slot-scope="text, record" style="width: 50px">
          <p v-for="role in record.roles" :key="role">{{ role }}</p>
        </span>
        <span slot="privileges" slot-scope="text" style="width: 50px">
          <a-tag
              style="margin-bottom: 5px"
              v-for="tag in text"
              :key="tag"
              :color="tag.includes('DELETE') ? 'volcano' : tag.includes('WRITE') ? 'geekblue' : 'green'"
          >
          {{ tag.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a class="action" :href="'/demo/roles/edit/'+ record.id"><a-icon type="edit"/></a>
           <a-icon class="action" type="delete" @click="showConfirm(record.id)"/>


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


import {params} from "../params";
import {deleteRole, roles} from "../service";
import {columns} from "../colums";

export default {
  data() {

    return {
      privileges: [],
      data: [],
      columns: columns,
      totalData: undefined,
      expand: false,
      times: [],
      params: params
    };
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      try {
        const response = await roles()
        this.data = response.data.data;
        this.totalData = response.data.pagination.totalItems
      } catch (e) {
        console.log(e)
      }
    },

    onShowSizeChange(current, pageSize) {
      this.params.page = current;
      this.params.pageSize = pageSize;
      this.getData()

    },

    showConfirm(id) {
      this.$confirm({
        title: 'Do you Want to delete these role?',
        onOk: async () => {
          try {
            const res = await deleteRole(id)
            if (res.data.status !== 200) {
              this.$message.error(res.data.message)
            } else {
              this.$message.success(res.data.message)
            }
          } catch (e) {
            this.$message.error(e.data.message)
            console.log(e)
          }
          await this.getData();
        },
        onCancel() {

        },
      });
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