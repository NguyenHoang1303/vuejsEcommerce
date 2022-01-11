<template>
  <div>
    <p style="font-size: 25px; font-weight: 600">List products</p>
    <template>
      <div id="components-form-demo-advanced-search" style="margin-bottom: 15px">
        <a-form class="ant-advanced-search-form" @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="4">
              <a-form-item>
                <a-input v-model="params.id" placeholder="Enter Id"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item>
                <a-input v-model="params.name" placeholder="Enter name"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-select @change="handleCate" v-model="params.categoryId" placeholder="Select category">
                  <a-select-option v-for="cate in categories" :key="cate.id" :value="cate.id">
                    {{ cate.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-select  @change="handleChangePrice" v-model="params.optionPrice"
                          placeholder="Select price">
                  <a-select-option value="1">
                    0 - 200.000 đ
                  </a-select-option>
                  <a-select-option value="2">
                    200.000 - 400.000 đ
                  </a-select-option>
                  <a-select-option value="3">
                    400.000 - 700.000 đ
                  </a-select-option>
                  <a-select-option value="4">
                    700.000 - 1000.000 đ
                  </a-select-option>
                  <a-select-option value="5">
                    More than 1000.000 đ
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
        <span slot="thumbnail" slot-scope="text, record">
          <img :src="record.thumbnail.split(',')[0]" style="width: 70%;">
        </span>
        <span slot="price" slot-scope="text, record">
          <p>{{ record.price.toLocaleString('vi', {style: 'currency', currency: 'VND'}) }}</p>
        </span>
        <span slot="createdAt" slot-scope="text, record">
          <p>{{ moment(record.createdAt).format("DD/MM/YYYY HH:mm") }}</p>
        </span>
        <span slot="action" slot-scope="text, record">
          <a :href="'/demo/products/'+ record.id +'/detail'"><a-icon type="info-circle"/></a>
          <a-divider type="vertical"/>
          <a :href="'/demo/products/edit/' + record.id" class="ant-dropdown-link"><a-icon type="edit"/></a>
          <a-divider type="vertical"/>
          <span style="color: red; cursor: pointer" @click="showConfirm(record.id)" class="ant-dropdown-link"><a-icon
              type="delete"/></span>

        </span>
      </a-table>
      <a-pagination style="margin-top: 15px" :total="totalData" @change="onChangePage"/>
    </a-card>
  </div>

</template>
<script>
import moment from 'moment'
import {deleteOne, products} from "../service";
import {params, columns} from "../params";
import {categories} from "../../../service/CategoryService";




export default {
  data() {
    return {
      data: [],
      categories: [],
      columns : columns,
      totalData: undefined,
      expand: false,
      params: params
    };
  },

  mounted() {
    this.getData();
  },


  methods: {

    async getData() {
      try {
        const {data} = await products(this.params);
        this.data = data.data;
        this.totalData = data.pagination.totalItems;
        const cate = await categories();
        this.categories = cate.data.data;
      }catch (e) {
        console.log(e)
      }
    },

    onChangePage(current) {
      this.params.page = current;
      this.getData();

    },

    handleSearch(e) {
      e.preventDefault();
      this.params.page = 1;
      this.getData();
    },
    handleChangePrice(value) {
      this.handlerFilterByPrice(value)
      this.getData();
    },

    handleCate(cate){
      this.params.categoryId = parseInt(cate)
      this.getData()
    },


    handleReset() {
      this.params = params;
      this.params.optionPrice = undefined;
      this.getData();
    },
    moment: function () {
      return moment();
    },
    showConfirm(e) {
      this.$confirm({
        title: `Do you want to delete product id = ${e}?`,
        onOk: async () => {
          try {
            await deleteOne(e);
            this.$message.success("delete successfully");
            await this.getData();
          } catch (e) {
            this.$message.error(e.data.message);
          }
        },
        onCancel: () => {
        },
      });

    },
    handlerFilterByPrice(option) {
      switch (parseInt(option)) {
        case 1:
          this.params.minPrice = 0;
          this.params.maxPrice = 200000;
          break;
        case 2:
          this.params.minPrice = 200000;
          this.params.maxPrice = 400000;
          break;
        case 3:
          this.params.minPrice = 400000;
          this.params.maxPrice = 700000;
          break;
        case 4:
          this.params.minPrice = 700000;
          this.params.maxPrice = 1000000;
          break;
        case 5:
          this.params.minPrice = 1000000;
          break;
      }
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