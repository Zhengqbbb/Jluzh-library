<template>
  <div>
    <div class="reader w-common bd my-4 p-5">
      <el-button class="layout" type="primary" icon="el-icon-close" round>退出登录</el-button>
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane name="first">
            <span slot="label"><i class="el-icon-user"></i> 个人信息</span>
            <!-- start infor -->
            <div class="readerinfor d-flex jc-around flex-wrap mt-5">
              <div class="infor">
                <div class="fs-xl text-center mb-4">基本信息</div>
                <el-form ref="form" label-width="150px">
                  <el-form-item class="book-infor" label="用户名：">
                    {{reader.username}}
                  </el-form-item>
                  <el-form-item class="book-infor" label="姓名：">
                    {{reader.name}}
                  </el-form-item>
                  <el-form-item class="book-infor" label="手机：">
                    {{reader.phone}}
                  </el-form-item>
                  <el-form-item class="book-infor" label="邮箱：">
                    {{reader.email}}
                  </el-form-item>
                </el-form>
              </div>
              <div class="booked" v-show="seen">
                <div class="fs-xl text-center text-primary">在借书籍</div>
                <div class="reader-book bd my-3 py-2" v-for="(bookitem,index) in reader.lends" :key="index">
                  <div class="reader-book-id">图书ID：{{bookitem._id}}</div>
                  <div class="reader-book-name">图书名：{{bookitem.name}}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- end infor -->


          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-edit"></i> 修改信息</span>
            <!-- start editor -->
            <div class="reder-edit">
              <el-form class="reder-edit-form" label-width="120px" @submit.native.prevent="saveforminfor('reader')"
                :model="reader" :rules="rules" ref="reader">

                <el-form-item label="用户名:" prop="username">
                  <el-col :span="8">
                    <el-input v-model="reader.username" clearable></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="姓名:" prop="name">
                  <el-col :span="8">
                    <el-input v-model="reader.name" clearable></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="邮箱:">
                  <el-col :span="8">
                    <el-input v-model="reader.email" clearable></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item label="手机:">
                  <el-col :span="8">
                    <el-input v-model="reader.phone" clearable></el-input>
                  </el-col>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" native-type="submit">修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <!-- end editor -->

          <!-- start editorPaaword -->
          <el-tab-pane name="third">
            <span slot="label"><i class="el-icon-lock"></i> 修改密码</span>
            <div class="reader-pass">
              <el-form label-width="180px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules1"
                ref="model">
                <el-form-item label="读者新密码:" prop="newpassword">
                  <el-col :span="4">
                    <el-input v-model="model.newpassword" clearable autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="重复输入密码:" prop="password">
                  <el-col :span="4">
                    <el-input v-model="model.password" clearable autocomplete="off"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <!-- end editorPaaword -->
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    prop: {
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
      }
      return {
        activeName: 'first',
        seen: false,
        reader: {
          username: '123213123132313231312313',
          name: '123213123132313231312313',
          phone: '123213132313231312313',
          email: '123213123132313231312313',
          lends: [{
            _id: '12312312313',
            name: 'etst',
          }, {
            _id: '12312312313',
            name: 'etst',
          }, {
            _id: '12312312313',
            name: 'etst',
          }]
        },
        model: {},
        rules1: {
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
        },
        rules: {
          name: [{
              required: true,
              message: '请输入读者名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 5,
              message: '长度在 1 到 8 个字符',
              trigger: 'blur'
            },
          ],

        }
      }
    },
    methods: {
      isSeen() {
        if (this.reader.lends != '') {
          this.seen = true;
        }
      },
      saveforminfor(reader) {
        this.$refs[reader].validate(valid => {
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
      saveform(model) {
        this.$refs[model].validate(valid => {
          if (valid) {
            this.save1();
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
        let res = this.$http.put(`/reader/readers/${this.id}`, this.reader)
        this.$router.push(`/reader/${this.id}`)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      },
      async save1() {
        let res = this.$http.put(`/reader/readers/${this.id}`, this.model)
        this.$router.push(`/reader/${this.id}`)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
    },
    created() {
      this.isSeen()
    },

  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .reader {
    position: relative;
    min-height: 740px;
    border-radius: 20px;
    box-shadow: 0 0 10px map-get($colors, 'grey');
    overflow: hidden;
    z-index: 4;

    .el-form-item__label {
      font-size: 18px;
    }

    .el-input__inner {
      font-size: 18px;
    }

    .layout {
      position: absolute;
      top: 2%;
      right: 2%;
      z-index: 2;
    }

    .el-tabs__item {
      font-size: 18px;
      font-weight: 400;
      color: map-get($colors, 'drak');
    }

    .infor,
    .booked {
      min-width: 40%;
    }

    .reader-book {
      padding-left: 30%;
      border-radius: 30px;
      box-shadow: 0 0 5px map-get($colors, 'grey');
    }

    .reder-edit {
      .reder-edit-form {
        width: 100%;
        margin: 5% 0 0 30%;
        line-height: 20px;
      }
    }

    .reader-pass {
      width: 100%;
      margin: 5% 0 0 30%;
      line-height: 20px;
    }
  }
</style>