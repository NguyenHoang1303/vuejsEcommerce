<template>
  <div>
    <p style="font-size: 25px; font-weight: 600">Accounts</p>

    <a-card>
      <a-table :pagination="false" bordered :columns="columns" :data-source="data" rowKey="id">
        <span slot="customTitle" :key="data.id">Id</span>
<!--        <span slot="shipStatus" slot-scope="text, record" style="width: 50px">-->
        <span slot="shipStatus" slot-scope="text" style="width: 50px">
          <p v-if="text === 1">Done</p>
          <p v-if="text === 2">Waiting</p>
          <p v-if="text === 3">Processing</p>
          <p v-if="text === 4">Cancel</p>
        </span>
<!--          <a-select label-in-value  style="width: 120px" :default-value="record.shipStatus" @change="handleChangeStatus" v-model="params.status">-->
<!--                  <a-select-option v-for="s in statusOption" :key="s.key" :value="s.key">-->
<!--                    {{ s.value }}-->
<!--                  </a-select-option>-->
<!--          </a-select>-->
<!--        </span>-->
        <span slot="totalPrice" slot-scope="text, record">
          <p>{{ record.totalPrice.toLocaleString('vi', {style: 'currency', currency: 'VND'}) }}</p>
        </span>
        <span slot="action" slot-scope="text, record">
          <a style="text-align: center" :href="'/demo/orders/detail/'+ record.id"><a-icon type="info-circle"/></a>
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
import {orders} from "../service";

const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'id'},
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: {customRender: 'username'},
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    scopedSlots: {customRender: 'role'},
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
]


export default {
  data() {

    return {

      data: [],
      columns,
      totalData: undefined,
      expand: false,
      times: [],
      params: {
        name: "",
        email: "",
        id: "",
        isRemoved: 0,
        page: 1,
        pageSize: undefined,
        phone: "",
        minPrice: undefined,
        maxPrice: undefined,
        from: "",
        to: "",
        optionPrice: undefined,
      }
    };
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      try {
        const response = await orders(this.params)
        this.data = response.data.data;
        this.totalData = response.data.pagination.totalItems
      }catch (e) {
        console.log(e)
      }
    },

    onShowSizeChange(current, pageSize) {
      this.params.page = current;
      this.params.pageSize = pageSize;
      this.getData()

    },

    handleSearch(e) {
      e.preventDefault();
      this.params.page = 1;
      this.getData();
    },

    handleChange(value) {
      this.handlerFilterByPrice(value)
      this.getData();
    },

    selectDate(dates, dateStrings) {
      this.params.from = dateStrings[0];
      this.params.to = dateStrings[1];
      this.getData();
    },

    handlerFilterByPrice(option) {
      let obj = this.optionPrice[parseInt(option) - 1]
      this.params.minPrice = obj.minPrice;
      this.params.maxPrice = obj.maxPrice;

    },

    handleChangeRemove(isRemoved) {
      this.params.isRemoved = isRemoved;
      this.getData();
    },

    handleChangeStatus(status) {
      // this.params.isRemoved = isRemoved;
      // this.getData();
      console.log(status)
    },

    handleReset() {
      this.times = [];
      this.params.name = undefined;
      this.params.phone = undefined;
      this.params.id = undefined;
      this.params.email = undefined;
      this.params.isRemoved = 0;
      this.params.minPrice = undefined;
      this.params.maxPrice = undefined;
      this.params.optionPrice = undefined;
      this.params.from = undefined;
      this.params.to = undefined;
      this.getData();
    },
    moment: function () {
      return moment();
    },

  }
};
</script>

<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>