<template>
  <div class="about">
    <h1> {{id? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">


      <el-form-item label="广告位:" prop="name">
        <el-col :span="4">
          <el-input v-model="model.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
        <i class="el-icon-plus"></i>添加广告项
      </el-button>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col :md="14" v-for="(item,index) in model.items" :key="index">

          <el-form-item label="跳转链接(URL)" >
            <el-col >
              <el-input v-model="item.url"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="图片" style="margin-top:20px;">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + 'upload'" 
            :headers="getAuthHeaders()"
            :show-file-list="false"
              :on-success="res => $set(item,'img',res.url)">
              <img v-if="item.img" :src="item.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
          </el-form-item>

          
        </el-col>
      </el-row>


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
        model: {
          items: []
        },
        rules: {
          name: [{
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '请输入小于10个字',
              trigger: 'change'
            }
          ],
        }
      }
    },
    methods: {
      afterUpload(res) {
        this.$set(this.model, 'img', res.url)
      },
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
          res = this.$http.put(`ad/ads/${this.id}`, this.model)
        } else {
          res = this.$http.post('ad/ads', this.model)
        }
        res = await this.$http.get('ad/ads')
        this.$router.push('/ads/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`ad/ads/${this.id}`)
        /* model 无法直接赋值给items */
        this.model = Object.assign({}, this.model, res.data)
      }
    },
    created() {
      this.id && this.fetch()
    }
  }
</script>

