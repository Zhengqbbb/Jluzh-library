<template>
  <div class="about">
    <h1>修改密码</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="身份证号码">     
        <el-col :span="4"><el-input v-model="model.name"></el-input></el-col>   
      </el-form-item>
      <el-form-item label="输入新密码">     
        <el-col :span="4"><el-input v-model="model.name"></el-input></el-col>   
      </el-form-item>
      <el-form-item label="重新输入密码">     
        <el-col :span="4"><el-input v-model="model.name"></el-input></el-col>   
      </el-form-item>
      
      
      <el-form-item>
        <el-button type="primary" native-type="submit">修改</el-button>
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
          res = this.$http.put(`/reader/rader_users/${this.id}`, this.model)
        } else {
          res = this.$http.post('reader/rader_users', this.model)
        }

        this.$router.push('/reader/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/reader/rader_users/${this.id}`)
        this.model = res.data
      },
      async fetchCategoryOption() {
        const res = await this.$http.get(`reader/categories`)
        this.categoryOption = res.data
      }
    },

    created() {
      this.fetchCategoryOption()
      this.id && this.fetch()
    }
  }
</script>