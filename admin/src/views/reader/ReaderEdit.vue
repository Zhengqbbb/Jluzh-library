<template>
  <div class="about">
    <h1> 修改读者账户</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">

      <el-form-item label="读者用户名:" prop="username">
        <el-col :span="4">
          <el-input v-model="model.username" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="读者姓名:">
        <el-col :span="4">
          <el-input v-model="model.name" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="读者邮箱:">
        <el-col :span="4">
          <el-input v-model="model.email" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="读者手机:">
        <el-col :span="4">
          <el-input v-model="model.phone" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="读者身份证:">
        <el-col :span="4">
          <el-input v-model="model.card" clearable></el-input>
        </el-col>
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
        rules: {
          name: [{
              required: true,
              message: '请输入读者名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 5,
              message: '长度在 1 到 5 个字符',
              trigger: 'blur'
            }
          ],

        }
      }
    },
    methods: {
      saveform(model) {
        this.$refs[model].validate(valid => {
          if (valid) {
            this.save();
          } else {
            this.$message({
              type: 'error',
              message: '请再审核一下'
            })
            return false
          }
        })
      },

      async save() {
        let res = this.$http.put(`/reader/readers/${this.id}`, this.model)
        res = await this.$http.get('reader/readers')
        this.$router.push('/reader/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/reader/readers/${this.id}`)
        this.model = res.data
      },

    },
    created() {
      this.id && this.fetch()
    }
  }
</script>