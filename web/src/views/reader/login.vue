<template>
  <div>
    <div class="login w-common">
      <el-card header="读者登录" class="login-card">
        <div class="text-center fs-xs">(用户名：04162122，密码：qb)</div>
        <el-form @submit.native.prevent="saveform('model')" label-width="100px" :model="model" :rules="rules"
          ref="model">
          <el-form-item label="学号:" prop="username">
            <el-col :span="20">
              <el-input v-model="model.username" clearable placeholder="请输入学号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-col :span="20">
              <el-input type="password" v-model="model.password" clearable placeholder="请输入密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item style="margin:35px;">
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
              message: '请输入学号',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 16,
              message: '学号小于16位数',
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
        this.$router.push('/reader')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
      },
      isLogin(){
        if(localStorage.token){
          this.$router.push('/reader')
        }
      }
    },
    created () {
      this.isLogin()
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .login {
    min-height: 23.8889rem;

    .login-card {
      width: 25rem;
      margin: 10rem auto;

      .el-card__header {
        text-align: center;
      }
    }

    .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before,
    .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before {
      content: "";
    }
  }
</style>