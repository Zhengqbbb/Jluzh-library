<template>
  <div class="about">
    <h1> {{id? '修改' : '新建'}}新闻</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">
      <el-form-item label="新闻标题" prop="name">
        <el-col :span="4">
          <el-input v-model="model.name" input-width="240px" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="新闻分类:" prop="category">
        <el-select v-model="model.category" placeholder="请选择新闻分类" label="图书分类">
          <el-option v-for="item in categoryOption" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻内容:" prop="message">
        <el-col :span="7">
          <el-input type="textarea" v-model="model.message"></el-input>
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
        categoryOption: {},
        rules: {
          name: [{
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 6,
              message: '请输入小于6个字',
              trigger: 'change'
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
          res = this.$http.put(`book/categories/${this.id}`, this.model)
        } else {
          res = this.$http.post('book/categories', this.model)
        }
        res = await this.$http.get('book/categories')
        this.$router.push('/book/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`book/categories/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.id && this.fetch()
    }
  }
</script>