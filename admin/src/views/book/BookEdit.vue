<template>
  <div class="about">
    <h1> {{id? '修改' : '新建'}}图书信息</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('model')" :model="model" :rules="rules" ref="model">

      <el-form-item label="图书名称:" prop="name">
        <el-col :span="4">
          <el-input v-model="model.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图书分类:" prop="category">
        <el-select v-model="model.category" placeholder="请选择图书分类" label="图书分类">
          <el-option v-for="item in categoryOption" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="作者:" prop="author">
        <el-col :span="4">
          <el-input v-model="model.author"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图书图片:" prop="img">
        <el-upload class="avatar-uploader" :action="uploadUrl"
        :headers="getAuthHeaders()"
        :show-file-list="false"
          :on-success="afterUpload" :before-upload="beforeAvatarUpload">
          <img v-if="model.img" :src="model.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="图书数量:" prop="total" :rules="[
      { required: true, message: '数量不能为空',trigger: 'blur'},
      { type: 'number', message: '请输入数字',trigger: 'blur'}
    ]">
        <el-col :span="4">
          <el-input v-model.number="model.total"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="图书可借数量:" prop="remain" :rules="[
      { required: true, message: '数量不能为空',trigger: 'blur'},
      { type: 'number', message: '请输入数字',trigger: 'blur'}
    ]">
        <el-col :span="4">
          <el-input v-model.number="model.remain"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图书信息:" prop="message">
        <el-col :span="7">
          <el-input type="textarea" v-model="model.message"></el-input>
        </el-col>
      </el-form-item>
      <!-- :before-upload="beforeAvatarUpload" -->






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
              message: '请输入图书名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '图书名请小于20位',
              trigger: 'blur'
            }
          ],
          category: {
            required: true,
            message: '请选择图书分类',
            trigger: 'blur'
          },
          author: [{
              required: true,
              message: '请输入作者姓名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '姓名请小于10位',
              trigger: 'blur'
            }
          ],
          img: {
            required: true,
            message: '请上传图书图片',
            trigger: 'blur'
          },
          total: '',
          remain: '',
          message: [{
              required: true,
              message: '请输入图书介绍',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 50,
              message: '图书介绍请少于50字',
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
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      afterUpload(res) {
        this.$set(this.model, 'img', res.url)
      },
      async save() {
        let res
        if (this.id) {
          res = this.$http.put(`/book/books/${this.id}`, this.model)
        } else {
          res = this.$http.post('book/books', this.model)
        }

        res = await this.$http.get('book/books')
        this.$router.push('/book/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/book/books/${this.id}`)
        this.model = res.data
      },
      async fetchCategoryOption() {
        const res = await this.$http.get(`book/categories`)
        this.categoryOption = res.data
      }
    },

    created() {
      this.fetchCategoryOption()
      this.id && this.fetch()
    }
  }
</script>