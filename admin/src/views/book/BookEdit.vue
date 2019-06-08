<template>
  <div class="about">
    <h1> {{id? '修改' : '新建'}}图书信息</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="图书名称">     
        <el-col :span="4"><el-input v-model="model.name"></el-input></el-col>   
      </el-form-item>

      <el-form-item label="图书分类">
        <el-select v-model="model.category" placeholder="请选择图书分类" label="图书分类">
          <el-option v-for="item in categoryOption" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>




      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        categoryOption: {}
      }
    },
    methods: {
      async save() {
        let res
        if (this.id) {
          res = this.$http.put(`/book/books/${this.id}`, this.model)
        } else {
          res = this.$http.post('book/books', this.model)
        }

        this.$router.push('/book/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/book/books/${this.id}`)
        this.model = res.data
      },
      async fetchCategoryOption() {
        const res = await this.$http.get(`book/categories`)
        this.categoryOption = res.data
      }
    },

    created() {
      this.fetchCategoryOption()
      this.id && this.fetch()
    }
  }
</script>