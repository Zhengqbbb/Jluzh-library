<template>
  <div class="about">
    <h1> 新增管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model" >
      <el-form-item label="用户名账户" prop="username">
        <el-col :span="6">
          <el-input v-model="model.username" prop="username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="6">
          <el-input type="password" v-model="model.password"  ></el-input>
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
    data() {
      return {
        model: {},
        rules: {
          username: [{
              required: true,
              message: '请输入账户名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 16,
              message: '长度在 1 到 16 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            
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
        const res = this.$http.post('admin/admin_users', this.model)
        if(!res){
          return false
        }
        this.$http.get('admin/admin_users')
        this.$router.push('/admin_users/list')
        this.$message({
          type: 'success',
          message: '新增成功'
        })
      },
    },
  }
</script>