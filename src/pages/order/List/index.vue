<template>
  <div>
    <p style="font-size: 25px; font-weight: 600">Orders</p>
    <template>
      <div id="components-form-demo-advanced-search" style="margin-bottom: 15px">
        <a-form class="ant-advanced-search-form" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="6">
              <a-form-item>
                <a-input v-model="params.id" placeholder="Enter Id"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input v-model="params.name" placeholder="Enter ship name"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input v-model="params.phone" placeholder="Enter phone"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input v-model="params.email" placeholder="Enter email"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-select @change="handleChange" v-model="params.optionPrice" placeholder="Select price">
                  <a-select-option v-for="o in optionPrice" :key="o.key" :value="o.key">
                    {{ o.key === 5 ? `More than ${o.minPrice}` : `${o.minPrice} - ${o.maxPrice} đ` }}
                  </a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-range-picker
                    v-model="times"
                    :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                    @change="selectDate"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item>
                <a-select @change="handleChangeRemove" v-model="params.isRemoved" placeholder="Select price">
                  <a-select-option :value="1">
                    Show removed
                  </a-select-option>
                  <a-select-option :value="0">
                    Hidden removed
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button type="primary" html-type="submit">
                Search
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                Clear
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </template>
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
    scopedSlots: {customRender: 'name'},
  },
  {
    title: 'Status',
    dataIndex: 'shipStatus',
    key: 'shipStatus',
    scopedSlots: {customRender: 'shipStatus'},
  },
  {
    title: 'Name',
    dataIndex: 'shipName',
    key: 'shipName',
    scopedSlots: {customRender: 'shipName'},
  },
  {
    title: 'Phone',
    dataIndex: 'shipPhone',
    key: 'shipPhone',
  },
  {
    title: 'Total price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    scopedSlots: {customRender: 'totalPrice'},
  },
  {
    title: 'Email',
    key: 'shipEmail',
    dataIndex: 'shipEmail',

  },
  {
    title: 'Created at',
    key: 'createdAt',
    dataIndex: 'createdAt',
    scopedSlots: {customRender: 'createdAt'},

  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
]

const optionPrice = [
  {
    key: 1,
    minPrice: 0,
    maxPrice: 200000,
  },
  {
    key: 2,
    minPrice: 200000,
    maxPrice: 400000,
  },
  {
    key: 3,
    minPrice: 400000,
    maxPrice: 700000,
  },
  {
    key: 4,
    minPrice: 700000,
    maxPrice: 1000000,
  },
  {
    key: 5,
    minPrice: 1000000,
    maxPrice: undefined,
  },
];

const statusOption = [
  {
    key: 1,
    value: "Done"
  },
  {
    key: 2,
    value: "Waiting"
  },
  {
    key: 3,
    value: "Processing"
  },
  {
    key: 4,
    value: "Cancel"
  },

];

export default {
  data() {

    return {
      optionPrice,
      statusOption,
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
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