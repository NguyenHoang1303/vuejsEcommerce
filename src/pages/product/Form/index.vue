<template>
  <div>
    <p style="font-size: 25px; font-weight: 600">Create product</p>
    <a-card>
      <a-form :form="form" layout="vertical" style="width: 50%; margin: auto" @submit="handleSubmit">
        <a-form-item label="Name">
          <a-input
              v-decorator="['name', { rules: [{ required: true, message: 'Please input product name!' }] }]"
              placeholder="Please input your name"
          />
        </a-form-item>

        <a-form-item label="Category">
          <a-select v-decorator="[
                     'category_id',
                      { rules: [{ required: true, message: 'Please select category!' }] },
                    ]"
                    placeholder="Select a category">

            <a-select-option v-for="cate in categories" :key="cate.id" :value="cate.id">
              {{ cate.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Price">
          <a-input
              type="number"
              v-decorator="['price', { rules: [{ required: true, message: 'Please input product price!' }] }]"
              placeholder="Please input price"
          />
        </a-form-item>

        <a-form-item label="Description">
          <a-input type="textarea"
                   :auto-size="{ minRows: 3, maxRows: 5 }"
                   v-decorator="['description', { rules: [{ required: true, message: 'Please input description!' }] }]"
                   placeholder="Please input description"
          />
        </a-form-item>

        <a-form-item label="Thumbnail">
          <a-input v-decorator="['thumbnail', { rules: [{ required: true, message: 'Please input link image!' }] }]"
                   placeholder="Please input link image"/>
        </a-form-item>

        <a-form-item label="Detail">
          <a-input
              v-decorator="['detail', { rules: [{ required: true, message: 'Please input detail!' }] }]"
              placeholder="Please input detail"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
          <a-button style="margin-left: 10px" @click="clearForm">
            Clear
          </a-button>
          <a-button type="link" href="/demo/products/list">
            Back to list
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>

import {detail, store, update} from "../service";
import {categories} from "../../../service/CategoryService";

export default {

  data() {
    return {
      id: undefined,
      categories: undefined,
      form: this.$form.createForm(this, {name: 'coordinated'}),
    };
  },
  async created() {
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      console.log(this.id)
      try {
        const {data} = await detail(this.id)
        this.getCate();
        this.handleFormUpdate(data.data)
      } catch (e) {
        console.log(e)
      }

    } else {
      this.getCate();
    }

  },
  methods: {

    async getCate() {
      try {
        const cate = await categories()
        console.log("cate: " ,cate)
        this.categories = cate.data.data
      } catch (e) {console.log(e)}
    },

    handleFormUpdate(data) {
      this.form.setFieldsValue({
        name: data.name,
        price: data.price,
        category_id: data.category_id,
        description: data.description,
        detail: data.detail,
        thumbnail: data.thumbnail,
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        values.price = parseInt(values.price);
        if (!err) {
          if (this.id) {
           await this.updateProduct(values)
          } else {
            await this.createProduct(values)
          }
        }
      });
    },

    async createProduct(values) {
      try {
        const res = await store(values)
        console.log("res: ", res)
        let message = res.data.message;
        if (res.data.status !== 200) {
          this.$message.error(message);
        } else {
          this.$message.success(message);
        }
      } catch (e) {
        console.log(e)
        this.$message.success(e.data.message);
      }
    },

    async updateProduct(values){
      values.id = parseInt(this.id);
      try {
       const res = await update(values)
        let message = res.data.message;
        if (res.data.status !== 200){
          this.$message.error(message);
        }else {
          this.$message.success(message);
        }

      } catch (e) {
        console.log(e)
        this.$message.error(e.data.message);
      }
    }

    ,
    clearForm() {
      this.form.setFieldsValue({
        name: undefined,
        price: undefined,
        category_id: undefined,
        description: undefined,
        detail: undefined,
        thumbnail: undefined,
      });
    },

    handleChange({fileList}) {
      this.fileList = fileList;
    },

  },


};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>