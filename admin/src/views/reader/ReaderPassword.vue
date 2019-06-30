<template>
  <div class="about">
    <h1> 修改读者密码</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">
      <el-form-item label="读者新密码:" prop="newpassword">
        <el-col :span="4">
          <el-input type="password" v-model="model.newpassword" clearable autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="重复输入密码:" prop="password">
        <el-col :span="4">
          <el-input type="password" v-model="model.password" clearable autocomplete="off"></el-input>
        </el-col>
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
      const vaildatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.model.password !== '') {
            this.$refs.model.validateField('checkpassword');
          }
          callback();
        }
      };
      const vaildatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.model.newpassword) {
          callback(new Error('两次输入不一致'));
        } else {
          callback();
        }
      };
      return {
        model: {
          user: {}
        },
        rules: {
          newpassword: [{
            validator: vaildatePass,
            trigger: 'blur'
          }, {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }],
          password: [{
            validator: vaildatePass2,
            trigger: 'blur'
          }, {
            required: true,
            message: '请重复确定密码',
            trigger: 'blur'
          }]
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
          message: '修改成功'
        })
      },


    }

  }
</script>