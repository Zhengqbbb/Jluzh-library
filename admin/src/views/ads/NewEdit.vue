<template>
  <div class="about">
    <h1> {{id? '修改' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">
      <el-form-item label="文章标题" prop="name">
        <el-col :span="4">
          <el-input v-model="model.name" input-width="240px" clearable></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="文章分类:" prop="category">
        <el-select v-model="model.categories" placeholder="请选择文章分类" label="文章分类" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容:" prop="message">
        <el-col :span="14">
          <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    VueEditor
  } from 'vue2-editor'

  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        model: {},
        categories: [],
        rules: {
          name: [{
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 30,
              message: '请输入小于30个字',
              trigger: 'change'
            }
          ],
        }
      }
    },
    methods: {
      //改写富文本编辑器图片保存——>图片上传到服务器
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
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
          res = this.$http.put(`article/articles/${this.id}`, this.model)
        } else {
          res = this.$http.post('article/articles', this.model)
        }
        res = await this.$http.get('article/articles')
        this.$router.push('/article/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`article/articles/${this.id}`)
        this.model = res.data
      },
      async fetchCategories() {
        const res = await this.$http.get('article/article_categories')
        this.categories = res.data
      }
    },
    created() {
      this.fetchCategories()
      this.id && this.fetch()
    }
  }
</script>