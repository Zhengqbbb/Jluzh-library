<template>
  <div class="about">
    <h1> 修改个人信息</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">

      <el-form-item label="姓名" prop="username">
        <el-col :span="4">
          <el-input v-model="model.username"></el-input>
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
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
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
        
        const res = this.$http.put(`/admin/admin_users/${this.id}`, this.model)
        await this.$http.get('admin/admin_users')
        this.$router.push('/admin_users/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/admin/admin_users/${this.id}`)
        this.model = res.data
      },

    },
    created() {
      
      this.id && this.fetch()
      
    }
  }
</script>