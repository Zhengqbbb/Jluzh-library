<template>
  <div class="login-container">
    <el-card header="管理员登录" class="login-card">
      <el-form @submit.native.prevent="saveform('model')" label-width="100px" :model="model" :rules="rules" ref="model">
        <el-form-item label="用户名:" prop="username">
          <el-col :span="16">
            <el-input v-model="model.username" clearable placeholder="请输入管理账号"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-col :span="16">
            <el-input type="password" v-model="model.password" clearable placeholder="请输入密码"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item style="margin:35px;">

          <el-button type="primary" native-type="submit">登录</el-button>

        </el-form-item>
      </el-form>
    </el-card>
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
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 16,
              message: '用户名小于16位数',
              trigger: 'blur'
            },
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 16,
              message: '密码小于16位数',
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
            this.login();
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      async login() {
        const res = await this.$http.post('/login', this.model)
        //sessionStorage 声明周期在关闭
        //localStorage.clear() 清空
        localStorage.token = res.data.token
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
      }
    }
  }
</script>


<style>
  .login-card {
    width: 25rem;
    margin: 10rem auto;

  }
</style>