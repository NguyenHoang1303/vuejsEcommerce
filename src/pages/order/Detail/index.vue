<template>
  <div>
    <a-card>
      <a-form layout="vertical" :form="form">
        <a-row :gutter="24">
          <a-col span="6">
            <a-form-item label="ID">
              <a-input class="input-custom" disabled v-decorator="[`id`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Name">
              <a-input class="input-custom" disabled v-decorator="[`name`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Phone">
              <a-input class="input-custom" disabled v-decorator="[`phone`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Email">
              <a-input class="input-custom" disabled v-decorator="[`email`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Total price">
              <a-input class="input-custom" disabled v-decorator="[`price`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Note">
              <a-input class="input-custom" disabled v-decorator="[`note`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Status">
              <a-select v-model="status" @change="handleChangeStatus">
                <a-select-option v-for="s in statusOption" :key="s.key" :value="s.key">
                  {{ s.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Address">
              <a-input class="input-custom" disabled v-decorator="[`address`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Created at">
              <a-input class="input-custom" disabled v-decorator="[`createdAt`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Update at">
              <a-input class="input-custom" disabled v-decorator="[`updatedAt`]"/>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="Delete at">
              <a-input class="input-custom" disabled v-decorator="[`deletedAt`]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="margin-top: 15px">
      <a-table :pagination="false" bordered :columns="columns" :data-source="data" rowKey="nameProduct">
        <span slot="customTitle" :key="data.thumbnail">Thumbnail</span>
        <span slot="thumbnail" slot-scope="thumbnail">
          <img :src="thumbnail.split(',')[0]" width="80">
        </span>

        <span slot="createdAt" slot-scope="text, record">
          <p>{{ moment(record.createdAt).format("DD/MM/YYYY HH:mm") }}</p>
        </span>
        <span slot="action" slot-scope="text, record">
          <a style="text-align: center" :href="'/orders/detail/'+ record.id"><a-icon type="info-circle"/></a>
        </span>
      </a-table>
    </a-card>
    <a-button-group style="margin-top: 15px">
      <a href="/orders/list" type="primary">
        <a-icon type="left"/>
        Back to list</a>
    </a-button-group>
  </div>
</template>
<script>
import {detail, detailOrder, updateStatus} from "../service";
import moment from "moment";

const columns = [
  {
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'thumbnail'},
  },
  {
    title: 'Name',
    dataIndex: 'nameProduct',
    key: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Unit price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  },

  {
    title: 'Total price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    scopedSlots: {customRender: 'totalPrice'},
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
      columns,
      statusOption,
      data: [],
      status: undefined,
      products: undefined,
      expand: false,
      form: this.$form.createForm(this, {name: 'advanced_search'}),
      id: undefined,
    };
  },
  created() {
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      this.getDetail(this.id)
    } else {
      console.log('fail')
    }

  }
  ,
  methods: {
    async getDetail(id) {
      try {
        const res = await detail(id)
        this.status = res.data.data.shipStatus;
        this.handleFormUpdate(res.data.data)
        const resDetail = await detailOrder(id)
        this.data = resDetail.data.data;
      }catch (e) {
        console.log(e)
      }



    },

    async updateStatus(id, status) {

      try {
        const res = await updateStatus(id, status)
        this.$message.success(res.data.message)
      }catch (e) {
        console.log(e)
        if (e.data.status === 400){
          this.$message.error(e.data.message)
        }else {
          this.$message.error("Bạn không có quyền cập nhật trạng thái đơn hàng!")
        }

        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500);
      }
      // OrderService.updateStatus(id, status)
      //     .then(res => {
      //       this.$message.success(res.data.data.message)
      //     })
      //     .catch(err => {
      //       console.log(err.response)
      //       this.$message.error("Bạn không có quyền cập nhật trạng thái đơn hàng!")
      //       setTimeout(() => {
      //         window.location.reload()
      //       }, 1500);
      //     })
    },

    handleFormUpdate(data) {
      this.form.setFieldsValue({
        id: data.id,
        name: data.shipName,
        price: data.totalPrice,
        email: data.shipEmail,
        phone: data.shipPhone,
        address: data.shipAddress,
        note: data.shipNote,
        checkOut: data.checkOut ? 'Payment success' : 'Unpaid',
        createdAt: moment(data.createdAt).format("DD/MM/YYYY HH:mm"),
        updatedAt: moment(data.updatedAt).format("DD/MM/YYYY HH:mm"),
        deletedAt: data.deletedAt ? moment(data.deletedAt).format("DD/MM/YYYY HH:mm") : "",
      });
    },
    handleChangeStatus(status) {
      if (this.id && status) {
        this.updateStatus(this.id, status)
      }
    },
    moment: function () {
      return moment();
    },
  },
};
</script>
<style>
.input-custom {
  color: #000000 !important;
}
</style>