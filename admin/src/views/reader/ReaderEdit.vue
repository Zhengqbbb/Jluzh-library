<template>
  <div class="about">
    <h1> {{id? '修改' : '新建'}}读者账户</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">

      <el-form-item label="读者用户名:" prop="username">
        <el-col :span="4">
          <el-input v-model="model.username" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="读者密码:" prop="password">
        <el-col :span="4">
          <el-input v-model="model.password" type="password" clearable></el-input>
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
            console.log('error submit!!')
            return false
          }
        })
      },

      async save() {
        let res
        if (this.id) {
          res = this.$http.put(`/reader/reader_users/${this.id}`, this.model)
        } else {
          res = this.$http.post('reader/reader_users', this.model)
        }

        res = await this.$http.get('reader/reader_users')
        this.$router.push('/reader/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/reader/reader_users/${this.id}`)
        this.model = res.data
      },

    },
    created() {
      this.id && this.fetch()
    }
  }
</script>